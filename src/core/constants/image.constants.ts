/**
 * Image Generation Constants
 * Single Responsibility: Define image generation constants
 *
 * NOTE: For AI model names, use DEFAULT_MODELS from model.constants.ts
 */

export const IMAGE_SIZE = {
  SMALL: "512x512",
  MEDIUM: "768x768",
  LARGE: "1024x1024",
  PORTRAIT_LARGE: "1024x1792",
  LANDSCAPE_LARGE: "1792x1024",
} as const;

export type ImageSize =
  | typeof IMAGE_SIZE.SMALL
  | typeof IMAGE_SIZE.MEDIUM
  | typeof IMAGE_SIZE.LARGE
  | typeof IMAGE_SIZE.PORTRAIT_LARGE
  | typeof IMAGE_SIZE.LANDSCAPE_LARGE;

/**
 * Default number of images to generate
 */
export const DEFAULT_NUM_IMAGES = 1;

/**
 * Default guidance scale for image generation
 */
export const DEFAULT_IMAGE_GUIDANCE_SCALE = 7.5;
