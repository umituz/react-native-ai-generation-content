/**
 * Remove Object Feature
 * Provider-agnostic object removal (inpainting) feature
 */

// Domain Types
export type {
  RemoveObjectResult,
  RemoveObjectFeatureState,
  RemoveObjectTranslations,
  RemoveObjectFeatureConfig,
  RemoveObjectResultExtractor,
} from "./domain";

// Presentation Hooks
export {
  useRemoveObjectFeature,
  type UseRemoveObjectFeatureProps,
  type UseRemoveObjectFeatureReturn,
} from "./presentation";

// Presentation Components
export { RemoveObjectFeature, type RemoveObjectFeatureProps } from "./presentation";
