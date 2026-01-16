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

/**
 * Output type for AI generation
 */
export type ScenarioOutputType = 'image' | 'video' | 'both';

/**
 * Scenario media configuration
 */
export interface ScenarioMedia {
  readonly imageUrl?: string;          // Preview/thumbnail image
  readonly videoUrl?: string;          // Preview video URL
  readonly previewImageUrl?: string;   // Smaller thumbnail
}

export interface ScenarioData {
  readonly id: string;
  readonly category?: ScenarioCategory | string;

  // Content (app provides in target language)
  readonly title: string;
  readonly description: string;

  // AI Configuration
  readonly outputType: ScenarioOutputType;    // What this scenario generates
  readonly aiPrompt: string;                  // AI generation prompt
  readonly storyTemplate?: string;            // Story template with placeholders (optional)

  // Media
  readonly icon: string;
  readonly imageUrl?: string;                 // Preview image
  readonly videoUrl?: string;                 // Preview video
  readonly previewImageUrl?: string;          // Thumbnail

  // Requirements
  readonly requiresPhoto?: boolean;           // Requires user photo upload
  readonly requiresMultiplePhotos?: boolean;  // Requires multiple photos (e.g., couples)
  readonly minPhotos?: number;                // Minimum photos required
  readonly maxPhotos?: number;                // Maximum photos allowed

  // Display
  readonly hidden?: boolean;                  // Hide from UI
  readonly featured?: boolean;                // Featured/promoted scenario
  readonly order?: number;                    // Display order

  // Metadata
  readonly tags?: readonly string[];          // Search/filter tags
  readonly duration?: number;                 // Video duration (for video scenarios)
  readonly aspectRatio?: string;              // Output aspect ratio (e.g., "16:9", "9:16")
}

/**
 * Scenario Main Category (Top-level grouping for hierarchical system)
 */
export interface ScenarioMainCategory {
  readonly id: string;
  readonly title: string;
  readonly description?: string;
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
  readonly title: string;
  readonly description?: string;
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
