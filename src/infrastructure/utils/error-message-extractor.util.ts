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

    if (__DEV__) {
      console.error("[FalApiError] Detected error in result:", {
        type: errorType,
        message: errorMsg,
      });
    }

    // Throw specific error based on type
    if (errorType === "content_policy_violation") {
      throw new Error(`Content policy violation: ${errorMsg}`);
    }

    throw new Error(errorMsg);
  }
}

/**
 * Extract error message from FAL API and other error formats
 * Supports: Error instances, FAL API errors, generic objects
 */
export function extractErrorMessage(
  error: unknown,
  defaultMessage = "Processing failed",
  debugPrefix?: string,
): string {
  let message = defaultMessage;

  if (error instanceof Error) {
    message = error.message;
  } else if (typeof error === "object" && error !== null) {
    const errObj = error as Record<string, unknown>;

    // FAL API error format: {detail: [{msg, type, loc}]}
    if (Array.isArray(errObj.detail) && errObj.detail[0]?.msg) {
      message = String(errObj.detail[0].msg);
    } else if (errObj.detail) {
      message = JSON.stringify(errObj.detail);
    } else if (errObj.message) {
      message = String(errObj.message);
    } else if (errObj.msg) {
      message = String(errObj.msg);
    }
  }

  if (__DEV__ && debugPrefix) {
    console.error(`[${debugPrefix}] Error:`, message, error);
  }

  return message;
}
