/**
 * Error Handling Utilities
 */

import { getErrorMessage } from "./error-extractors";

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
    const appError = error instanceof Error ? error : new Error(getErrorMessage(error));
    onError?.(appError);
    return { error: appError };
  }
}

