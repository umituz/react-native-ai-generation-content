/**
export * from "./presentation/components";
 * AI Kiss Feature
 * Provider-agnostic AI kiss video generation feature
 */

// Domain Types
export type {
  AIKissOptions,
  AIKissRequest,
  AIKissResult,
  AIKissFeatureState,
  AIKissTranslations,
  AIKissFeatureConfig,
  AIKissResultExtractor,
} from "./domain";

// Presentation Hooks
export { useAIKissFeature } from "./presentation";
export type {
  UseAIKissFeatureProps,
  UseAIKissFeatureReturn,
} from "./presentation";

// Presentation Components
export { AIKissFeature } from "./presentation";
export type { AIKissFeatureProps } from "./presentation";
