/**
 * Scenario Domain Types
 * Generic types for scenario selection feature
 * Supports both flat and hierarchical category systems
 */

export enum ScenarioCategory {
  TIME_TRAVEL = "time_travel",
  FAMILY = "family",
  LIFESTYLE = "lifestyle",
  FANTASY = "fantasy",
  CAREER = "career",
  TRAVEL = "travel",
  CULTURAL = "cultural",
}

export interface ScenarioData {
  readonly id: string;
  readonly category?: ScenarioCategory | string;
  readonly title: string;
  readonly description: string;
  readonly icon: string;
  readonly imageUrl?: string;
  readonly previewImageUrl?: string;
  readonly aiPrompt: string;
  readonly storyTemplate: string;
  readonly requiresPhoto?: boolean;
  readonly hidden?: boolean;
}

/**
 * Scenario Main Category (Top-level grouping for hierarchical system)
 */
export interface ScenarioMainCategory {
  readonly id: string;
  readonly titleKey: string;
  readonly descriptionKey?: string;
  readonly icon?: string;
  readonly emoji?: string;
  readonly order: number;
  readonly subCategoryIds: readonly string[];
}

/**
 * Scenario Sub Category (Second-level grouping for hierarchical system)
 */
export interface ScenarioSubCategory {
  readonly id: string;
  readonly titleKey: string;
  readonly descriptionKey?: string;
  readonly icon?: string;
  readonly emoji?: string;
  readonly mainCategoryId: string;
  readonly scenarioCategories: readonly string[];
  readonly order: number;
}

/**
 * Hierarchical scenario category configuration
 */
export interface ScenarioHierarchyConfig {
  readonly mainCategories: readonly ScenarioMainCategory[];
  readonly subCategories: readonly ScenarioSubCategory[];
}

export interface ScenarioSelectorConfig {
  readonly titleKey: string;
  readonly subtitleKey: string;
  readonly showCategoryFilter?: boolean;
  readonly enableSearch?: boolean;
  readonly pageSize?: number;
}

export interface ScenarioPreviewConfig {
  readonly showTips?: boolean;
  readonly showDetails?: boolean;
  readonly enableCustomization?: boolean;
}

export interface MagicPromptConfig {
  readonly maxLength: number;
  readonly minLength: number;
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

export const SCENARIO_DEFAULTS = {
  pageSize: 10,
  maxPromptLength: 500,
  minPromptLength: 10,
} as const;
