/**
 * Remove Object Feature
 * Provider-agnostic object removal (inpainting) feature
 */

// Domain Types
export type {
  RemoveObjectOptions,
  RemoveObjectRequest,
  RemoveObjectResult,
  RemoveObjectFeatureState,
  RemoveObjectTranslations,
  RemoveObjectFeatureConfig,
  RemoveObjectInputBuilder,
  RemoveObjectResultExtractor,
} from "./domain";

// Infrastructure Services
export { executeRemoveObject, hasRemoveObjectSupport } from "./infrastructure";
export type { ExecuteRemoveObjectOptions } from "./infrastructure";

// Presentation Hooks
export { useRemoveObjectFeature } from "./presentation";
export type {
  UseRemoveObjectFeatureProps,
  UseRemoveObjectFeatureReturn,
} from "./presentation";

// Presentation Components
export { RemoveObjectFeature } from "./presentation";
export type { RemoveObjectFeatureProps } from "./presentation";
