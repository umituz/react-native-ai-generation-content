/**
 * Scenarios Feature
 * Config-driven scenario selection and preview screens
 */

// Domain types
export type {
  ScenarioData,
  ScenarioCategory,
  ScenarioSelectorConfig,
  ScenarioPreviewConfig,
  MagicPromptConfig,
  VisualStyleOption,
  InspirationChipData,
  ScenarioMainCategory,
  ScenarioSubCategory,
  ScenarioHierarchyConfig,
} from "./domain/types";
export { ScenarioCategory as ScenarioCategoryEnum, SCENARIO_DEFAULTS } from "./domain/types";

// Components
export {
  ScenarioHeader,
  ScenarioGrid,
  MagicPromptHeadline,
  InspirationChips,
  StyleSelector,
} from "./presentation/components";
export type {
  ScenarioHeaderProps,
  ScenarioGridProps,
  MagicPromptHeadlineProps,
  InspirationChipsProps,
  StyleSelectorProps,
} from "./presentation/components";

// Screens
export { ScenarioSelectorScreen } from "./presentation/screens/ScenarioSelectorScreen";
export type { ScenarioSelectorScreenProps } from "./presentation/screens/ScenarioSelectorScreen";

export { ScenarioPreviewScreen } from "./presentation/screens/ScenarioPreviewScreen";
export type {
  ScenarioPreviewScreenProps,
  ScenarioPreviewTranslations,
} from "./presentation/screens/ScenarioPreviewScreen";

export { MagicPromptScreen } from "./presentation/screens/MagicPromptScreen";
export type { MagicPromptScreenProps } from "./presentation/screens/MagicPromptScreen";

// Hierarchical Screens
export { MainCategoryScreen } from "./presentation/screens/MainCategoryScreen";
export type { MainCategoryScreenProps } from "./presentation/screens/MainCategoryScreen";

export { SubCategoryScreen } from "./presentation/screens/SubCategoryScreen";
export type { SubCategoryScreenProps } from "./presentation/screens/SubCategoryScreen";

export { HierarchicalScenarioListScreen } from "./presentation/screens/HierarchicalScenarioListScreen";
export type { HierarchicalScenarioListScreenProps } from "./presentation/screens/HierarchicalScenarioListScreen";

// Containers
export { CategoryNavigationContainer } from "./presentation/containers/CategoryNavigationContainer";
export type { CategoryNavigationContainerProps } from "./presentation/containers/CategoryNavigationContainer";
