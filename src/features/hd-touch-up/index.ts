/**
 * HD Touch Up Feature
 * Provider-agnostic HD enhancement feature
 */

// Domain Types
export type {
  HDTouchUpOptions,
  HDTouchUpRequest,
  HDTouchUpResult,
  HDTouchUpFeatureState,
  HDTouchUpTranslations,
  HDTouchUpFeatureConfig,
  HDTouchUpInputBuilder,
  HDTouchUpResultExtractor,
} from "./domain";

// Infrastructure Services
export { executeHDTouchUp, hasHDTouchUpSupport } from "./infrastructure";
export type { ExecuteHDTouchUpOptions } from "./infrastructure";

// Presentation Hooks
export { useHDTouchUpFeature } from "./presentation";
export type {
  UseHDTouchUpFeatureProps,
  UseHDTouchUpFeatureReturn,
} from "./presentation";

// Presentation Components
export { HDTouchUpFeature } from "./presentation";
export type { HDTouchUpFeatureProps } from "./presentation";
