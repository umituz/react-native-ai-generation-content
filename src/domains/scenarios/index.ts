/**
 * Scenarios Domain
 * Pre-configured AI generation scenarios for all apps
 */

// Types
export type { ScenarioOutputType, ScenarioInputType, GeneratingMessages } from "./domain/Scenario";
export { ScenarioCategory, ScenarioId } from "./domain/Scenario";
export type { Scenario } from "./domain/Scenario";

// Category Groups - Pre-defined category groups for filtering
export {
  TRUE_SOLO_CATEGORIES,
  SINGLE_PERSON_CATEGORIES,
  COUPLE_CATEGORIES,
  ALL_CATEGORIES,
} from "./domain/category-groups";

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
export {
  createStoryTemplate,
  createPhotorealisticPrompt,
  createCreativePrompt,
} from "./infrastructure/utils/scenario-utils";

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
  CoupleFeatureId,
  CoupleFeatureSelection,
} from "./domain/category.types";

// Scenario Data Types
export type { ScenarioData } from "./domain/scenario.types";
