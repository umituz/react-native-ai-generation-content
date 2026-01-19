/**
 * Image-to-Video Feature
 * Provider-agnostic image-to-video generation feature
 */

// =============================================================================
// DOMAIN LAYER - Types
// =============================================================================

// Animation Types
export type { AnimationStyle, AnimationStyleId } from "./domain";

// Music Types
export type { MusicMood, MusicMoodId } from "./domain";

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
// DOMAIN LAYER - Constants
// =============================================================================

export {
  DEFAULT_ANIMATION_STYLES as IMAGE_TO_VIDEO_ANIMATION_STYLES,
  DEFAULT_ANIMATION_STYLE_ID as IMAGE_TO_VIDEO_DEFAULT_ANIMATION,
  DEFAULT_MUSIC_MOODS as IMAGE_TO_VIDEO_MUSIC_MOODS,
  DEFAULT_MUSIC_MOOD_ID as IMAGE_TO_VIDEO_DEFAULT_MUSIC,
  DEFAULT_DURATION_OPTIONS as IMAGE_TO_VIDEO_DURATION_OPTIONS,
  DEFAULT_VIDEO_DURATION as IMAGE_TO_VIDEO_DEFAULT_DURATION,
  DEFAULT_FORM_VALUES as IMAGE_TO_VIDEO_FORM_DEFAULTS,
  DEFAULT_FORM_CONFIG as IMAGE_TO_VIDEO_CONFIG,
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
  ImageToVideoMusicMoodSelector,
  ImageToVideoSelectionGrid,
  ImageToVideoGenerateButton,
} from "./presentation";

export type {
  ImageToVideoAnimationStyleSelectorProps,
  ImageToVideoDurationSelectorProps,
  ImageToVideoMusicMoodSelectorProps,
  ImageToVideoSelectionGridProps,
  ImageToVideoSelectionGridTranslations,
  ImageToVideoGenerateButtonProps,
} from "./presentation";
