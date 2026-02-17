/**
 * Aspect Ratio Constants
 * Single Responsibility: Define aspect ratio constants for AI generation
 */

export const ASPECT_RATIO = {
  LANDSCAPE: "16:9",
  PORTRAIT: "9:16",
  SQUARE: "1:1",
} as const;

export type AspectRatio =
  | typeof ASPECT_RATIO.LANDSCAPE
  | typeof ASPECT_RATIO.PORTRAIT
  | typeof ASPECT_RATIO.SQUARE;

/**
 * Default image sizes based on aspect ratio
 */
export const DEFAULT_IMAGE_SIZES: Record<AspectRatio, string> = {
  [ASPECT_RATIO.LANDSCAPE]: "1024x576",
  [ASPECT_RATIO.PORTRAIT]: "576x1024",
  [ASPECT_RATIO.SQUARE]: "1024x1024",
} as const;
