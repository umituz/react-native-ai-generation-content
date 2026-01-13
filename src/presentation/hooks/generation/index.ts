/**
 * Generation Module
 * Feature-agnostic AI generation orchestration
 */

// Core orchestrator
export { useGenerationOrchestrator } from "./orchestrator";

// Generic feature hooks
export { useImageGeneration } from "./useImageGeneration";
export { useVideoGeneration } from "./useVideoGeneration";

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
  AuthCallbacks,
  ModerationCallbacks,
  ModerationResult,
  CreditCallbacks,
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

// Error utilities
export {
  createGenerationError,
  getAlertMessage,
  parseError,
} from "./errors";
