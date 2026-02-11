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
  removeJob: (id: string) => void;
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
    removeJob,
    getJob,
    activeJobsRef,
    onJobComplete,
    onJobError,
    onAllComplete,
  } = params;

  try {
    updateJob({ id: jobId, updates: { status: "processing", progress: 10 } });

    const result = await executor.execute(input, (p) => {
      updateJob({ id: jobId, updates: { progress: p } });
    });

    updateJob({
      id: jobId,
      updates: { status: "completed", progress: 100, result, completedAt: new Date() },
    });

    const completedJob = getJob(jobId);
    if (completedJob) {
      await executor.onComplete?.(completedJob);
      onJobComplete?.(completedJob);
    }

    removeJob(jobId);
  } catch (error) {
    const errorMsg = error instanceof Error ? error.message : String(error);

    updateJob({ id: jobId, updates: { status: "failed", error: errorMsg, progress: 0 } });

    const failedJob = getJob(jobId);
    if (failedJob) {
      await executor.onError?.(failedJob, error instanceof Error ? error : new Error(errorMsg));
      onJobError?.(failedJob);
    }
  } finally {
    activeJobsRef.current.delete(jobId);
    if (activeJobsRef.current.size === 0) {
      onAllComplete?.();
    }
  }
};
