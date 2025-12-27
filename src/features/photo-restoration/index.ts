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
  PhotoRestoreInputBuilder,
  PhotoRestoreResultExtractor,
} from "./domain";

// Infrastructure Services
export { executePhotoRestore, hasPhotoRestoreSupport } from "./infrastructure";
export type { ExecutePhotoRestoreOptions } from "./infrastructure";

// Presentation Hooks
export { usePhotoRestoreFeature } from "./presentation";
export type {
  UsePhotoRestoreFeatureProps,
  UsePhotoRestoreFeatureReturn,
} from "./presentation";

// Presentation Components
export { PhotoRestoreFeature, PhotoRestoreResultView } from "./presentation";
export type {
  PhotoRestoreFeatureProps,
  PhotoRestoreResultViewProps,
} from "./presentation";
