/**
 * Result Type Guards
 * Domain Service: Type guards for Result pattern
 */

import type { Result, Success, Failure } from "./result-type-definitions";

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
