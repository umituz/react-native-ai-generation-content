/**
 * Generic Generation Hook Factory
 * Creates type-safe generation hooks with error handling, progress tracking, and abort support
 */

export { createGenerationHook, createGenerationHookWithProgress } from "./createGenerationHook";
export type {
  GenerationState,
  GenerationCallbacks,
  GenerationHookConfig,
  GenerationHookReturn,
} from "./generation-hook-types";
