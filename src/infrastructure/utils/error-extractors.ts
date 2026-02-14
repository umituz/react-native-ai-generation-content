/**
 * Error Message Extraction
 */

/**
 * Safely extracts error message from unknown error type
 * @param error - The error to extract message from
 * @param prefix - Optional prefix to prepend to error message
 * @returns The extracted error message with optional prefix
 */
export function getErrorMessage(error: unknown, prefix?: string): string {
  let message = "An unknown error occurred";

  if (error instanceof Error) {
    message = error.message;
  } else if (typeof error === "string") {
    message = error;
  } else if (error && typeof error === "object" && "message" in error) {
    message = String(error.message);
  }

  return prefix ? `${prefix}: ${message}` : message;
}

