/**
 * Background Job Types
 * Generic job management for AI generation tasks
 */

export type BackgroundJobStatus =
  | "queued"
  | "processing"
  | "uploading"
  | "completed"
  | "failed";

export interface BackgroundJob<TInput = unknown, TResult = unknown> {
  readonly id: string;
  readonly input: TInput;
  readonly type: string;
  readonly status: BackgroundJobStatus;
  readonly progress: number;
  readonly result?: TResult;
  readonly error?: string;
  readonly createdAt: Date;
  readonly completedAt?: Date;
}

export interface AddJobInput<TInput = unknown> {
  readonly id: string;
  readonly input: TInput;
  readonly type: string;
  readonly status?: BackgroundJobStatus;
  readonly progress?: number;
}

export interface UpdateJobInput {
  readonly id: string;
  readonly updates: Partial<Omit<BackgroundJob, "id" | "createdAt">>;
}

export interface JobExecutorConfig<TInput = unknown, TResult = unknown> {
  readonly execute: (input: TInput, onProgress?: (progress: number) => void) => Promise<TResult>;
  readonly onComplete?: (job: BackgroundJob<TInput, TResult>) => Promise<void>;
  readonly onError?: (job: BackgroundJob<TInput, TResult>, error: Error) => Promise<void>;
  readonly timeoutMs?: number;
}

export type GenerationMode = "direct" | "queued";

export interface BackgroundQueueConfig {
  readonly mode?: GenerationMode;
  readonly maxConcurrent?: number;
  readonly retryCount?: number;
  readonly retryDelayMs?: number;
  readonly queryKey?: readonly string[];
}

export const DEFAULT_QUEUE_CONFIG: Required<BackgroundQueueConfig> = {
  mode: "queued",
  maxConcurrent: 1,
  retryCount: 2,
  retryDelayMs: 2000,
  queryKey: ["ai", "background-jobs"],
};
