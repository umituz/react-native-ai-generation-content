/**
 * Image-to-Video Presentation Index
 * Exports all presentation layer items (hooks and components)
 */

// =============================================================================
// HOOKS
// =============================================================================

// Form State Hook
export { useImageToVideoFormState } from "./hooks";
export type {
  UseImageToVideoFormStateOptions,
  UseImageToVideoFormStateReturn,
} from "./hooks";

// Generation Hook
export { useImageToVideoGeneration } from "./hooks";
export type {
  UseImageToVideoGenerationOptions,
  UseImageToVideoGenerationReturn,
} from "./hooks";

// Combined Form Hook
export { useImageToVideoForm } from "./hooks";
export type {
  UseImageToVideoFormOptions,
  UseImageToVideoFormReturn,
} from "./hooks";

// Provider-based Feature Hook
export { useImageToVideoFeature } from "./hooks";
export type {
  UseImageToVideoFeatureProps,
  UseImageToVideoFeatureReturn,
} from "./hooks";

// =============================================================================
// COMPONENTS
// =============================================================================

export {
  ImageToVideoAnimationStyleSelector,
  ImageToVideoDurationSelector,
  ImageToVideoSelectionGrid,
  ImageToVideoGenerateButton,
} from "./components";

export type {
  ImageToVideoAnimationStyleSelectorProps,
  ImageToVideoDurationSelectorProps,
  ImageToVideoSelectionGridProps,
  ImageToVideoSelectionGridTranslations,
  ImageToVideoGenerateButtonProps,
} from "./components";
