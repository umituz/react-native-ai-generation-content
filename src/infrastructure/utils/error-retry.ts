/**
 * Error Retry Utilities
 */

import { getErrorMessage } from "./error-extractors";

/**
 * Retry function with exponential backoff
 */
export async function retryWithBackoff<T>(
  operation: () => Promise<T>,
  options: {
    maxRetries?: number;
    delayMs?: number;
    backoffMultiplier?: number;
    shouldRetry?: (error: Error) => boolean;
  } = {}
): Promise<T> {
  const {
    maxRetries = 3,
    delayMs = 1000,
    backoffMultiplier = 2,
    shouldRetry = () => true,
  } = options;

  let lastError: Error | undefined;

  for (let attempt = 0; attempt <= maxRetries; attempt++) {
    try {
      return await operation();
    } catch (error) {
      lastError = error instanceof Error ? error : new Error(getErrorMessage(error));

      if (attempt === maxRetries || !shouldRetry(lastError)) {
        throw lastError;
      }

      const delay = delayMs * Math.pow(backoffMultiplier, attempt);
      await new Promise((resolve) => setTimeout(resolve, delay));
    }
  }

  throw lastError!;
}
