/**
 * Scenarios Domain
 * Pre-configured AI generation scenarios for all apps
 */

// Types
export type { ScenarioOutputType, ScenarioInputType, GeneratingMessages } from "./domain/Scenario";
export { ScenarioCategory, ScenarioId } from "./domain/Scenario";
export type { Scenario } from "./domain/Scenario";

// Scenario Data
export { SCENARIOS } from "./infrastructure/ScenariosData";

// Scenario Helpers - For app-level configuration
export {
  createScenariosForApp,
  filterScenariosByOutputType,
  filterScenariosByCategory,
  getScenarioCategories,
  findScenarioById,
} from "./infrastructure/scenario-helpers";
export type { AppScenarioConfig } from "./infrastructure/scenario-helpers";

// Scenario Registry - Singleton for app configuration
export {
  configureScenarios,
  getConfiguredScenario,
  getDefaultOutputType,
  isScenariosConfigured,
  getAllConfiguredScenarios,
} from "./infrastructure/scenario-registry";
export type { ConfiguredScenario } from "./infrastructure/scenario-registry";

// Utils
export { createStoryTemplate } from "./infrastructure/utils/scenario-utils";

// Wizard Configurations - App-agnostic, classifies by INPUT REQUIREMENTS
export {
  WizardInputType,
  detectWizardInputType,
  getScenarioWizardConfig,
  hasExplicitConfig,
  getScenarioWizardInputType,
  registerWizardConfig,
} from "./configs";

export type { WizardConfigOptions } from "./configs";

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
  ScenarioSelectorConfig,
  ScenarioPreviewTranslations,
  ScenarioConfig,
  VisualStyleOption,
  InspirationChipData,
  MagicPromptConfig,
  CoupleFeatureId,
  CoupleFeatureSelection,
} from "./domain/scenario.types";
