/**
 * AI Model Constants
 * Single Source of Truth for all AI model IDs
 */

export const DEFAULT_MODELS = {
  TEXT_TO_IMAGE: "xai/grok-imagine-image",
  TEXT_TO_VIDEO: "xai/grok-imagine-video/text-to-video",
  IMAGE_TO_VIDEO: "xai/grok-imagine-video/image-to-video",
  SCENARIO_VIDEO: "fal-ai/ltx-video",
} as const;
