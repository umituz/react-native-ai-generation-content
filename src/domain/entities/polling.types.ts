/**
 * Polling Types
 * Configuration for job polling
 */

export interface PollingConfig {
  maxAttempts: number;
  initialIntervalMs: number;
  maxIntervalMs: number;
  backoffMultiplier: number;
  maxTotalTimeMs?: number;
  maxConsecutiveErrors?: number;
}

export const DEFAULT_POLLING_CONFIG: PollingConfig = {
  maxAttempts: 40, // Reduced from 60 - 40 attempts with backoff = ~5 minutes total
  initialIntervalMs: 1500, // Increased from 1000ms - less aggressive initial polling
  maxIntervalMs: 5000, // Increased from 3000ms - longer intervals between retries
  backoffMultiplier: 1.3, // Increased from 1.2 - faster exponential backoff
};

export interface PollingState {
  attempt: number;
  lastProgress: number;
  startTime: number;
}

export interface PollingOptions {
  model: string;
  requestId: string;
  statusUrl?: string;
  responseUrl?: string;
  userId?: string;
  jobType?: string;
  config?: Partial<PollingConfig>;
  onProgress?: (progress: number) => void;
}
