/**
 * Result Constructors
 * Domain Service: Factory functions for creating Result types
 */

import type { Success, Failure } from "./result-type-definitions";

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
