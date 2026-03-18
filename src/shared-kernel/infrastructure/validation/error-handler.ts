/**
 * Centralized error handling utilities
 * Standardizes error handling across all domains
 */

import type { AppError, ErrorHandlerOptions } from "./error-handler.types";
import { toAppError, getUserFriendlyMessage } from "./error-handler.utils";

/**
 * Handle error with consistent behavior
 */
export function handleError(
  error: unknown,
  options: ErrorHandlerOptions = {}
): AppError {
  const {
    logErrors = true,
    showUserMessage = true,
    transformError,
  } = options;

  const appError = toAppError(error);
  const finalError = transformError ? transformError(appError) : appError;

  if (logErrors) {
    console.error('[Error Handler]', finalError);
  }

  if (showUserMessage) {
    const userMessage = getUserFriendlyMessage(finalError);
    // Could integrate with notification system here
    console.warn('[User Message]', userMessage);
  }

  return finalError;
}

/**
 * Wrap async function with error handling
 */
export function withErrorHandling<T extends (...args: unknown[]) => Promise<unknown>>(
  fn: T,
  options: ErrorHandlerOptions = {}
): T {
  return (async (...args: Parameters<T>) => {
    try {
      return await fn(...args);
    } catch (error) {
      throw handleError(error, options);
    }
  }) as T;
}
