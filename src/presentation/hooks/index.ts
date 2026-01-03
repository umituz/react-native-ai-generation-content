/**
 * Presentation Hooks
 */

// Base Feature Hooks (Provider-Agnostic)
export * from "./base";

export { useGeneration } from "./use-generation";
export type {
  UseGenerationOptions,
  UseGenerationReturn,
} from "./use-generation";

export { usePendingJobs } from "./use-pending-jobs";
export type {
  UsePendingJobsOptions,
  UsePendingJobsReturn,
} from "./use-pending-jobs";

export { useBackgroundGeneration } from "./use-background-generation";
export type {
  UseBackgroundGenerationOptions,
  UseBackgroundGenerationReturn,
  DirectExecutionResult,
} from "./use-background-generation";

export { usePhotoGeneration } from "./usePhotoGeneration";
export type {
  UsePhotoGenerationReturn,
} from "./usePhotoGeneration";

export type {
  PhotoGenerationInput,
  PhotoGenerationResult,
  PhotoGenerationError,
  PhotoGenerationConfig,
  PhotoGenerationState,
  PhotoGenerationStatus,
} from "./photo-generation.types";

export { useGenerationFlow } from "./useGenerationFlow";
export type {
  UseGenerationFlowOptions,
  UseGenerationFlowReturn,
} from "./useGenerationFlow";

export { useGenerationCallbacksBuilder } from "./useGenerationCallbacksBuilder";
export type {
  CreditType,
  GenerationExecutionResult,
  GenerationCallbacksConfig,
  GenerationCallbacks,
  UseGenerationCallbacksBuilderOptions,
} from "./generation-callbacks.types";

export { useAIFeatureCallbacks } from "./useAIFeatureCallbacks";
export type {
  AIFeatureCallbacksConfig,
  AIFeatureCallbacks,
  AIFeatureGenerationResult,
} from "./useAIFeatureCallbacks";
