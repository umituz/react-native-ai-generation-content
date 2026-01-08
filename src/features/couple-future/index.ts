/**
 * Couple Future Feature
 * Identity-preserving image generation for couples using Nano Banana
 */

export { executeCoupleFuture } from "./infrastructure/executor";
export type {
  CoupleFutureInput,
  CoupleFutureConfig,
  CoupleFutureResult,
  NanoBananaAspectRatio,
  NanoBananaOutputFormat,
  CoupleFeatureId,
  CoupleFeatureSelection,
} from "./domain/types";
export { COUPLE_FUTURE_DEFAULTS } from "./domain/types";
export { useCoupleFutureGeneration } from "./presentation/hooks/useCoupleFutureGeneration";
export type { UseCoupleFutureGenerationConfig } from "./presentation/hooks/useCoupleFutureGeneration";
export {
  RomanticMoodSelector,
  ArtStyleSelector,
  ArtistStyleSelector,
  WardrobeSelector,
} from "./presentation/components";
export type {
  RomanticMoodSelectorProps,
  ArtStyleSelectorProps,
  ArtistStyleSelectorProps,
  WardrobeSelectorProps,
} from "./presentation/components";
export {
  COUPLE_FEATURE_CONFIGS,
  ROMANTIC_MOOD_OPTIONS,
  ART_STYLE_OPTIONS,
  ARTIST_STYLE_OPTIONS,
} from "./infrastructure/coupleFeatureRegistry";
export type {
  CoupleFeatureConfig,
  CoupleFeatureOption,
} from "./infrastructure/coupleFeatureRegistry";
export { enhanceCouplePrompt } from "./infrastructure/couplePromptEnhancer";
