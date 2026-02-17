/**
 * @umituz/react-native-ai-generation-content
 * Provider-agnostic AI generation orchestration
 */

export * from "./exports/domain";
export * from "./exports/infrastructure";
export * from "./exports/presentation";
export * from "./exports/features";

// Shared Utilities and Components
export * from "./shared";

// Creations Domain
export * from "./domains/creations";

// Scenarios Domain
export * from "./domains/scenarios";

// Generation Domain (Feature Registry)
export { featureRegistry } from "./domains/generation";

// Generation Wizard
export { GenericWizardFlow } from "./domains/generation/wizard";
export type { GenericWizardFlowProps } from "./domains/generation/wizard";

// Wizard Configs and Types
export {
  TEXT_TO_IMAGE_WIZARD_CONFIG,
  TEXT_TO_VIDEO_WIZARD_CONFIG,
  IMAGE_TO_VIDEO_WIZARD_CONFIG,
} from "./domains/generation/wizard";
export type { WizardScenarioData } from "./domains/generation/wizard";

// Wizard Validators and Credit Utilities
export {
  validateDuration,
  validateResolution,
  convertCostToCredits,
  getCreditConfig,
} from "./domains/generation/wizard";
export type { ValidationResult, CreditCalculatorFn } from "./domains/generation/wizard";

// Video Model Config (for app-side model definitions)
export type { VideoModelConfig, ModelCapabilityOption } from "./domain/interfaces";

// Wizard Config Builder (generates wizard steps from VideoModelConfig)
export { buildWizardConfigFromModelConfig } from "./domains/generation/wizard/utilities/build-wizard-config";

// Generation Constants (VideoResolution, AspectRatio, StyleOptions, etc.)
export * from "./core/constants";
