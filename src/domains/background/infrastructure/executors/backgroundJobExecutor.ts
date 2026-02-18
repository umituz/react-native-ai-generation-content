import type { BackgroundJob, JobExecutorConfig } from "../../domain/entities/job.types";

export interface DirectExecutionResult<TResult> {
  readonly success: boolean;
  readonly result?: TResult;
  readonly error?: string;
}

interface DirectExecutionParams<TInput, TResult> {
  input: TInput;
  executor: JobExecutorConfig<TInput, TResult>;
  onProgress?: (progress: number) => void;
  setProgress: (progress: number) => void;
  setIsProcessing: (isProcessing: boolean) => void;
}

export const executeDirectGeneration = async <TInput, TResult>(
  params: DirectExecutionParams<TInput, TResult>,
): Promise<DirectExecutionResult<TResult>> => {
  const { input, executor, onProgress, setProgress, setIsProcessing } = params;

  setIsProcessing(true);
  setProgress(0);

  try {
    const result = await executor.execute(input, (p) => {
      setProgress(p);
      onProgress?.(p);
    });

    setProgress(100);
    return { success: true, result };
  } catch (error) {
    const errorMsg = error instanceof Error ? error.message : String(error);
    return { success: false, error: errorMsg };
  } finally {
    setIsProcessing(false);
  }
};

interface QueuedExecutionParams<TInput, TResult> {
  jobId: string;
  input: TInput;
  executor: JobExecutorConfig<TInput, TResult>;
  updateJob: (params: { id: string; updates: Partial<BackgroundJob<TInput, TResult>> }) => void;
  updateJobAsync: (params: { id: string; updates: Partial<BackgroundJob<TInput, TResult>> }) => Promise<{ id: string; updates: Partial<BackgroundJob<TInput, TResult>> }>;
  removeJobAsync: (id: string) => Promise<string>;
  getJob: (id: string) => BackgroundJob<TInput, TResult> | undefined;
  activeJobsRef: React.MutableRefObject<Set<string>>;
  onJobComplete?: (job: BackgroundJob<TInput, TResult>) => void;
  onJobError?: (job: BackgroundJob<TInput, TResult>) => void;
  onAllComplete?: () => void;
}

export const executeQueuedJob = async <TInput, TResult>(
  params: QueuedExecutionParams<TInput, TResult>,
): Promise<void> => {
  const {
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
  } = params;

  try {
    // Critical status update - await to ensure state consistency
    await updateJobAsync({ id: jobId, updates: { status: "processing", progress: 10 } });

    const result = await executor.execute(input, (p) => {
      // Progress updates use non-async version for performance
      // Progress updates are frequent and eventual consistency is acceptable
      updateJob({ id: jobId, updates: { progress: p } });
    });

    // Critical status update - await to ensure state consistency
    await updateJobAsync({
      id: jobId,
      updates: { status: "completed", progress: 100, result, completedAt: new Date() },
    });

    const completedJob = getJob(jobId);
    if (completedJob) {
      await executor.onComplete?.(completedJob);
      onJobComplete?.(completedJob);
    }

    // Await removal to ensure cleanup happens before checking activeJobs
    await removeJobAsync(jobId);
  } catch (error) {
    const errorMsg = error instanceof Error ? error.message : String(error);

    // Critical error status update - await for consistency
    await updateJobAsync({ id: jobId, updates: { status: "failed", error: errorMsg, progress: 0 } });

    const failedJob = getJob(jobId);
    if (failedJob) {
      await executor.onError?.(failedJob, error instanceof Error ? error : new Error(errorMsg));
      onJobError?.(failedJob);
    }

    // Remove failed job from cache to prevent accumulation
    try {
      await removeJobAsync(jobId);
    } catch {
      // Best effort cleanup
    }
  } finally {
    // Use atomic Set operation to prevent race conditions
    activeJobsRef.current.delete(jobId);

    // Check size after deletion to prevent multiple onAllComplete calls
    if (activeJobsRef.current.size === 0) {
      onAllComplete?.();
    }
  }
};
