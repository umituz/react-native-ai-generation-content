/**
 * Upscaling Feature
 * Provider-agnostic image upscaling feature
 */

// Domain Types
export type {
  UpscaleScaleFactor,
  UpscaleOptions,
  UpscaleRequest,
  UpscaleResult,
  UpscaleFeatureState,
  UpscaleTranslations,
  UpscaleFeatureConfig,
} from "./domain";

// Presentation Hooks
export { useUpscaleFeature } from "./presentation";
export type { UseUpscaleFeatureProps } from "./presentation";

// Presentation Components
export { UpscaleFeature, UpscaleResultView } from "./presentation";
export type {
  UpscaleFeatureProps,
  UpscaleResultViewProps,
} from "./presentation";
