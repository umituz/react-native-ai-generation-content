/**
 * Error Type Definitions and Guards
 */

export interface AppError extends Error {
  code?: string;
  statusCode?: number;
  originalError?: unknown;
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
