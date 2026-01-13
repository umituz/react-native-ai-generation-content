/**
 * Generation Module
 * Feature-agnostic AI generation orchestration
 */

export { useGenerationOrchestrator } from "./orchestrator";

export type {
  GenerationStrategy,
  GenerationConfig,
  GenerationState,
  OrchestratorStatus,
  GenerationError,
  GenerationErrorType,
  AlertMessages,
  UseGenerationOrchestratorReturn,
} from "./types";

export {
  createGenerationError,
  getAlertMessage,
  parseError,
} from "./errors";
