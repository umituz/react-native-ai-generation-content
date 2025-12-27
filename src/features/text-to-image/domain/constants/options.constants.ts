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

export const DEFAULT_NUM_IMAGES_OPTIONS: NumImages[] = [1, 2, 3, 4];

export const DEFAULT_ASPECT_RATIO_OPTIONS: { value: AspectRatio; label: string }[] = [
  { value: "9:16", label: "Portrait (9:16)" },
  { value: "16:9", label: "Landscape (16:9)" },
  { value: "1:1", label: "Square (1:1)" },
];

export const DEFAULT_SIZE_OPTIONS: { value: ImageSize; label: string }[] = [
  { value: "512x512", label: "512×512" },
  { value: "768x768", label: "768×768" },
  { value: "1024x1024", label: "1024×1024" },
  { value: "1024x1792", label: "1024×1792" },
  { value: "1792x1024", label: "1792×1024" },
];

export const DEFAULT_OUTPUT_FORMAT_OPTIONS: { value: OutputFormat; label: string }[] = [
  { value: "png", label: "PNG" },
  { value: "jpeg", label: "JPEG" },
];

export const DEFAULT_FORM_VALUES: TextToImageFormDefaults = {
  aspectRatio: "9:16",
  size: "512x512",
  numImages: 1,
  guidanceScale: 7.5,
  outputFormat: "png",
  selectedStyle: "realistic",
};
