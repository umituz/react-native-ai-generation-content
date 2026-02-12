/**
 * Result Type Pattern - Barrel Export
 * Functional error handling inspired by Rust's Result<T, E>
 *
 * Architecture:
 * - Domain: Type definitions (Success, Failure, Result)
 * - Domain Services: Constructors, guards, transformers, unwrappers
 *
 * @see https://arg-software.medium.com/functional-error-handling-in-typescript-with-the-result-pattern-5b96a5abb6d3
 */

export type { Success, Failure, Result } from "./result-type-definitions";
export { success, failure } from "./result-constructors";
export { isSuccess, isFailure } from "./result-guards";
export { mapResult, andThen } from "./result-transformers";
export { unwrap, unwrapOr } from "./result-unwrappers";
