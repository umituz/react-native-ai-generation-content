/**
 * Error Factory Functions
 */

export const GenerationErrorType = {
  CONTENT_POLICY: "content_policy",
  RATE_LIMIT: "rate_limit",
  TIMEOUT: "timeout",
  VALIDATION: "validation",
  NETWORK: "network",
  UNKNOWN: "unknown",
} as const;

type GenerationErrorTypeValue = typeof GenerationErrorType[keyof typeof GenerationErrorType];

interface GenerationError extends Error {
  errorType: GenerationErrorTypeValue;
  translationKey: string;
}

/**
 * Create a structured generation error
 */
export function createGenerationError(
  type: GenerationErrorTypeValue,
  message: string,
): GenerationError {
  const error = new Error(message) as GenerationError;
  (error as { errorType: GenerationErrorTypeValue }).errorType = type;
  (error as { translationKey: string }).translationKey = `error.generation.${type}`;
  return error;
}

/**
 * Check if error is a GenerationError with translation key
 */
export function isGenerationError(error: unknown): error is GenerationError {
  return error instanceof Error && "errorType" in error && "translationKey" in error;
}
