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

/**
 * Safely executes a function and returns null on error
 */
export function safeExecute<T>(
  operation: () => T,
  fallback: T = null as T
): T {
  try {
    return operation();
  } catch {
    return fallback;
  }
}

/**
 * Logs error with context
 */
export function logError(
  error: unknown,
  context?: string
): void {
  const message = getErrorMessage(error);
  const contextPrefix = context ? `[${context}]` : "";

  if (typeof console !== "undefined" && console.error) {
    console.error(`${contextPrefix} Error:`, message, error);
  }
}
