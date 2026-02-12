/**
 * Result Unwrappers
 * Domain Service: Unwrap Result types to values
 */

import type { Result } from "./result-type-definitions";
import { isSuccess } from "./result-guards";

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
