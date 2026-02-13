/**
 * Error Classification Utilities
 */

import { isError } from "./error-types";

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

