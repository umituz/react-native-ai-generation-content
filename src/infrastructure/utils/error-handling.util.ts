/**
 * Centralized Error Handling Utilities
 * Provides consistent error handling patterns across the application
 */

export interface AppError extends Error {
  code?: string;
  statusCode?: number;
  originalError?: unknown;
}

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
 * Type guard to check if value is an Error
 */
export function isError(value: unknown): value is Error {
  return value instanceof Error;
}

/**
 * Type guard to check if value is an AppError
 */
export function isAppError(value: unknown): value is AppError {
  return isError(value) && "code" in value;
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
