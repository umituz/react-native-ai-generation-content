/**
 * AI Hug Feature
 * Provider-agnostic AI hug video generation feature
 */

// Domain Types
export type {
  AIHugResult,
  AIHugFeatureState,
  AIHugTranslations,
  AIHugFeatureConfig,
  AIHugResultExtractor,
} from "./domain";

// Presentation Hooks
export { useAIHugFeature, type UseAIHugFeatureProps } from "./presentation";

// Presentation Components
export { AIHugFeature, type AIHugFeatureProps } from "./presentation";
