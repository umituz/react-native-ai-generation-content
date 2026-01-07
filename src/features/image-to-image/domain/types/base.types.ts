/**
 * Base Image-to-Image Types
 * Common types for all image processing features
 */

import type { ImageFeatureType } from "../../../../domain/interfaces";

// Re-export all partial types
export type {
  BaseSingleImageState,
  BaseImageWithPromptState,
  BaseDualImageState,
} from "./partials/state.types";

export type {
  BaseImageResult,
  BaseImageResultWithCreationId,
  ImageResultExtractor,
  SingleImageProcessingStartData,
  DualImageProcessingStartData,
} from "./partials/result.types";

export type {
  BaseImageTranslations,
  BaseDualImageTranslations,
} from "./partials/translation.types";

export type {
  BaseImageConfig,
  SingleImageConfig,
  DualImageConfig,
} from "./partials/config.types";

export type {
  BaseSingleImageHookProps,
  BaseDualImageHookProps,
  BaseSingleImageHookReturn,
  BaseDualImageHookReturn,
} from "./partials/hook.types";

export type {
  ImageProcessingCategory,
  ImageInputMode,
  ImageFeatureMetadata,
} from "./partials/metadata.types";

// Legacy re-exports for backward compatibility
export type { ImageFeatureType };
