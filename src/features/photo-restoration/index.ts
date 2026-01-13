/**
 * Photo Restoration Feature
 * Provider-agnostic photo restoration feature
 */

// Domain Types
export type {
  PhotoRestoreOptions,
  PhotoRestoreRequest,
  PhotoRestoreResult,
  PhotoRestoreFeatureState,
  PhotoRestoreTranslations,
  PhotoRestoreFeatureConfig,
  PhotoRestoreResultExtractor,
} from "./domain";

// Presentation Hooks
export { usePhotoRestoreFeature, type UsePhotoRestoreFeatureProps } from "./presentation";

// Presentation Components
export { PhotoRestoreFeature, PhotoRestoreResultView } from "./presentation";
export type { PhotoRestoreFeatureProps, PhotoRestoreResultViewProps } from "./presentation";
