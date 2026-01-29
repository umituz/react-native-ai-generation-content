/**
 * Wizard Configs Public API
 */

export { WizardInputType } from "./wizard-input.types";
export type { WizardConfigOptions, WizardConfigFactory } from "./wizard-input.types";

export { detectWizardInputType, SCENARIO_TO_WIZARD_INPUT_MAP } from "./wizard-input-detector";

export { CONFIG_FACTORIES, getConfigFactory } from "./wizard-step-factories";

export {
  getScenarioWizardConfig,
  registerWizardConfig,
  hasExplicitConfig,
  getScenarioWizardInputType,
} from "./wizard-config-resolver";

// Pre-built Wizard Configs
export { TEXT_TO_VIDEO_WIZARD_CONFIG } from "../../generation/wizard/configs/text-to-video.config";
export { TEXT_TO_IMAGE_WIZARD_CONFIG } from "../../generation/wizard/configs/text-to-image.config";
