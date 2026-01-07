/**
 * Image Feature Metadata Types
 * Metadata and categorization types
 */

import type { ImageFeatureType } from "../../../../../domain/interfaces";

/**
 * Image processing categories
 */
export type ImageProcessingCategory =
  | "enhancement"
  | "editing"
  | "transformation"
  | "composition";

/**
 * Input mode for image processing
 */
export type ImageInputMode = "single" | "single-with-prompt" | "dual";

/**
 * Feature metadata for categorization
 */
export interface ImageFeatureMetadata {
  name: string;
  category: ImageProcessingCategory;
  inputMode: ImageInputMode;
  featureType: ImageFeatureType;
  requiresPrompt?: boolean;
  requiresMask?: boolean;
}
