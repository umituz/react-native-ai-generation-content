/**
 * Result Preview Configuration Types - Barrel Export
 * Allows main apps to customize result preview appearance and behavior
 */

export type { ResultHeaderConfig } from "./result-header.types";
export type { ResultImageConfig } from "./result-image.types";
export type { ResultStoryConfig } from "./result-story.types";
export type { ResultActionButton, ResultActionsConfig } from "./result-actions.types";
export type { ResultLayoutConfig } from "./result-layout.types";

import type { ResultHeaderConfig } from "./result-header.types";
import type { ResultImageConfig } from "./result-image.types";
import type { ResultStoryConfig } from "./result-story.types";
import type { ResultActionsConfig } from "./result-actions.types";
import type { ResultLayoutConfig } from "./result-layout.types";
import { DEFAULT_HEADER_CONFIG } from "./result-header.types";
import { DEFAULT_IMAGE_CONFIG } from "./result-image.types";
import { DEFAULT_STORY_CONFIG } from "./result-story.types";
import { DEFAULT_ACTIONS_CONFIG } from "./result-actions.types";
import { DEFAULT_LAYOUT_CONFIG } from "./result-layout.types";

/**
 * Complete Result Preview Configuration
 * Pass this from main app to customize all aspects of result preview
 */
export interface ResultConfig {
  header?: ResultHeaderConfig;
  image?: ResultImageConfig;
  story?: ResultStoryConfig;
  actions?: ResultActionsConfig;
  layout?: ResultLayoutConfig;
}

/**
 * Default configuration for result preview
 * Used when no config is provided by main app
 */
export const DEFAULT_RESULT_CONFIG: ResultConfig = {
  header: DEFAULT_HEADER_CONFIG,
  image: DEFAULT_IMAGE_CONFIG,
  story: DEFAULT_STORY_CONFIG,
  actions: DEFAULT_ACTIONS_CONFIG,
  layout: DEFAULT_LAYOUT_CONFIG,
};
