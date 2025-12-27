/**
 * Anime Selfie Feature
 * Provider-agnostic anime selfie generation feature
 */

// Domain Types
export type {
  AnimeSelfieStyle,
  AnimeSelfieOptions,
  AnimeSelfieRequest,
  AnimeSelfieResult,
  AnimeSelfieFeatureState,
  AnimeSelfieTranslations,
  AnimeSelfieFeatureConfig,
  AnimeSelfieInputBuilder,
  AnimeSelfieResultExtractor,
} from "./domain";

// Infrastructure Services
export { executeAnimeSelfie, hasAnimeSelfieSupport } from "./infrastructure";
export type { ExecuteAnimeSelfieOptions } from "./infrastructure";

// Presentation Hooks
export { useAnimeSelfieFeature } from "./presentation";
export type {
  UseAnimeSelfieFeatureProps,
  UseAnimeSelfieFeatureReturn,
} from "./presentation";

// Presentation Components
export { AnimeSelfieFeature } from "./presentation";
export type { AnimeSelfieFeatureProps } from "./presentation";
