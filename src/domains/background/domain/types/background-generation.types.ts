import type {
  BackgroundJob,
  BackgroundQueueConfig,
  JobExecutorConfig,
} from "../entities/job.types";
import type { executeDirectGeneration } from "../../infrastructure/executors/backgroundJobExecutor";

export type { DirectExecutionResult } from "../../infrastructure/executors/backgroundJobExecutor";

export interface UseBackgroundGenerationOptions<TInput, TResult>
  extends Partial<BackgroundQueueConfig> {
  readonly executor: JobExecutorConfig<TInput, TResult>;
  readonly onJobComplete?: (job: BackgroundJob<TInput, TResult>) => void;
  readonly onJobError?: (job: BackgroundJob<TInput, TResult>) => void;
  readonly onAllComplete?: () => void;
  readonly onProgress?: (progress: number) => void;
}

export interface UseBackgroundGenerationReturn<TInput, TResult> {
  readonly startJob: (input: TInput, type: string) => Promise<string>;
  readonly executeDirectly: (input: TInput) => ReturnType<typeof executeDirectGeneration<TInput, TResult>>;
  readonly cancelJob: (id: string) => void;
  readonly pendingJobs: BackgroundJob<TInput, TResult>[];
  readonly activeJobCount: number;
  readonly hasActiveJobs: boolean;
  readonly isProcessing: boolean;
  readonly progress: number;
}
