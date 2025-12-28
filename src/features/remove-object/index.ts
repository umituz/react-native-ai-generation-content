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
  RemoveObjectResultExtractor,
} from "./domain";

// Presentation Hooks
export { useRemoveObjectFeature } from "./presentation";
export type {
  UseRemoveObjectFeatureProps,
  UseRemoveObjectFeatureReturn,
} from "./presentation";

// Presentation Components
export { RemoveObjectFeature } from "./presentation";
export type { RemoveObjectFeatureProps } from "./presentation";
