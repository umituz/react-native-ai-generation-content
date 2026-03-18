/**
 * Image Generation Executor - Types
 * Type definitions for image generation execution
 */

export interface ExecutionResult {
  success: boolean;
  imageUrl?: string;
  error?: string;
  logSessionId?: string;
}
