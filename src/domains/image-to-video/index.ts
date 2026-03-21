/**
 * Image-to-Video Feature
 * Provider-agnostic image-to-video generation feature
 */

// =============================================================================
// DOMAIN LAYER - Types
// =============================================================================

// Animation Types
export type { AnimationStyle, AnimationStyleId } from "./domain/index";

// Duration Types
export type { VideoDuration, DurationOption } from "./domain/index";

// Form Types
export type {
  ImageToVideoFormState,
  ImageToVideoFormActions,
  ImageToVideoFormDefaults,
} from "./domain/index";

// Config Types
export type {
  ImageToVideoCallbacks,
  ImageToVideoFormConfig,
  ImageToVideoTranslationsExtended,
} from "./domain/index";

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
} from "./domain/index";

// =============================================================================
// INFRASTRUCTURE LAYER
// =============================================================================

export { executeImageToVideo, hasImageToVideoSupport } from "./infrastructure/services";
export type { ExecuteImageToVideoOptions } from "./infrastructure/services";

// =============================================================================
// PRESENTATION LAYER - Hooks
// =============================================================================

export {
  useImageToVideoFormState,
  useImageToVideoGeneration,
  useImageToVideoForm,
} from "./presentation/index";
export type {
  UseImageToVideoFormStateOptions,
  UseImageToVideoFormStateReturn,
  UseImageToVideoGenerationOptions,
  UseImageToVideoGenerationReturn,
  UseImageToVideoFormOptions,
  UseImageToVideoFormReturn,
} from "./presentation/index";

// Provider-based Feature Hook
export { useImageToVideoFeature } from "./presentation/index";
export type {
  UseImageToVideoFeatureProps,
  UseImageToVideoFeatureReturn,
} from "./presentation/index";

// =============================================================================
// PRESENTATION LAYER - Components
// =============================================================================

export {
  ImageToVideoAnimationStyleSelector,
  ImageToVideoDurationSelector,
  ImageToVideoSelectionGrid,
  ImageToVideoGenerateButton,
} from "./presentation/index";

export type {
  ImageToVideoAnimationStyleSelectorProps,
  ImageToVideoDurationSelectorProps,
  ImageToVideoSelectionGridProps,
  ImageToVideoSelectionGridTranslations,
  ImageToVideoGenerateButtonProps,
} from "./presentation/index";
