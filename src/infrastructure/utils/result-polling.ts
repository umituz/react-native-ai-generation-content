/**
 * Result Polling Utilities
 */

import { isPermanentError } from "./error-classification";

/**
 * Check if result is not ready yet (used during polling)
 * More specific than isTransientError for result fetching scenarios
 * Returns true for 404/not-found errors that indicate job still processing
 */
export function isResultNotReady(
  error: unknown,
  retryAttempt: number,
  maxRetries: number,
): boolean {
  const message = error instanceof Error ? error.message.toLowerCase() : String(error).toLowerCase();
  const errorName = error instanceof Error ? error.constructor.name.toLowerCase() : "";

  // Check 404/not-found patterns first - these indicate the job is still processing
  const isNotFoundPattern =
    message.includes("not found") ||
    message.includes("404") ||
    message.includes("still in progress") ||
    message.includes("result not ready") ||
    message.includes("request is still in progress") ||
    message.includes("job result not found");

  if (isNotFoundPattern) {
    return true;
  }

  // Only then check for permanent errors
  if (isPermanentError(error)) {
    return false;
  }

  return errorName === "apierror" && retryAttempt < maxRetries - 1;
}
