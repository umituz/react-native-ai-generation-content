import { useCallback, useRef, useState, useMemo } from "react";
import { usePendingJobs } from "./use-pending-jobs";
import { executeDirectGeneration, executeQueuedJob } from "../../infrastructure/executors/backgroundJobExecutor";
import { DEFAULT_QUEUE_CONFIG } from "../../domain/entities/job.types";
import type {
  UseBackgroundGenerationOptions,
  UseBackgroundGenerationReturn,
} from "../../domain/types/background-generation.types";

export type { DirectExecutionResult, UseBackgroundGenerationOptions, UseBackgroundGenerationReturn } from "../../domain/types/background-generation.types";

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

  const { jobs, addJobAsync, updateJob, updateJobAsync, removeJob, removeJobAsync, getJob } = usePendingJobs<
    TInput,
    TResult
  >({
    queryKey: config.queryKey,
  });

  const { executor, onProgress, onJobComplete, onJobError, onAllComplete } = options;

  const executeDirectly = useCallback(
    (input: TInput) =>
      executeDirectGeneration({ input, executor, onProgress, setProgress, setIsProcessing }),
    [executor, onProgress],
  );

  const executeJob = useCallback(
    (jobId: string, input: TInput) =>
      executeQueuedJob({
        jobId,
        input,
        executor,
        updateJob,
        updateJobAsync,
        removeJobAsync,
        getJob,
        activeJobsRef,
        onJobComplete,
        onJobError,
        onAllComplete,
      }),
    [executor, onJobComplete, onJobError, onAllComplete, updateJob, updateJobAsync, removeJobAsync, getJob],
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

  // Calculate active jobs from TanStack Query state (not ref) for reactivity
  // Active jobs are those currently processing or queued
  const activeJobs = useMemo(
    () => jobs.filter((job) => job.status === "processing" || job.status === "queued"),
    [jobs]
  );

  const activeJobCount = activeJobs.length;
  const hasActiveJobs = activeJobCount > 0;

  return {
    startJob,
    executeDirectly,
    cancelJob,
    pendingJobs: jobs,
    activeJobCount,
    hasActiveJobs,
    isProcessing,
    progress,
  };
}
