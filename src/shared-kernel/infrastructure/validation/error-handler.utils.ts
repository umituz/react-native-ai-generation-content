/**
 * Error Handler - Utilities
 * Utility functions for error handling
 */

import type { AppError, ErrorHandlerOptions } from "./error-handler.types";
import { ErrorType } from "./error-handler.types";

/**
 * Create a standardized application error
 */
export function createError(
  type: ErrorType,
  message: string,
  code?: string,
  details?: Record<string, unknown>,
  originalError?: unknown
): AppError {
  return {
    type,
    message,
    code,
    details,
    originalError,
  };
}

/**
 * Convert unknown error to AppError
 */
export function toAppError(error: unknown): AppError {
  if (isAppError(error)) {
    return error;
  }

  if (error instanceof Error) {
    return {
      type: ErrorType.UNKNOWN,
      message: error.message,
      originalError: error,
    };
  }

  return {
    type: ErrorType.UNKNOWN,
    message: String(error),
    originalError: error,
  };
}

/**
 * Check if error is AppError
 */
export function isAppError(error: unknown): error is AppError {
  return (
    typeof error === 'object' &&
    error !== null &&
    'type' in error &&
    'message' in error
  );
}

/**
 * Get user-friendly error message
 */
export function getUserFriendlyMessage(error: AppError): string {
  switch (error.type) {
    case ErrorType.VALIDATION:
      return 'Please check your input and try again.';
    case ErrorType.NETWORK:
      return 'Network error. Please check your connection and try again.';
    case ErrorType.CREDIT:
      return 'Insufficient credits. Please upgrade to continue.';
    case ErrorType.PROVIDER:
      return 'Service temporarily unavailable. Please try again later.';
    default:
      return error.message || 'An unexpected error occurred.';
  }
}
