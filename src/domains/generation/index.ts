export {
  useAIGeneration,
  type UseAIGenerationProps,
  type UseAIGenerationReturn,
} from "./presentation/useAIGeneration.hook";
export type { AlertMessages } from "../../presentation/hooks/generation/types";

export { featureRegistry } from "./application/feature-registry";
export { createGenerationStrategy } from "./application/generation-strategy.factory";

export type {
  FeatureConfig,
  FeatureRegistration,
  GenerationType,
  InputType,
  OutputType,
  VisualStyleConfig,
} from "./domain/feature-config.types";

export type {
  GenerationExecutor,
  GenerationOptions,
  GenerationResult,
  ImageGenerationInput,
  ImageGenerationOutput,
  VideoGenerationInput,
  VideoGenerationOutput,
  MemeGenerationInput,
  MemeGenerationOutput,
  TextToImageInput,
  TextToImageOutput,
} from "./domain/generation.types";

export { ExecutorFactory, type GenerationType as ExecutorGenerationType } from "./infrastructure/executors/executor-factory";

// Wizard Domain
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
  UsePhotoUploadStateProps,
  UsePhotoUploadStateReturn,
  PhotoUploadConfig,
  PhotoUploadTranslations,
  UseWizardGenerationProps,
  UseWizardGenerationReturn,
  WizardScenarioData,
  WizardOutputType,
  GenericWizardFlowProps,
  TextInputScreenTranslations,
  TextInputScreenConfig,
  TextInputScreenProps,
} from "./wizard";

export {
  buildWizardConfigFromScenario,
  WIZARD_PRESETS,
  buildFlowStepsFromWizard,
  getPhotoUploadCount,
  getStepConfig,
  quickBuildWizard,
  usePhotoUploadState,
  useWizardGeneration,
  GenericWizardFlow,
  GeneratingScreen,
  TextInputScreen,
  TEXT_TO_IMAGE_WIZARD_CONFIG,
  TEXT_TO_VIDEO_WIZARD_CONFIG,
  IMAGE_TO_VIDEO_WIZARD_CONFIG,
} from "./wizard";

// Flow Infrastructure
export { createFlowStore, useFlow, resetFlowStore } from "./infrastructure/flow";
export type { FlowStoreType } from "./infrastructure/flow";

// Flow config types from domain
export {
  StepType,
  type GateResult,
  type AuthGateConfig,
  type CreditGateConfig,
  type FlowState,
  type FlowActions,
  type FlowCallbacks,
  type FlowConfiguration,
  type StepDefinition,
} from "../../domain/entities/flow-config.types";
