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

export { usePendingJobs } from "../../domains/background/presentation/hooks/use-pending-jobs";
export type {
  UsePendingJobsOptions,
  UsePendingJobsReturn,
} from "../../domains/background/presentation/hooks/use-pending-jobs";

export { useBackgroundGeneration } from "../../domains/background/presentation/hooks/use-background-generation";
export type {
  UseBackgroundGenerationOptions,
  UseBackgroundGenerationReturn,
  DirectExecutionResult,
} from "../../domains/background/presentation/hooks/use-background-generation";

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

