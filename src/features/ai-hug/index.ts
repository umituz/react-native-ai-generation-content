/**
export * from "./presentation/components";
 * AI Hug Feature
 * Provider-agnostic AI hug video generation feature
 */

// Domain Types
export type {
  AIHugOptions,
  AIHugRequest,
  AIHugResult,
  AIHugFeatureState,
  AIHugTranslations,
  AIHugFeatureConfig,
  AIHugResultExtractor,
} from "./domain";

// Presentation Hooks
export { useAIHugFeature } from "./presentation";
export type {
  UseAIHugFeatureProps,
  UseAIHugFeatureReturn,
} from "./presentation";

// Presentation Components
export { AIHugFeature } from "./presentation";
export type { AIHugFeatureProps } from "./presentation";
