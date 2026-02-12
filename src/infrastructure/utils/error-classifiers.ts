/**
 * Error Classification Utilities
 */

import { isError, isAppError } from "./error-types";

/**
 * Checks if error is a network error
 */
export function isNetworkError(error: unknown): boolean {
  if (!isError(error)) {
    return false;
  }

  const message = error.message.toLowerCase();
  return (
    message.includes("network") ||
    message.includes("fetch") ||
    message.includes("connection") ||
    message.includes("timeout")
  );
}

/**
 * Checks if error is a validation error
 */
export function isValidationError(error: unknown): boolean {
  if (isAppError(error)) {
    return error.code?.toLowerCase().includes("validation") || false;
  }
  return false;
}

/**
 * Checks if error is an authentication error
 */
export function isAuthError(error: unknown): boolean {
  if (!isError(error)) {
    return false;
  }

  const message = error.message.toLowerCase();
  return (
    message.includes("unauthorized") ||
    message.includes("authentication") ||
    message.includes("forbidden") ||
    message.includes("token")
  );
}
