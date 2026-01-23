/**
 * Result Type Pattern for Functional Error Handling
 * Inspired by Rust's Result<T, E> type
 *
 * @see https://arg-software.medium.com/functional-error-handling-in-typescript-with-the-result-pattern-5b96a5abb6d3
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

/**
 * Create a successful result
 */
export function success<T>(value: T): Success<T> {
  return { success: true, value };
}

/**
 * Create a failed result
 */
export function failure<E>(error: E): Failure<E> {
  return { success: false, error };
}

/**
 * Type guard to check if result is successful
 */
export function isSuccess<T, E>(result: Result<T, E>): result is Success<T> {
  return result.success === true;
}

/**
 * Type guard to check if result is a failure
 */
export function isFailure<T, E>(result: Result<T, E>): result is Failure<E> {
  return result.success === false;
}

/**
 * Map a successful result to a new value
 * If result is failure, returns the failure unchanged
 */
export function mapResult<T, U, E>(
  result: Result<T, E>,
  fn: (value: T) => U,
): Result<U, E> {
  if (isSuccess(result)) {
    return success(fn(result.value));
  }
  return result;
}

/**
 * Chain async operations on Result types
 * Similar to Promise.then() but for Result
 */
export async function andThen<T, U, E>(
  result: Result<T, E>,
  fn: (value: T) => Promise<Result<U, E>>,
): Promise<Result<U, E>> {
  if (isSuccess(result)) {
    return fn(result.value);
  }
  return result;
}

/**
 * Unwrap a result, throwing if it's a failure
 * Use only when you're certain the result is successful
 */
export function unwrap<T, E>(result: Result<T, E>): T {
  if (isSuccess(result)) {
    return result.value;
  }
  throw new Error(`Called unwrap on a failure: ${String(result.error)}`);
}

/**
 * Unwrap a result or return a default value
 */
export function unwrapOr<T, E>(result: Result<T, E>, defaultValue: T): T {
  if (isSuccess(result)) {
    return result.value;
  }
  return defaultValue;
}
