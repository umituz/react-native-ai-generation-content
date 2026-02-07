/**
 * Error Message Extractor
 * Extracts error messages from various API error formats
 */

declare const __DEV__: boolean;

/**
 * FAL API error detail item
 */
interface FalErrorDetail {
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

/**
 * Create a structured generation error
 */
function createGenerationError(
  type: GenerationErrorTypeValue,
  message: string,
): GenerationError {
  const error = new Error(message) as GenerationError;
  (error as { errorType: GenerationErrorTypeValue }).errorType = type;
  (error as { translationKey: string }).translationKey = `error.generation.${type}`;
  return error;
}

/**
 * Check if result contains a FAL API error response
 * FAL sometimes returns errors with COMPLETED status
 */
export function checkFalApiError(result: unknown): void {
  if (!result || typeof result !== "object") return;

  const resultObj = result as { detail?: FalErrorDetail[] };

  // FAL API error format: {detail: [{msg, type, loc}]}
  if (Array.isArray(resultObj.detail) && resultObj.detail.length > 0) {
    const firstError = resultObj.detail[0];
    const errorType = firstError?.type || "unknown";
    const errorMsg = firstError?.msg || "Unknown API error";

    if (typeof __DEV__ !== "undefined" && __DEV__) {
      console.error("[FalApiError] Detected error in result:", {
        type: errorType,
        message: errorMsg,
      });
    }

    // Throw specific error based on type
    if (errorType === "content_policy_violation") {
      throw createGenerationError(GenerationErrorType.CONTENT_POLICY, errorMsg);
    }

    if (errorType === "validation_error" || errorType.includes("validation")) {
      throw createGenerationError(GenerationErrorType.VALIDATION, errorMsg);
    }

    throw createGenerationError(GenerationErrorType.UNKNOWN, errorMsg);
  }
}

/**
 * Check if error is a GenerationError with translation key
 */
export function isGenerationError(error: unknown): error is GenerationError {
  return error instanceof Error && "errorType" in error && "translationKey" in error;
}

/**
 * Get translation key from error (returns key if GenerationError, null otherwise)
 */
export function getErrorTranslationKey(error: unknown): string | null {
  if (isGenerationError(error)) {
    return error.translationKey;
  }

  // Check for content policy in error message
  const message = error instanceof Error ? error.message : String(error);
  const lowerMessage = message.toLowerCase();

  if (lowerMessage.includes("content_policy") || lowerMessage.includes("policy violation")) {
    return `error.generation.${GenerationErrorType.CONTENT_POLICY}`;
  }

  if (lowerMessage.includes("rate limit") || lowerMessage.includes("429")) {
    return `error.generation.${GenerationErrorType.RATE_LIMIT}`;
  }

  if (lowerMessage.includes("timeout") || lowerMessage.includes("timed out")) {
    return `error.generation.${GenerationErrorType.TIMEOUT}`;
  }

  if (lowerMessage.includes("network") || lowerMessage.includes("connection")) {
    return `error.generation.${GenerationErrorType.NETWORK}`;
  }

  return null;
}

/**
 * Extract error message from FAL API and other error formats
 * Supports: Error instances, FAL API errors, generic objects
 * Returns translation key if available, otherwise original message
 */
export function extractErrorMessage(
  error: unknown,
  defaultMessage = "Processing failed",
  debugPrefix?: string,
): string {
  // First check if this is a GenerationError with translation key
  const translationKey = getErrorTranslationKey(error);
  if (translationKey) {
    if (typeof __DEV__ !== "undefined" && __DEV__ && debugPrefix) {
      console.error(`[${debugPrefix}] Error (translation key):`, translationKey);
    }
    return translationKey;
  }

  let message = defaultMessage;

  if (error instanceof Error) {
    message = error.message;
  } else if (typeof error === "object" && error !== null) {
    const errObj = error as Record<string, unknown>;

    // FAL API error format: {detail: [{msg, type, loc}]}
    if (Array.isArray(errObj.detail) && errObj.detail[0]?.msg) {
      const detailType = errObj.detail[0]?.type;
      // Check for content policy in FAL API response
      if (detailType === "content_policy_violation") {
        return `error.generation.${GenerationErrorType.CONTENT_POLICY}`;
      }
      message = String(errObj.detail[0].msg);
    } else if (errObj.detail) {
      message = JSON.stringify(errObj.detail);
    } else if (errObj.message) {
      message = String(errObj.message);
    } else if (errObj.msg) {
      message = String(errObj.msg);
    }
  }

  if (typeof __DEV__ !== "undefined" && __DEV__ && debugPrefix) {
    console.error(`[${debugPrefix}] Error:`, message, error);
  }

  return message;
}
