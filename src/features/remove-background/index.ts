/**
 * Remove Background Feature
 * Provider-agnostic background removal feature
 */

// Domain Types
export type {
  RemoveBackgroundOptions,
  RemoveBackgroundRequest,
  RemoveBackgroundResult,
  RemoveBackgroundFeatureState,
  RemoveBackgroundTranslations,
  RemoveBackgroundFeatureConfig,
  RemoveBackgroundInputBuilder,
  RemoveBackgroundResultExtractor,
} from "./domain";

// Infrastructure Services
export { executeRemoveBackground, hasRemoveBackgroundSupport } from "./infrastructure";
export type { ExecuteRemoveBackgroundOptions } from "./infrastructure";

// Presentation Hooks
export { useRemoveBackgroundFeature } from "./presentation";
export type {
  UseRemoveBackgroundFeatureProps,
  UseRemoveBackgroundFeatureReturn,
} from "./presentation";

// Presentation Components
export { RemoveBackgroundFeature } from "./presentation";
export type { RemoveBackgroundFeatureProps } from "./presentation";
