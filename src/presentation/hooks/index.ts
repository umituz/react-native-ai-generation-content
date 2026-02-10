/**
 * Presentation Hooks
 */

// Generation Orchestrator (Centralized)
export {
  useGenerationOrchestrator,
  useImageGeneration,
  useVideoGeneration,
  useDualImageGeneration,
  useImagePicker,
  createGenerationError,
  getAlertMessage,
  parseError,
} from "./generation";
export type {
  GenerationStrategy,
  GenerationConfig,
  GenerationState,
  OrchestratorStatus,
  GenerationError,
  GenerationErrorType,
  AlertMessages,
  UseGenerationOrchestratorReturn,
  GenerationErrorConfig,
  GenerationErrorTranslations,
  SingleImageInput,
  DualImageInput,
  ImageGenerationInput,
  ImageGenerationConfig,
  DualImageVideoInput,
  VideoGenerationConfig,
  DualImageGenerationConfig,
  DualImageGenerationReturn,
  ImagePickerState,
  UseImagePickerOptions,
  UseImagePickerReturn,
} from "./generation";

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

export { useGenerationFlow } from "./useGenerationFlow";
export type {
  UseGenerationFlowOptions,
  UseGenerationFlowReturn,
} from "./useGenerationFlow";

export { useAIFeatureCallbacks } from "./useAIFeatureCallbacks";
export type {
  AIFeatureCallbacksConfig,
  AIFeatureCallbacks,
  AIFeatureGenerationResult,
} from "./useAIFeatureCallbacks";

export { useAIGenerateState, AIGenerateStep } from "./generation/useAIGenerateState";
export type { UploadedImage } from "./generation/useAIGenerateState";

export { useProgressDismiss } from "./useProgressDismiss";
export type { UseProgressDismissResult } from "./useProgressDismiss";
