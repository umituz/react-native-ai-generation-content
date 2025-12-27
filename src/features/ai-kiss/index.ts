/**
 * AI Kiss Feature
 * Provider-agnostic AI kiss generation feature
 */

// Domain Types
export type {
  AIKissOptions,
  AIKissRequest,
  AIKissResult,
  AIKissFeatureState,
  AIKissTranslations,
  AIKissFeatureConfig,
  AIKissInputBuilder,
  AIKissResultExtractor,
} from "./domain";

// Infrastructure Services
export { executeAIKiss, hasAIKissSupport } from "./infrastructure";
export type { ExecuteAIKissOptions } from "./infrastructure";

// Presentation Hooks
export { useAIKissFeature } from "./presentation";
export type {
  UseAIKissFeatureProps,
  UseAIKissFeatureReturn,
} from "./presentation";

// Presentation Components
export { AIKissFeature } from "./presentation";
export type { AIKissFeatureProps } from "./presentation";
