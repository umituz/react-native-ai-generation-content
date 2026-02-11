/**
 * Image-to-Video Feature
 * Provider-agnostic image-to-video generation feature
 */

// =============================================================================
// DOMAIN LAYER - Types
// =============================================================================

// Animation Types
export type { AnimationStyle, AnimationStyleId } from "./domain";

// Duration Types
export type { VideoDuration, DurationOption } from "./domain";

// Form Types
export type {
  ImageToVideoFormState,
  ImageToVideoFormActions,
  ImageToVideoFormDefaults,
} from "./domain";

// Config Types
export type {
  ImageToVideoCallbacks,
  ImageToVideoFormConfig,
  ImageToVideoTranslationsExtended,
} from "./domain";

// Core Feature Types
export type {
  ImageToVideoOptions,
  ImageToVideoGenerateParams,
  ImageToVideoRequest,
  ImageToVideoResult,
  ImageToVideoGenerationState,
  ImageToVideoFeatureState,
  ImageToVideoTranslations,
  ImageToVideoInputBuilder,
  ImageToVideoResultExtractor,
  ImageToVideoFeatureCallbacks,
  ImageToVideoGenerationStartData,
  ImageToVideoCreationData,
  ImageToVideoFeatureConfig,
} from "./domain";

// =============================================================================
// INFRASTRUCTURE LAYER
// =============================================================================

export { executeImageToVideo, hasImageToVideoSupport } from "./infrastructure";
export type { ExecuteImageToVideoOptions } from "./infrastructure";

// =============================================================================
// PRESENTATION LAYER - Hooks
// =============================================================================

export {
  useImageToVideoFormState,
  useImageToVideoGeneration,
  useImageToVideoForm,
} from "./presentation";
export type {
  UseImageToVideoFormStateOptions,
  UseImageToVideoFormStateReturn,
  UseImageToVideoGenerationOptions,
  UseImageToVideoGenerationReturn,
  UseImageToVideoFormOptions,
  UseImageToVideoFormReturn,
} from "./presentation";

// Provider-based Feature Hook
export { useImageToVideoFeature } from "./presentation";
export type {
  UseImageToVideoFeatureProps,
  UseImageToVideoFeatureReturn,
} from "./presentation";

// =============================================================================
// PRESENTATION LAYER - Components
// =============================================================================

export {
  ImageToVideoAnimationStyleSelector,
  ImageToVideoDurationSelector,
  ImageToVideoSelectionGrid,
  ImageToVideoGenerateButton,
} from "./presentation";

export type {
  ImageToVideoAnimationStyleSelectorProps,
  ImageToVideoDurationSelectorProps,
  ImageToVideoSelectionGridProps,
  ImageToVideoSelectionGridTranslations,
  ImageToVideoGenerateButtonProps,
} from "./presentation";
