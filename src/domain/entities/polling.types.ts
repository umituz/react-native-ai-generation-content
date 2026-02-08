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
}

export const DEFAULT_POLLING_CONFIG: PollingConfig = {
  maxAttempts: 60,
  initialIntervalMs: 1000,
  maxIntervalMs: 3000,
  backoffMultiplier: 1.2,
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
