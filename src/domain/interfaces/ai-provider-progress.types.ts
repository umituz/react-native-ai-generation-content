/**
 * AI Provider Progress & Options Types
 * Progress tracking and execution option types
 */

import type { AIJobStatusType, JobStatus } from "./ai-provider-status.types";

/**
 * Provider progress information
 */
export interface ProviderProgressInfo {
  /** Progress percentage (0-100) */
  progress: number;
  /** Current job status */
  status?: AIJobStatusType;
  /** Human-readable message */
  message?: string;
  /** Estimated time remaining in ms */
  estimatedTimeRemaining?: number;
}

/**
 * Subscription options for job tracking
 */
export interface SubscribeOptions<T = unknown> {
  timeoutMs?: number;
  onQueueUpdate?: (status: JobStatus) => void;
  onProgress?: (progress: ProviderProgressInfo) => void;
  onResult?: (result: T) => void;
}

/**
 * Basic run options
 */
export interface RunOptions {
  onProgress?: (progress: ProviderProgressInfo) => void;
}
