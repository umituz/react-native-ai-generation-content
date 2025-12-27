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
  UpscaleInputBuilder,
  UpscaleResultExtractor,
} from "./domain";

// Infrastructure Services
export { executeUpscale, hasUpscaleSupport } from "./infrastructure";
export type { ExecuteUpscaleOptions } from "./infrastructure";

// Presentation Hooks
export { useUpscaleFeature } from "./presentation";
export type {
  UseUpscaleFeatureProps,
  UseUpscaleFeatureReturn,
} from "./presentation";

// Presentation Components
export { UpscaleFeature, UpscaleResultView } from "./presentation";
export type {
  UpscaleFeatureProps,
  UpscaleResultViewProps,
} from "./presentation";
