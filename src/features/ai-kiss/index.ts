/**
 * AI Kiss Feature
 * Provider-agnostic AI kiss video generation feature
 */

// Domain Types
export type {
  AIKissResult,
  AIKissFeatureState,
  AIKissTranslations,
  AIKissFeatureConfig,
  AIKissResultExtractor,
} from "./domain";

// Presentation Hooks
export { useAIKissFeature, type UseAIKissFeatureProps } from "./presentation";

// Presentation Components
export { AIKissFeature, type AIKissFeatureProps } from "./presentation";
