/**
 * Wizard Strategy Constants
 * Centralized configuration values for wizard-based generation
 */

import type { VideoFeatureType } from "../../../../../domain/interfaces";

/** Generation timeout in milliseconds (2 minutes) */
export const GENERATION_TIMEOUT_MS = 120000;

/** Base64 image format prefix */
export const BASE64_IMAGE_PREFIX = "data:image/jpeg;base64,";

/** Photo key prefix in wizard data */
export const PHOTO_KEY_PREFIX = "photo_";

/** Default style value (no custom style applied) */
export const DEFAULT_STYLE_VALUE = "original";

/** Model input defaults */
export const MODEL_INPUT_DEFAULTS = {
  aspectRatio: "1:1",
  outputFormat: "jpeg",
  numImages: 1,
  enableSafetyChecker: false,
} as const;

/** Video feature type patterns for scenario detection */
export const VIDEO_FEATURE_PATTERNS: Record<string, VideoFeatureType> = {
  kiss: "ai-kiss",
  hug: "ai-hug",
};
