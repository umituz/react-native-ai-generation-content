/**
 * Replace Background Feature
 * AI-powered background replacement feature
 */

// Domain Types
export type {
  ReplaceBackgroundMode,
  ReplaceBackgroundResult,
  ReplaceBackgroundFeatureState,
  ReplaceBackgroundTranslations,
  ReplaceBackgroundFeatureConfig,
} from "./domain/types";

// Presentation Components
export { ReplaceBackgroundFeature, type ReplaceBackgroundFeatureProps } from "./presentation/components";

// Presentation Hooks
export {
  useReplaceBackgroundFeature,
  type UseReplaceBackgroundFeatureProps,
  type UseReplaceBackgroundFeatureReturn,
} from "./presentation/hooks";
