/**
 * Wizard Domain - Public API
 * Generic, configuration-driven wizard system
 * Works for ALL features - NO feature-specific code!
 */

// Domain Entities - Configuration Types
export type {
  BaseStepConfig,
  AuthGateStepConfig,
  CreditGateStepConfig,
  PhotoUploadStepConfig,
  TextInputStepConfig,
  SelectionStepConfig,
  PreviewStepConfig,
  WizardStepConfig,
  WizardFeatureConfig,
  ScenarioBasedConfig,
} from "./domain/entities/wizard-config.types";

export { buildWizardConfigFromScenario, WIZARD_PRESETS } from "./domain/entities/wizard-config.types";

// Infrastructure - Builders
export {
  buildFlowStepsFromWizard,
  getPhotoUploadCount,
  getStepConfig,
  quickBuildWizard,
} from "./infrastructure/builders/dynamic-step-builder";

// Presentation - Hooks
export { usePhotoUploadState } from "./presentation/hooks/usePhotoUploadState";
export type {
  UsePhotoUploadStateProps,
  UsePhotoUploadStateReturn,
  PhotoUploadConfig,
  PhotoUploadTranslations,
} from "./presentation/hooks/usePhotoUploadState";

export { useWizardGeneration } from "./presentation/hooks/useWizardGeneration";
export type {
  UseWizardGenerationProps,
  UseWizardGenerationReturn,
  WizardScenarioData,
  WizardOutputType,
} from "./presentation/hooks/useWizardGeneration";

// Presentation - Components
export { GenericWizardFlow } from "./presentation/components";
export type { GenericWizardFlowProps } from "./presentation/components";

// Presentation - Screens
export { GeneratingScreen, TextInputScreen } from "./presentation/screens";
export type {
  TextInputScreenTranslations,
  TextInputScreenConfig,
  TextInputScreenProps,
} from "./presentation/screens";

// Feature Configs
export * from "./configs";
