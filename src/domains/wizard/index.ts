/**
 * Wizard Domain - Public API
 * Generic, configuration-driven wizard system
 * Works for ALL features - NO feature-specific code!
 */

// Domain Entities - Configuration Types
export type {
  BaseStepConfig,
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

// Infrastructure - Renderers
export { renderStep } from "./infrastructure/renderers/step-renderer";
export type { StepRendererProps } from "./infrastructure/renderers/step-renderer";

// Presentation - Components
export { GenericWizardFlow } from "./presentation/components/GenericWizardFlow";
export type { GenericWizardFlowProps } from "./presentation/components/GenericWizardFlow";

// Presentation - Steps
export { PhotoUploadStep } from "./presentation/steps/PhotoUploadStep";
export type { PhotoUploadStepProps } from "./presentation/steps/PhotoUploadStep";

export { TextInputStep } from "./presentation/steps/TextInputStep";
export type { TextInputStepProps } from "./presentation/steps/TextInputStep";

export { SelectionStep } from "./presentation/steps/SelectionStep";
export type { SelectionStepProps } from "./presentation/steps/SelectionStep";

// Presentation - Screens
export { GenericPhotoUploadScreen } from "./presentation/screens/GenericPhotoUploadScreen";
export type {
  PhotoUploadScreenProps,
  PhotoUploadScreenConfig,
  PhotoUploadScreenTranslations,
} from "./presentation/screens/GenericPhotoUploadScreen";

export { GeneratingScreen } from "./presentation/screens/GeneratingScreen";
export type { GeneratingScreenProps } from "./presentation/screens/GeneratingScreen";

// Presentation - Hooks
export { usePhotoUploadState } from "./presentation/hooks/usePhotoUploadState";
export type {
  UsePhotoUploadStateProps,
  UsePhotoUploadStateReturn,
  PhotoUploadConfig,
  PhotoUploadTranslations,
} from "./presentation/hooks/usePhotoUploadState";
