/**
 * Scenarios Domain
 * Generic AI generation scenario infrastructure
 * Note: ScenarioId and ScenarioCategory should be defined in each app
 */

// Types
export type {
  ScenarioOutputType,
  ScenarioInputType,
  ScenarioPromptType,
  GeneratingMessages,
  Scenario,
} from "./domain/Scenario";

// Enums
export { ScenarioCategory } from "./domain/ScenarioCategory";

// Scenario Helpers - For app-level configuration
export {
  createScenariosForApp,
  filterScenariosByOutputType,
  filterScenariosByCategory,
  getScenarioCategories,
  findScenarioById,
} from "./infrastructure/scenario-utils";
export type { AppScenarioConfig } from "./infrastructure/scenario-utils";

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
export {
  createStoryTemplate,
  createCreativePrompt,
  createPhotorealisticPrompt,
  PHOTOREALISTIC_BASE,
  PHOTOREALISTIC_RENDERING,
  CREATIVE_BASE,
} from "./infrastructure/utils/scenario-utils";

// Wizard Configurations - App-agnostic, classifies by INPUT REQUIREMENTS
export {
  WizardInputType,
  detectWizardInputType,
  SCENARIO_TO_WIZARD_INPUT_MAP,
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

// Category Types
export type {
  MainCategory,
  SubCategory,
  CategoryInfo,
  ScenarioSelectorConfig,
  ScenarioPreviewTranslations,
  ScenarioConfig,
  VisualStyleOption,
  InspirationChipData,
  MagicPromptConfig,
} from "./domain/category.types";

// Scenario Data Types
export type { ScenarioData } from "./domain/scenario.types";
