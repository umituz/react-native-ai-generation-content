/**
 * Image-to-Video Feature
 * Provider-agnostic image-to-video generation feature
 */

// Domain Types
export type {
  ImageToVideoOptions,
  ImageToVideoRequest,
  ImageToVideoResult,
  ImageToVideoFeatureState,
  ImageToVideoTranslations,
  ImageToVideoInputBuilder,
  ImageToVideoResultExtractor,
  ImageToVideoFeatureConfig,
} from "./domain";

// Infrastructure Services
export { executeImageToVideo, hasImageToVideoSupport } from "./infrastructure";
export type { ExecuteImageToVideoOptions } from "./infrastructure";

// Presentation Hooks
export { useImageToVideoFeature } from "./presentation";
export type {
  UseImageToVideoFeatureProps,
  UseImageToVideoFeatureReturn,
} from "./presentation";
