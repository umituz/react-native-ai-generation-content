/**
 * useBackgroundGeneration Hook
 * Executes AI generation tasks with optional queue management
 * - mode: 'direct' - Execute immediately, no queue UI (for images)
 * - mode: 'queued' - Use pending jobs queue with UI (for videos)
 */

import { useCallback, useRef, useState } from "react";
import { usePendingJobs } from "./use-pending-jobs";
import type {
  BackgroundJob,
  JobExecutorConfig,
  BackgroundQueueConfig,
} from "../../domain/entities/job.types";
import { DEFAULT_QUEUE_CONFIG } from "../../domain/entities/job.types";

export interface UseBackgroundGenerationOptions<TInput, TResult>
  extends Partial<BackgroundQueueConfig> {
  readonly executor: JobExecutorConfig<TInput, TResult>;
  readonly onJobComplete?: (job: BackgroundJob<TInput, TResult>) => void;
  readonly onJobError?: (job: BackgroundJob<TInput, TResult>) => void;
  readonly onAllComplete?: () => void;
  readonly onProgress?: (progress: number) => void;
}

export interface DirectExecutionResult<TResult> {
  readonly success: boolean;
  readonly result?: TResult;
  readonly error?: string;
}

export interface UseBackgroundGenerationReturn<TInput, TResult> {
  readonly startJob: (input: TInput, type: string) => Promise<string>;
  readonly executeDirectly: (
    input: TInput,
  ) => Promise<DirectExecutionResult<TResult>>;
  readonly cancelJob: (id: string) => void;
  readonly retryJob: (id: string) => void;
  readonly pendingJobs: BackgroundJob<TInput, TResult>[];
  readonly activeJobCount: number;
  readonly hasActiveJobs: boolean;
  readonly isProcessing: boolean;
  readonly progress: number;
}

export function useBackgroundGeneration<TInput = unknown, TResult = unknown>(
  options: UseBackgroundGenerationOptions<TInput, TResult>,
): UseBackgroundGenerationReturn<TInput, TResult> {
  const config = { ...DEFAULT_QUEUE_CONFIG, ...options };
  const activeJobsRef = useRef<Set<string>>(new Set());
  const jobInputsRef = useRef<Map<string, { input: TInput; type: string }>>(
    new Map(),
  );

  const [isProcessing, setIsProcessing] = useState(false);
  const [progress, setProgress] = useState(0);

  const { jobs, addJobAsync, updateJob, removeJob, getJob } = usePendingJobs<
    TInput,
    TResult
  >({
    queryKey: config.queryKey,
  });

  const executeDirectly = useCallback(
    async (input: TInput): Promise<DirectExecutionResult<TResult>> => {
      const { executor } = options;

      setIsProcessing(true);
      setProgress(0);

      try {
        const result = await executor.execute(input, (p) => {
          setProgress(p);
          options.onProgress?.(p);
        });

        setProgress(100);
        return { success: true, result };
      } catch (error) {
        const errorMsg = error instanceof Error ? error.message : String(error);
        return { success: false, error: errorMsg };
      } finally {
        setIsProcessing(false);
      }
    },
    [options],
  );

  const executeJob = useCallback(
    async (jobId: string, input: TInput) => {
      const { executor } = options;

      try {
        updateJob({
          id: jobId,
          updates: { status: "processing", progress: 10 },
        });

        const result = await executor.execute(input, (p) => {
          updateJob({ id: jobId, updates: { progress: p } });
        });

        updateJob({
          id: jobId,
          updates: {
            status: "completed",
            progress: 100,
            result,
            completedAt: new Date(),
          },
        });

        const completedJob = getJob(jobId);
        if (completedJob) {
          await executor.onComplete?.(completedJob);
          options.onJobComplete?.(completedJob);
        }

        removeJob(jobId);
      } catch (error) {
        const errorMsg = error instanceof Error ? error.message : String(error);

        updateJob({
          id: jobId,
          updates: { status: "failed", error: errorMsg, progress: 0 },
        });

        const failedJob = getJob(jobId);
        if (failedJob) {
          await executor.onError?.(
            failedJob,
            error instanceof Error ? error : new Error(errorMsg),
          );
          options.onJobError?.(failedJob);
        }
      } finally {
        activeJobsRef.current.delete(jobId);
        if (activeJobsRef.current.size === 0) {
          options.onAllComplete?.();
        }
      }
    },
    [options, updateJob, removeJob, getJob],
  );

  const startJob = useCallback(
    async (input: TInput, type: string): Promise<string> => {
      const jobId = `job-${Date.now()}-${Math.random().toString(36).slice(2, 9)}`;

      jobInputsRef.current.set(jobId, { input, type });

      await addJobAsync({
        id: jobId,
        input,
        type,
        status: "queued",
        progress: 0,
      });

      activeJobsRef.current.add(jobId);
      void executeJob(jobId, input);

      return jobId;
    },
    [addJobAsync, executeJob],
  );

  const cancelJob = useCallback(
    (id: string) => {
      activeJobsRef.current.delete(id);
      jobInputsRef.current.delete(id);
      removeJob(id);
    },
    [removeJob],
  );

  const retryJob = useCallback(
    (id: string) => {
      const jobData = jobInputsRef.current.get(id);
      if (!jobData) return;
      removeJob(id);
      void startJob(jobData.input, jobData.type);
    },
    [removeJob, startJob],
  );

  return {
    startJob,
    executeDirectly,
    cancelJob,
    retryJob,
    pendingJobs: jobs,
    activeJobCount: activeJobsRef.current.size,
    hasActiveJobs: activeJobsRef.current.size > 0,
    isProcessing,
    progress,
  };
}
