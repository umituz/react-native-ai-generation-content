/**
 * Video Generation Executor - Type Definitions
 */

export interface ExecutionResult {
  success: boolean;
  videoUrl?: string;
  requestId?: string;
  error?: string;
}

export interface SubmissionResult {
  success: boolean;
  requestId?: string;
  model?: string;
  error?: string;
}
