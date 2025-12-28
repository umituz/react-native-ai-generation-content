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
  FaceSwapResultExtractor,
} from "./domain";

// Presentation Hooks
export { useFaceSwapFeature } from "./presentation";
export type {
  UseFaceSwapFeatureProps,
  UseFaceSwapFeatureReturn,
} from "./presentation";

// Presentation Components
export { FaceSwapFeature } from "./presentation";
export type { FaceSwapFeatureProps } from "./presentation";
