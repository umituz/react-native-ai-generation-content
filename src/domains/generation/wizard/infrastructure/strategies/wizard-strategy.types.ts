/**
 * Wizard Strategy Types
 * Shared types for all wizard strategies
 */

export interface QueueSubmissionResult {
  readonly success: boolean;
  readonly requestId?: string;
  readonly model?: string;
  readonly error?: string;
}

export interface WizardStrategy {
  /** Execute the generation - returns result with URLs (blocking) */
  execute: (input: unknown) => Promise<{ imageUrl?: string; videoUrl?: string }>;
  /** Submit to queue for background processing - returns immediately with requestId */
  submitToQueue?: (input: unknown) => Promise<QueueSubmissionResult>;
}
