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
