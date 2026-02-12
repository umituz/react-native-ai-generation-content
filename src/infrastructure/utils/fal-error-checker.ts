/**
 * FAL API Error Checker
 */

import type { FalErrorDetail } from "./extraction-types";
import { GenerationErrorType } from "./extraction-types";
import { createGenerationError } from "./error-factory";

declare const __DEV__: boolean;

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
