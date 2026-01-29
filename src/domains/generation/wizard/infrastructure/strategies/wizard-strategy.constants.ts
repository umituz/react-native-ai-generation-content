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
  "text-to-video": "text-to-video",
  "image-to-video": "image-to-video",
};

/** Default prompts for image processing features (no user input needed) */
export const IMAGE_PROCESSING_PROMPTS: Record<string, string> = {
  upscale: "Enhance and upscale this image to higher resolution with improved details and clarity",
  "face-swap": "Swap the face from the source image onto the target image naturally",
  "anime-selfie": "Transform this photo into a high-quality anime-style portrait",
  "photo-restore": "Restore and enhance this photo, fix damage and improve quality",
  "remove-background": "Remove the background completely, keep only the main subject",
  "remove-object": "Remove unwanted objects from the image while preserving the scene",
  "replace-background": "Replace the background with a new seamless environment",
  "hd-touch-up": "Apply HD touch-up to enhance skin and facial features naturally",
};

/** Default prompts for video generation features (no user input needed) */
export const VIDEO_PROCESSING_PROMPTS: Record<string, string> = {
  "ai-kiss": "Create a romantic video where these two people share a gentle, loving kiss",
  "ai-hug": "Create a heartwarming video where these two people share a warm, affectionate hug",
  "image-to-video": "Animate this image with natural, smooth motion while preserving the original style",
  "solo_renaissance_portrait": "Transform this person into an elegant Renaissance-style animated portrait with classical artistic movements and period-appropriate lighting",
  "renaissance_portrait": "Transform this portrait into a majestic Renaissance-style animated painting with subtle classical movements",
  "historical_portrait": "Animate this portrait in a historical style with period-appropriate subtle movements",
};
