/**
 * Result Transformers
 * Domain Service: Transform and chain Result types
 */

import type { Result } from "./result-type-definitions";
import { isSuccess } from "./result-guards";
import { success } from "./result-constructors";

/**
 * Map a successful result to a new value
 * If result is failure, returns the failure unchanged
 */
export function mapResult<T, U, E>(
  result: Result<T, E>,
  fn: (value: T) => U
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
  fn: (value: T) => Promise<Result<U, E>>
): Promise<Result<U, E>> {
  if (isSuccess(result)) {
    return fn(result.value);
  }
  return result;
}
