/**
 * Error Message Extraction Functions
 */

import { GenerationErrorType } from "./extraction-types";
import { isGenerationError } from "./error-factory";

declare const __DEV__: boolean;

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
