/**
 * AI Feature Screen
 * Unified screen component for all AI features
 */

export { AIFeatureScreen } from "./AIFeatureScreen";
export { AI_FEATURE_CONFIGS, getAIFeatureConfig, hasAIFeature, getAllAIFeatureIds, getAIFeaturesByMode } from "./registry";
export { createFeatureTranslations, createSingleImageTranslations, createDualImageTranslations, createComparisonTranslations, createPromptTranslations } from "./translations";
export type {
  AIFeatureId,
  AIFeatureMode,
  AIFeatureOutputType,
  AIFeatureCreditType,
  AIFeatureConfig,
  AIFeatureScreenProps,
  SingleImageTranslationKeys,
  DualImageTranslationKeys,
  ComparisonTranslationKeys,
  PromptTranslationKeys,
} from "./types";
