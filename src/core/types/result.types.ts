/**
 * Result Type Pattern for Functional Error Handling
 * Re-exports from canonical domain source
 *
 * @module @umituz/react-native-ai-generation-content/core
 */

export type { Result, Success, Failure } from "../../domain/types/result.types";
export {
  success,
  failure,
  isSuccess,
  isFailure,
  mapResult,
  andThen,
  unwrap,
  unwrapOr,
} from "../../domain/types/result.types";
