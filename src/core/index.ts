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
export type { Result, Success, Failure } from "../domain/types/result.types";
export {
  success,
  failure,
  isSuccess,
  isFailure,
  mapResult,
  andThen,
  unwrap,
  unwrapOr,
} from "../domain/types/result.types";

// Error Types
export { AIErrorType } from "../domain/entities/error.types";
export type { AIErrorInfo, AIErrorMessages } from "../domain/entities/error.types";

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
  // Main Provider Interface
  IAIProvider,
} from "../domain/interfaces/ai-provider.interface";

// Segregated provider sub-interfaces
export type { IAIProviderLifecycle } from "../domain/interfaces/provider-lifecycle.interface";
export type { IAIProviderCapabilities } from "../domain/interfaces/provider-capabilities.interface";
export type { IAIProviderJobManager } from "../domains/background/domain/interfaces/provider-job-manager.interface";
export type { IAIProviderExecutor } from "../domain/interfaces/provider-executor.interface";
export type { IAIProviderImageFeatures } from "../domain/interfaces/provider-image-features.interface";
export type { IAIProviderVideoFeatures } from "../domain/interfaces/provider-video-features.interface";
