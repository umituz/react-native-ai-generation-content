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

export {
  VIDEO_DURATION, VIDEO_DURATION_OPTIONS, VIDEO_DURATION_OPTIONS_WITH_LABELS,
  VIDEO_ASPECT_RATIO, VIDEO_ASPECT_RATIO_OPTIONS,
  VIDEO_RESOLUTION, VIDEO_RESOLUTION_OPTIONS,
  DEFAULT_MOTION_STRENGTH, DEFAULT_GUIDANCE_SCALE,
  type VideoAspectRatio, type VideoResolution,
} from "./core/constants/video.constants";
export {
  ASPECT_RATIO, DEFAULT_IMAGE_SIZES,
} from "./core/constants/aspect-ratio.constants";
export {
  IMAGE_SIZE, DEFAULT_NUM_IMAGES, DEFAULT_IMAGE_GUIDANCE_SCALE,
} from "./core/constants/image.constants";
export {
  ANIMATION_STYLE,
} from "./core/constants/animation.constants";
export * from "./core/constants/validation.constants";
export * from "./core/constants/preset-styles.constants";
export {
  STYLE_OPTIONS,
} from "./core/constants/style-options.constants";
export {
  DURATION_OPTIONS,
} from "./core/constants/duration-options.constants";
export * from "./core/constants/script-durations.constants";


// Result Preview Domain
export { useResultActions } from "./domains/result-preview/presentation/hooks/useResultActions";
export type {
  UseResultActionsOptions,
  UseResultActionsReturn,
} from "./domains/result-preview/presentation/types/result-hooks.types";
