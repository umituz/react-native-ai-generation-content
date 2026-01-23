/**
 * Provider Executor Interface
 * Single Responsibility: Direct model execution (sync and async)
 */

import type { SubscribeOptions, RunOptions } from "./ai-provider.interface";

export interface IAIProviderExecutor {
  /**
   * Subscribe to long-running job with progress updates
   * Handles queue, polling, and result retrieval automatically
   */
  subscribe<T = unknown>(
    model: string,
    input: Record<string, unknown>,
    options?: SubscribeOptions<T>,
  ): Promise<T>;

  /**
   * Run model directly (for fast operations)
   * Returns result immediately without polling
   */
  run<T = unknown>(
    model: string,
    input: Record<string, unknown>,
    options?: RunOptions,
  ): Promise<T>;
}
