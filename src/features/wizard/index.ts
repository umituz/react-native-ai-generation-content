/**
 * AIGenerationWizard Feature
 * Generic wizard for all AI generation flows
 */

// Component
export { AIGenerationWizard, default as AIGenerationWizardDefault } from "./presentation/components/AIGenerationWizard";

// Hooks
export { useWizard, resetWizardStore } from "./presentation/hooks/useWizard";

// Store
export { createWizardStore, type WizardStoreType } from "./presentation/store/useWizardStore";

// Types (UploadedImage is already exported from partner-upload)
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
} from "./domain/types";
