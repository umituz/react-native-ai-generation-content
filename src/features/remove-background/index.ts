/**
export * from "./presentation/components";
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
} from "./domain";

// Presentation Hooks
export { useRemoveBackgroundFeature } from "./presentation";
export type { UseRemoveBackgroundFeatureProps } from "./presentation";

// Presentation Components
export { RemoveBackgroundFeature } from "./presentation";
export type { RemoveBackgroundFeatureProps } from "./presentation";
