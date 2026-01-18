/**
 * Error Message Extractor
 * Extracts error messages from various API error formats
 */

declare const __DEV__: boolean;

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
