/**
 * Face Swap Feature
 * Provider-agnostic face swap generation feature
 */

// Domain Types
export type {
  FaceSwapOptions,
  FaceSwapRequest,
  FaceSwapResult,
  FaceSwapFeatureState,
  FaceSwapTranslations,
  FaceSwapFeatureConfig,
  FaceSwapInputBuilder,
  FaceSwapResultExtractor,
} from "./domain";

// Infrastructure Services
export { executeFaceSwap, hasFaceSwapSupport } from "./infrastructure";
export type { ExecuteFaceSwapOptions } from "./infrastructure";

// Presentation Hooks
export { useFaceSwapFeature } from "./presentation";
export type {
  UseFaceSwapFeatureProps,
  UseFaceSwapFeatureReturn,
} from "./presentation";

// Presentation Components
export { FaceSwapFeature } from "./presentation";
export type { FaceSwapFeatureProps } from "./presentation";
