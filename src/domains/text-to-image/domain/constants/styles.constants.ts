/**
 * Default Image Styles
 * Predefined style options for text-to-image generation
 */

import type { StyleOption } from "../types/form.types";

export const DEFAULT_IMAGE_STYLES: StyleOption[] = [
  {
    id: "realistic",
    name: "Realistic",
    description: "Photorealistic images",
  },
  {
    id: "artistic",
    name: "Artistic",
    description: "Creative and artistic style",
  },
  {
    id: "anime",
    name: "Anime",
    description: "Japanese animation style",
  },
  {
    id: "minimalist",
    name: "Minimalist",
    description: "Clean and simple design",
  },
  {
    id: "vintage",
    name: "Vintage",
    description: "Retro and classic look",
  },
];
