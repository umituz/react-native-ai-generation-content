/**
 * Error Extraction Type Definitions
 */

/**
 * FAL API error detail item
 */
export interface FalErrorDetail {
  readonly msg?: string;
  readonly type?: string;
  readonly loc?: string[];
  readonly input?: string;
  readonly url?: string;
}

/**
 * Error types for user-friendly messages
 */
export const GenerationErrorType = {
  CONTENT_POLICY: "content_policy",
  VALIDATION: "validation",
  NETWORK: "network",
  TIMEOUT: "timeout",
  RATE_LIMIT: "rate_limit",
  QUOTA_EXCEEDED: "quota_exceeded",
  UNKNOWN: "unknown",
} as const;

export type GenerationErrorTypeValue = typeof GenerationErrorType[keyof typeof GenerationErrorType];

/**
 * Structured generation error
 */
export interface GenerationError extends Error {
  readonly errorType: GenerationErrorTypeValue;
  readonly translationKey: string;
}
