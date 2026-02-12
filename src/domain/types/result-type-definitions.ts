/**
 * Result Type Definitions
 * Domain: Core types for functional error handling
 * Inspired by Rust's Result<T, E> type
 */

/**
 * Success result containing a value of type T
 */
export interface Success<T> {
  success: true;
  value: T;
}

/**
 * Failure result containing an error of type E
 */
export interface Failure<E> {
  success: false;
  error: E;
}

/**
 * Result type that can be either Success or Failure
 * Forces explicit error handling at compile time
 */
export type Result<T, E = string> = Success<T> | Failure<E>;
