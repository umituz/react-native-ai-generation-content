/**
 * Scenario Domain Types
 * Generic scenario system for AI generation apps
 */

/**
 * Scenario represents a pre-configured AI generation template
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
