/**
 * Job Poller Type Definitions
 */

import type { IAIProvider, JobStatus } from "../../../../domain/interfaces/ai-provider.interface";
import type { PollingConfig } from "../../../../domain/entities/polling.types";

export interface PollJobOptions {
  provider: IAIProvider;
  model: string;
  requestId: string;
  config?: Partial<PollingConfig>;
  onProgress?: (progress: number) => void;
  onStatusChange?: (status: JobStatus) => void;
  signal?: AbortSignal;
}

export interface PollJobResult<T = unknown> {
  success: boolean;
  data?: T;
  error?: Error;
  attempts: number;
  elapsedMs: number;
}
