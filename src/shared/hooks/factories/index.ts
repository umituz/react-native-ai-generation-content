/**
 * Hook Factories
 * Generic hook creation utilities
 */

export {
  createFormStateHook,
  type FormStateConfig,
  type FormActions,
  type FormStateHookReturn,
  type FormStateHookOptions,
} from "./createFormStateHook";

export {
  createGenerationHook,
  createGenerationHookWithProgress,
  type GenerationState as BaseGenerationState,
  type GenerationCallbacks,
  type GenerationHookConfig,
  type GenerationHookReturn,
} from "./createGenerationHook";
