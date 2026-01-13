/**
 * Remove Background Feature
 * Provider-agnostic background removal feature
 */

// Domain Types
export type {
  RemoveBackgroundOptions,
  RemoveBackgroundResult,
  RemoveBackgroundFeatureState,
  RemoveBackgroundTranslations,
  RemoveBackgroundFeatureConfig,
} from "./domain";

// Presentation Hooks
export { useRemoveBackgroundFeature, type UseRemoveBackgroundFeatureProps } from "./presentation";

// Presentation Components
export { RemoveBackgroundFeature, type RemoveBackgroundFeatureProps } from "./presentation";
