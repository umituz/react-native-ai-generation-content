/**
 * Text-to-Image Presentation Hooks
 * All hook exports for text-to-image feature
 */

// Form State Hook
export { useFormState } from "./useFormState";
export type { UseFormStateOptions, UseFormStateReturn } from "./useFormState";

// Generation Hook
export { useGeneration } from "./useGeneration";
export type {
  GenerationState,
  UseGenerationOptions,
  UseGenerationReturn,
} from "./useGeneration";

// Combined Form Hook
export { useTextToImageForm } from "./useTextToImageForm";
export type {
  UseTextToImageFormOptions,
  UseTextToImageFormReturn,
} from "./useTextToImageForm";

// Provider-based Feature Hook (existing)
export { useTextToImageFeature } from "./useTextToImageFeature";
export type {
  UseTextToImageFeatureProps,
  UseTextToImageFeatureReturn,
} from "./useTextToImageFeature";

// Callbacks Builder Hook
export { useTextToImageCallbacksBuilder } from "./useTextToImageCallbacksBuilder";
export type {
  TextToImageCallbacksBuilderConfig,
  UseTextToImageCallbacksBuilderOptions,
  UseTextToImageCallbacksBuilderReturn,
} from "./useTextToImageCallbacksBuilder";
