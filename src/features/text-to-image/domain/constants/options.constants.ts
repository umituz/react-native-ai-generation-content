/**
 * Text-to-Image Options Constants
 * Default option values for text-to-image generation
 */

import type {
  AspectRatio,
  ImageSize,
  NumImages,
  OutputFormat,
  TextToImageFormDefaults,
} from "../types/form.types";

/** Available number of images options */
export const DEFAULT_NUM_IMAGES_OPTIONS: NumImages[] = [1, 2, 3, 4];

/** Available aspect ratio values */
export const ASPECT_RATIO_VALUES: AspectRatio[] = ["9:16", "16:9", "1:1"];

/** Available image size values */
export const IMAGE_SIZE_VALUES: ImageSize[] = [
  "512x512",
  "768x768",
  "1024x1024",
  "1024x1792",
  "1792x1024",
];

/** Available output format values */
export const OUTPUT_FORMAT_VALUES: OutputFormat[] = ["png", "jpeg"];

export const DEFAULT_FORM_VALUES: TextToImageFormDefaults = {
  aspectRatio: "9:16",
  size: "512x512",
  numImages: 1,
  guidanceScale: 7.5,
  outputFormat: "png",
  selectedStyle: "realistic",
};
