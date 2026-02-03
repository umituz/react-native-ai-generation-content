/**
 * @umituz/react-native-ai-generation-content/core
 *
 * Core types for AI generation providers.
 * This module contains ONLY types and utilities - no implementation details.
 *
 * Use this subpath for provider implementations:
 * ```typescript
 * import type { IAIProvider, AIProviderConfig } from "@umituz/react-native-ai-generation-content/core";
 * ```
 *
 * @module @umituz/react-native-ai-generation-content/core
 */

// Result Pattern
export type { Result, Success, Failure } from "./types/result.types";
export {
  success,
  failure,
  isSuccess,
  isFailure,
  mapResult,
  andThen,
  unwrap,
  unwrapOr,
} from "./types/result.types";

// Error Types
export { AIErrorType } from "./types/error.types";
export type { AIErrorInfo, AIErrorMessages } from "./types/error.types";

// Provider Types
export type {
  // Feature Types
  ImageFeatureType,
  VideoFeatureType,
  // Config
  AIProviderConfig,
  // Status
  AIJobStatusType,
  AILogEntry,
  JobSubmission,
  JobStatus,
  // Progress
  ProviderProgressInfo,
  SubscribeOptions,
  RunOptions,
  // Capabilities
  ProviderCapabilities,
  // Input Data
  ImageFeatureInputData,
  VideoFeatureInputData,
  // Provider Interfaces
  IAIProviderLifecycle,
  IAIProviderCapabilities,
  IAIProviderJobManager,
  IAIProviderExecutor,
  IAIProviderImageFeatures,
  IAIProviderVideoFeatures,
  IAIProvider,
} from "./types/provider.types";
