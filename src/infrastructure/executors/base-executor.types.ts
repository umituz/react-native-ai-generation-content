/**
 * Base Executor Types
 */

export interface BaseExecutorOptions<TInput, TOutput> {
  model: string;
  buildInput: (request: TInput) => Record<string, unknown>;
  extractResult?: (result: unknown) => TOutput | undefined;
  onProgress?: (progress: number) => void;
}
