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
export { useCoupleFutureFlow } from "./presentation/hooks/useCoupleFutureFlow";
export type {
  CoupleFutureFlowConfig,
  CoupleFutureFlowState,
  CoupleFutureFlowActions,
  CoupleFutureFlowProps,
} from "./presentation/hooks/useCoupleFutureFlow";
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
export { CoupleFeatureScreen } from "./presentation/screens/CoupleFeatureScreen";
export type { CoupleFeatureScreenProps } from "./presentation/screens/CoupleFeatureScreen";
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

// Wizard Component
export { CoupleFutureWizard, resetCoupleFutureWizard } from "./presentation/components/CoupleFutureWizard";
export { GeneratingStepContent } from "./presentation/components/GeneratingStepContent";
export type {
  CoupleFutureWizardProps,
  CoupleFutureWizardConfig,
  CoupleFutureWizardTranslations,
  CoupleFutureWizardData,
  CoupleFutureWizardCallbacks,
  CoupleFutureWizardState,
  WizardScenarioData,
  WizardVisualStyleOption,
  WizardPartnerConfig,
  WizardStepConfig,
} from "./domain/wizard.types";

// Generation utilities
export {
  buildGenerationInputFromConfig,
  processGenerationResultFromConfig,
  buildCreationFromConfig,
  DEFAULT_VISUAL_STYLES,
} from "./infrastructure/generationUtils";
export type {
  ScenarioConfig,
  VisualStyleConfig,
  GenerationImage,
  BuildGenerationInputConfig,
  GenerationInputResult,
  ProcessResultConfig,
  GenerationResultData,
  BuildCreationConfig,
  CoupleFutureCreationData,
} from "./infrastructure/generationUtils";
