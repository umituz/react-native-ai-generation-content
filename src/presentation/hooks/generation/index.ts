/**
 * Generation Module
 * Feature-agnostic AI generation orchestration
 */

// Core orchestrator
export { useGenerationOrchestrator } from "./orchestrator";

// Generic feature hooks
export { useImageGeneration } from "./useImageGeneration";
export { useVideoGeneration } from "./useVideoGeneration";
export { useDualImageGeneration } from "./useDualImageGeneration";

// Types
export type {
  GenerationStrategy,
  GenerationConfig,
  GenerationState,
  OrchestratorStatus,
  GenerationError,
  GenerationErrorType,
  AlertMessages,
  UseGenerationOrchestratorReturn,
  ModerationCallbacks,
  ModerationResult,
  LifecycleConfig,
  GenerationErrorConfig,
  GenerationErrorTranslations,
} from "./types";

export type {
  SingleImageInput,
  DualImageInput,
  ImageGenerationInput,
  ImageGenerationConfig,
} from "./useImageGeneration";

export type {
  DualImageVideoInput,
  VideoGenerationConfig,
} from "./useVideoGeneration";

export type {
  DualImageGenerationConfig,
  DualImageGenerationReturn,
} from "./useDualImageGeneration";

// Error utilities
export {
  createGenerationError,
  getAlertMessage,
  parseError,
} from "./errors";
