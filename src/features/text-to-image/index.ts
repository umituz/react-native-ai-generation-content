/**
 * Text-to-Image Feature
 * Provider-agnostic text-to-image generation feature
 */

// =============================================================================
// DOMAIN LAYER - Types
// =============================================================================

// Form Types
export type {
  AspectRatio,
  ImageSize,
  OutputFormat,
  NumImages,
  StyleOption,
  TextToImageFormState,
  TextToImageFormActions,
  TextToImageFormDefaults,
} from "./domain";

// Config Types
export type {
  TextToImageGenerationRequest,
  TextToImageGenerationResult,
  TextToImageGenerationResultSuccess,
  TextToImageGenerationResultError,
  TextToImageCallbacks,
  TextToImageFormConfig,
  TextToImageTranslations,
} from "./domain";

// Provider Types
export type {
  TextToImageOptions,
  TextToImageRequest,
  TextToImageResult,
  TextToImageFeatureState,
  TextToImageInputBuilder,
  TextToImageResultExtractor,
  TextToImageFeatureConfig,
} from "./domain";

// =============================================================================
// DOMAIN LAYER - Constants
// =============================================================================

export {
  DEFAULT_IMAGE_STYLES,
  DEFAULT_NUM_IMAGES_OPTIONS,
  DEFAULT_ASPECT_RATIO_OPTIONS,
  DEFAULT_SIZE_OPTIONS,
  DEFAULT_OUTPUT_FORMAT_OPTIONS,
  DEFAULT_FORM_VALUES,
} from "./domain";

// =============================================================================
// INFRASTRUCTURE LAYER
// =============================================================================

export { executeTextToImage, hasTextToImageSupport } from "./infrastructure";
export type { ExecuteTextToImageOptions } from "./infrastructure";

// =============================================================================
// PRESENTATION LAYER - Hooks
// =============================================================================

export { useFormState, useGeneration, useTextToImageForm } from "./presentation";
export type {
  UseFormStateOptions,
  UseFormStateReturn,
  GenerationState,
  UseGenerationOptions,
  UseGenerationReturn,
  UseTextToImageFormOptions,
  UseTextToImageFormReturn,
} from "./presentation";

// Provider-based Feature Hook
export { useTextToImageFeature } from "./presentation";
export type {
  UseTextToImageFeatureProps,
  UseTextToImageFeatureReturn,
} from "./presentation";

// =============================================================================
// PRESENTATION LAYER - Components
// =============================================================================

export {
  TextToImagePromptInput,
  TextToImageExamplePrompts,
  TextToImageNumImagesSelector,
  TextToImageStyleSelector,
  TextToImageAspectRatioSelector,
  TextToImageSizeSelector,
  TextToImageOutputFormatSelector,
  TextToImageGenerateButton,
  TextToImageSettingsSheet,
} from "./presentation";

export type {
  TextToImagePromptInputProps,
  TextToImageExamplePromptsProps,
  TextToImageNumImagesSelectorProps,
  TextToImageStyleSelectorProps,
  TextToImageAspectRatioSelectorProps,
  TextToImageAspectRatioOption,
  TextToImageSizeSelectorProps,
  TextToImageSizeOption,
  TextToImageOutputFormatSelectorProps,
  TextToImageOutputFormatOption,
  TextToImageGenerateButtonProps,
  TextToImageSettingsSheetProps,
} from "./presentation";
