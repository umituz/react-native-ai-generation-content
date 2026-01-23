/**
 * Domain Types
 * Core type definitions for the AI generation content package
 */

export type {
  Result,
  Success,
  Failure,
} from "./result.types";

export {
  success,
  failure,
  isSuccess,
  isFailure,
  mapResult,
  andThen,
  unwrap,
  unwrapOr,
} from "./result.types";
