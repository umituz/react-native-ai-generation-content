/**
 * Scenarios Domain
 * Pre-configured AI generation scenarios for all apps
 */

// Types
export type { ScenarioOutputType } from "./domain/Scenario";
export { ScenarioCategory, ScenarioId } from "./domain/Scenario";
export type { Scenario } from "./domain/Scenario";

// Scenario Data
export { SCENARIOS } from "./infrastructure/ScenariosData";

// Utils
export { createStoryTemplate } from "./infrastructure/utils/scenario-utils";

// Wizard Configurations - Auto-detects feature type and generates config
export {
  FeatureType,
  SCENARIO_WIZARD_CONFIGS,
  detectFeatureType,
  getScenarioWizardConfig,
  hasExplicitConfig,
  getScenarioFeatureType,
} from "./configs/wizard-configs";

export type { WizardConfigOptions } from "./configs/wizard-configs";

// Presentation - Containers
export { CategoryNavigationContainer } from "./presentation/containers";
export type { CategoryNavigationContainerProps } from "./presentation/containers";

// Presentation - Screens
export {
  ScenarioPreviewScreen,
  MainCategoryScreen,
  SubCategoryScreen,
  HierarchicalScenarioListScreen,
} from "./presentation/screens";
export type {
  MainCategoryScreenProps,
  SubCategoryScreenProps,
} from "./presentation/screens";

// Legacy types (backward compatibility)
export type {
  ScenarioMainCategory,
  ScenarioSubCategory,
  ScenarioData,
} from "./domain/scenario.types";
