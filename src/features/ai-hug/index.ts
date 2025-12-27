/**
 * AI Hug Feature
 * Provider-agnostic AI hug generation feature
 */

// Domain Types
export type {
  AIHugOptions,
  AIHugRequest,
  AIHugResult,
  AIHugFeatureState,
  AIHugTranslations,
  AIHugFeatureConfig,
  AIHugInputBuilder,
  AIHugResultExtractor,
} from "./domain";

// Infrastructure Services
export { executeAIHug, hasAIHugSupport } from "./infrastructure";
export type { ExecuteAIHugOptions } from "./infrastructure";

// Presentation Hooks
export { useAIHugFeature } from "./presentation";
export type {
  UseAIHugFeatureProps,
  UseAIHugFeatureReturn,
} from "./presentation";
