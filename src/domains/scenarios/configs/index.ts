/**
 * Wizard Configs Public API
 */

export { WizardInputType } from "./wizard-input.types";
export type { WizardConfigOptions } from "./wizard-input.types";

export { detectWizardInputType, SCENARIO_TO_WIZARD_INPUT_MAP } from "./wizard-input-detector";


export {
  getScenarioWizardConfig,
  registerWizardConfig,
  hasExplicitConfig,
  getScenarioWizardInputType,
} from "./wizard-config-resolver";
