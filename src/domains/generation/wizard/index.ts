/**
 * Wizard Domain - Public API
 * Generic, configuration-driven wizard system
 * Works for ALL features - NO feature-specific code!
 */

// Domain Entities - Step Types
export type {
  BaseStepConfig,
  AuthGateStepConfig,
  CreditGateStepConfig,
  PhotoUploadStepConfig,
  TextInputStepConfig,
  SelectionStepConfig,
  PreviewStepConfig,
  WizardStepConfig,
} from "./domain/entities/wizard-step.types";

// Domain Entities - Feature Types
export type {
  WizardFeatureConfig,
  ScenarioBasedConfig,
} from "./domain/entities/wizard-feature.types";

export { buildWizardConfigFromScenario, WIZARD_PRESETS } from "./domain/entities/wizard-feature.types";

// Infrastructure - Builders
export {
  buildFlowStepsFromWizard,
  getPhotoUploadCount,
  getStepConfig,
  quickBuildWizard,
} from "./infrastructure/builders/dynamic-step-builder";

// Infrastructure - Generic Credit Calculator (USD to Credits conversion ONLY)
export {
  convertCostToCredits,
  getCreditConfig,
} from "./infrastructure/utils/credit-calculator";

// Infrastructure - Data Validators
export {
  validateDuration,
  validateResolution,
} from "./infrastructure/utils/wizard-data-validators";
export type { ValidationResult } from "./infrastructure/utils/wizard-data-validators";

// Credit Calculator Function Type (for apps to implement)
export type { CreditCalculatorFn } from "./domain/types/credit-calculation.types";

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
export {
  TEXT_TO_IMAGE_WIZARD_CONFIG,
  TEXT_TO_VIDEO_WIZARD_CONFIG,
  IMAGE_TO_VIDEO_WIZARD_CONFIG,
} from "./configs";
