/**
 * AI Provider Interface
 * Provider-agnostic interface for AI generation services
 * Implementations: FAL, Gemini, etc.
 */

export interface AIProviderConfig {
  apiKey: string;
  maxRetries?: number;
  baseDelay?: number;
  maxDelay?: number;
  defaultTimeoutMs?: number;
}

export interface JobSubmission {
  requestId: string;
  statusUrl?: string;
  responseUrl?: string;
}

export interface JobStatus {
  status: AIJobStatusType;
  logs?: AILogEntry[];
  queuePosition?: number;
  eta?: number;
}

export type AIJobStatusType =
  | "IN_QUEUE"
  | "IN_PROGRESS"
  | "COMPLETED"
  | "FAILED";

export interface AILogEntry {
  message: string;
  level: "info" | "warn" | "error";
  timestamp?: string;
}

export interface SubscribeOptions<T = unknown> {
  timeoutMs?: number;
  onQueueUpdate?: (status: JobStatus) => void;
  onProgress?: (progress: number) => void;
  onResult?: (result: T) => void;
}

/**
 * AI Provider Interface
 * All AI providers must implement this interface
 */
export interface IAIProvider {
  readonly providerId: string;
  readonly providerName: string;

  initialize(config: AIProviderConfig): void;
  isInitialized(): boolean;

  submitJob(
    model: string,
    input: Record<string, unknown>,
  ): Promise<JobSubmission>;

  getJobStatus(model: string, requestId: string): Promise<JobStatus>;

  getJobResult<T = unknown>(model: string, requestId: string): Promise<T>;

  subscribe<T = unknown>(
    model: string,
    input: Record<string, unknown>,
    options?: SubscribeOptions<T>,
  ): Promise<T>;

  run<T = unknown>(model: string, input: Record<string, unknown>): Promise<T>;

  reset(): void;
}
