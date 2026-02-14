/**
 * Error Handling Utilities
 */

import { getErrorMessage } from "./error-extractors";

/**
 * Sanitizes error message to prevent information disclosure
 * Removes sensitive data like file paths, API keys, stack traces
 */
function sanitizeErrorMessage(message: string): string {
  if (!message) return "An error occurred";

  // Remove file paths (Unix and Windows style)
  let sanitized = message.replace(/\/[\w\/\-.]+/g, "[PATH]");
  sanitized = sanitized.replace(/[A-Z]:\\[\w\\\-.]+/g, "[PATH]");

  // Remove potential API keys or tokens (common patterns)
  sanitized = sanitized.replace(/[a-z0-9]{32,}/gi, "[TOKEN]");

  // Remove stack trace lines
  sanitized = sanitized.split("\n")[0];

  // Limit length
  return sanitized.slice(0, 500);
}

/**
 * Wraps an async function with error handling
 */
export async function withErrorHandling<T>(
  operation: () => Promise<T>,
  onError?: (error: Error) => void
): Promise<{ data?: T; error?: Error }> {
  try {
    const data = await operation();
    return { data };
  } catch (error) {
    const errorMessage = getErrorMessage(error);
    const sanitizedMessage = sanitizeErrorMessage(errorMessage);
    const appError = new Error(sanitizedMessage);

    // In production, don't expose original error details
    if (typeof __DEV__ !== "undefined" && __DEV__) {
      console.error("[withErrorHandling] Original error:", error);
    }

    onError?.(appError);
    return { error: appError };
  }
}

declare const __DEV__: boolean;

