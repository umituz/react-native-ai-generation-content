/**
 * AI Provider Status Types
 * Job status tracking and logging types
 */

/**
 * AI Job Status States
 */
export type AIJobStatusType =
  | "IN_QUEUE"
  | "IN_PROGRESS"
  | "COMPLETED"
  | "FAILED";

/**
 * Log entry for AI job events
 */
export interface AILogEntry {
  message: string;
  level: "info" | "warn" | "error";
  timestamp?: string;
}

/**
 * Job submission response
 */
export interface JobSubmission {
  requestId: string;
  statusUrl?: string;
  responseUrl?: string;
}

/**
 * Job status information
 */
export interface JobStatus {
  status: AIJobStatusType;
  logs?: AILogEntry[];
  queuePosition?: number;
  eta?: number;
  requestId?: string;
}
