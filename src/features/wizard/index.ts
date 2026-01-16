/**
 * AIGenerationWizard Feature
 * Generic wizard for all AI generation flows
 */

// Components
export { AIGenerationWizard, default as AIGenerationWizardDefault } from "./presentation/components/AIGenerationWizard";
export { AIFeatureWizard, resetAIFeatureWizard } from "./presentation/components/AIFeatureWizard";
export type {
  AIFeatureWizardProps,
  AIFeatureWizardTranslations,
  AIFeatureWizardCallbacks,
} from "./presentation/components/AIFeatureWizard";

// Hooks
export { useWizard, resetWizardStore } from "./presentation/hooks/useWizard";

// Store
export { createWizardStore, type WizardStoreType } from "./presentation/store/useWizardStore";

// Types
export type {
  WizardStepId,
  WizardStep,
  WizardStepProps,
  WizardState,
  WizardActions,
  WizardStore,
  AIGenerationWizardConfig,
  AIGenerationWizardCallbacks,
  AIGenerationWizardProps,
  FeatureMode,
  PrebuiltStepType,
  FeatureWizardConfig,
} from "./domain/types";

// Feature mode utilities
export {
  FEATURE_MODES,
  FEATURE_FLOWS,
  getFeatureMode,
  getFeatureFlow,
} from "./domain/types";
