/**
 * Error Message Extraction and Creation
 */

import type { AppError } from "./error-types";

/**
 * Safely extracts error message from unknown error type
 */
export function getErrorMessage(error: unknown): string {
  if (error instanceof Error) {
    return error.message;
  }

  if (typeof error === "string") {
    return error;
  }

  if (error && typeof error === "object" && "message" in error) {
    return String(error.message);
  }

  return "An unknown error occurred";
}

/**
 * Creates a standardized application error
 */
export function createAppError(
  message: string,
  options: {
    code?: string;
    statusCode?: number;
    originalError?: unknown;
  } = {}
): AppError {
  const error = new Error(message) as AppError;
  error.code = options.code;
  error.statusCode = options.statusCode;
  error.originalError = options.originalError;
  return error;
}
