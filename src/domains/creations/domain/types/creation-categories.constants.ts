/**
 * Creation Categories - Constants
 * Constants for creation type categories
 */

import type { CreationTypeId } from "./creation-types";

/**
 * Image-related creation types
 */
export const IMAGE_CREATION_TYPES: CreationTypeId[] = [
  "text-to-image",
  "imagine",
  "wardrobe",
  "historical-wardrobe",
  "upscale",
  "remove-background",
  "photo-restore",
  "inpainting",
  "style-transfer",
  "colorization",
  "face-swap",
  "object-removal",
  "background-replacement",
  "ai-brush",
  "hd-touch-up",
  "anime-selfie",
  "aging",
  "headshot",
  "retouch",
  "magic-edit",
  "color-grading",
  "art-style",
  "mood-filter",
  "face-expression",
  "scene-composer",
  "ai-background",
  "effects",
];

/**
 * Video-related creation types (core types only)
 * NOTE: All other video types (scenarios, etc.)
 * are dynamically determined by output content via isVideoUrl()
 */
export const VIDEO_CREATION_TYPES: CreationTypeId[] = [
  "text-to-video",
  "image-to-video",
];

/**
 * All creation types
 */
export const ALL_CREATION_TYPES: CreationTypeId[] = [
  ...IMAGE_CREATION_TYPES,
  ...VIDEO_CREATION_TYPES,
];
