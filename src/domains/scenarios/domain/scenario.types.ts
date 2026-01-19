/**
 * Scenario Domain Types
 * Generic scenario system for AI generation apps
 */

/**
 * Output type for AI generation
 */
export type ScenarioOutputType = "image" | "video";

/**
 * Scenario represents a pre-configured AI generation template
 * Used across all AI generation apps (image or video output)
 */
export interface Scenario {
  readonly id: string;
  readonly title: string;
  readonly description: string;
  readonly icon?: string;
  readonly emoji?: string;
  readonly imageUrl?: string;
  readonly previewImageUrl?: string;
  readonly category: string;
  readonly tags?: readonly string[];
  readonly aiPrompt: string;
  readonly storyTemplate?: string;
  readonly requiresPhoto?: boolean;
  readonly outputType: ScenarioOutputType;
  readonly enabled?: boolean;
  readonly metadata?: Record<string, unknown>;
}

/**
 * Main Category (Top-level grouping)
 */
export interface MainCategory {
  readonly id: string;
  readonly title: string;
  readonly description?: string;
  readonly icon?: string;
  readonly emoji?: string;
  readonly order: number;
  readonly subCategories: readonly string[];
}

/**
 * Sub Category (Second-level grouping)
 */
export interface SubCategory {
  readonly id: string;
  readonly title: string;
  readonly description?: string;
  readonly icon?: string;
  readonly emoji?: string;
  readonly mainCategoryId: string;
  readonly scenarioCategories: readonly string[];
  readonly order: number;
}

/**
 * Scenario Category (Third-level - actual scenario grouping)
 */
export interface ScenarioCategory {
  readonly id: string;
  readonly name: string;
  readonly description?: string;
}

/**
 * Complete scenario system configuration
 */
export interface ScenarioSystemConfig {
  readonly mainCategories: readonly MainCategory[];
  readonly subCategories: readonly SubCategory[];
  readonly scenarioCategories: readonly ScenarioCategory[];
  readonly scenarios: readonly Scenario[];
}

/**
 * Scenario selection result
 */
export interface ScenarioSelection {
  readonly scenario: Scenario;
  readonly mainCategory: MainCategory;
  readonly subCategory: SubCategory;
}

/**
 * Legacy types for presentation components (backward compatibility)
 * Used by CategoryNavigationContainer and related screens
 */
export interface ScenarioMainCategory {
  readonly id: string;
  readonly titleKey: string;
  readonly descriptionKey?: string;
  readonly icon?: string;
  readonly emoji?: string;
  readonly image?: string;
  readonly order: number;
  readonly subCategoryIds: readonly string[];
}

export interface ScenarioSubCategory {
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

/**
 * Scenario selector configuration
 */
export interface ScenarioSelectorConfig {
  readonly titleKey: string;
  readonly subtitleKey: string;
  readonly showCategoryFilter: boolean;
  readonly enableSearch: boolean;
  readonly pageSize: number;
}

/**
 * Scenario preview translations
 */
export interface ScenarioPreviewTranslations {
  readonly continueButton: string;
  readonly whatToExpect: string;
}

/**
 * Scenario application configuration
 */
export interface ScenarioConfig {
  readonly id: string;
  readonly aiPrompt: string;
  readonly storyTemplate?: string;
  readonly title: string;
}

/**
 * Visual style option for prompt customization
 */
export interface VisualStyleOption {
  readonly id: string;
  readonly icon: string;
  readonly labelKey: string;
}

/**
 * Inspiration chip data for prompt customization
 */
export interface InspirationChipData {
  readonly id: string;
  readonly labelKey: string;
  readonly promptKey: string;
}

/**
 * Magic prompt configuration
 */
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

/**
 * Couple feature identifier
 */
export type CoupleFeatureId = string;

/**
 * Couple feature selection state
 */
export interface CoupleFeatureSelection {
  readonly featureId: CoupleFeatureId | null;
  readonly [key: string]: CoupleFeatureId | string | boolean | number | null | undefined;
}

export interface ScenarioData {
  readonly id: string;
  readonly category?: string;
  readonly title?: string;
  readonly description?: string;
  readonly icon?: string;
  readonly imageUrl?: string;
  readonly previewImageUrl?: string;
  /** AI prompt - optional if prompt comes from wizard data */
  readonly aiPrompt?: string;
  readonly storyTemplate?: string;
  readonly requiresPhoto?: boolean;
  readonly hidden?: boolean;
  readonly [key: string]: unknown;
}
