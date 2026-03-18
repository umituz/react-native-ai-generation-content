/**
 * Error Handler - Types
 * Type definitions for error handling
 */

/**
 * Error types for categorization
 */
export enum ErrorType {
  VALIDATION = 'VALIDATION',
  NETWORK = 'NETWORK',
  CREDIT = 'CREDIT',
  PROVIDER = 'PROVIDER',
  UNKNOWN = 'UNKNOWN',
}

/**
 * Application error structure
 */
export interface AppError {
  type: ErrorType;
  message: string;
  code?: string;
  details?: Record<string, unknown>;
  originalError?: unknown;
}

/**
 * Error handler options
 */
export interface ErrorHandlerOptions {
  /** Log errors to console */
  logErrors?: boolean;
  /** Show user-friendly messages */
  showUserMessage?: boolean;
  /** Custom error transformer */
  transformError?: (error: AppError) => AppError;
}
