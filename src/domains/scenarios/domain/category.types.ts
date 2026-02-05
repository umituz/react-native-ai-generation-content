/**
 * Scenario Presentation Types
 * Types for scenario navigation and display
 */

export interface MainCategory {
  readonly id: string;
  readonly titleKey: string;
  readonly descriptionKey?: string;
  readonly icon?: string;
  readonly emoji?: string;
  readonly image?: string;
  readonly order: number;
  readonly subCategoryIds: readonly string[];
}

export interface SubCategory {
  readonly id: string;
  readonly titleKey: string;
  readonly descriptionKey?: string;
  readonly icon?: string;
  readonly emoji?: string;
  readonly image?: string;
  readonly mainCategoryId: string;
  readonly scenarioCategories: readonly string[];
  readonly order: number;
}

export interface CategoryInfo {
  readonly id: string;
  readonly name: string;
  readonly description?: string;
}

export interface ScenarioSelectorConfig {
  readonly titleKey: string;
  readonly subtitleKey: string;
  readonly showCategoryFilter: boolean;
  readonly enableSearch: boolean;
  readonly pageSize: number;
}

export interface ScenarioPreviewTranslations {
  readonly continueButton: string;
  readonly whatToExpect: string;
}

export interface ScenarioConfig {
  readonly id: string;
  readonly aiPrompt: string;
  readonly storyTemplate?: string;
  readonly title: string;
}

export interface VisualStyleOption {
  readonly id: string;
  readonly icon: string;
  readonly labelKey: string;
}

export interface InspirationChipData {
  readonly id: string;
  readonly labelKey: string;
  readonly promptKey: string;
}

export interface MagicPromptConfig {
  readonly headerKey: string;
  readonly headlinePart1Key: string;
  readonly headlinePart2Key: string;
  readonly subtitleKey: string;
  readonly inputLabelKey: string;
  readonly surpriseButtonKey: string;
  readonly placeholderKey: string;
  readonly styleTitleKey: string;
  readonly inspirationTitleKey: string;
  readonly continueKey: string;
  readonly maxLength: number;
  readonly minLength: number;
}
