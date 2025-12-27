/**
 * Text-to-Video Feature
 * Provider-agnostic text-to-video generation feature
 */

// Domain Types
export type {
  TextToVideoOptions,
  TextToVideoRequest,
  TextToVideoResult,
  TextToVideoFeatureState,
  TextToVideoTranslations,
  TextToVideoInputBuilder,
  TextToVideoResultExtractor,
  TextToVideoFeatureConfig,
} from "./domain";

// Infrastructure Services
export { executeTextToVideo, hasTextToVideoSupport } from "./infrastructure";
export type { ExecuteTextToVideoOptions } from "./infrastructure";

// Presentation Hooks
export { useTextToVideoFeature } from "./presentation";
export type {
  UseTextToVideoFeatureProps,
  UseTextToVideoFeatureReturn,
} from "./presentation";
