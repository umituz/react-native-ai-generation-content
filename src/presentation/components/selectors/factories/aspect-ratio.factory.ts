/**
 * Aspect Ratio Factory
 * Creates i18n-ready aspect ratio options
 */

import type { AspectRatioOption } from "../types";

export interface AspectRatioTranslations {
  landscape: {
    name: string;
    description: string;
  };
  portrait: {
    name: string;
    description: string;
  };
  square: {
    name: string;
    description: string;
  };
}

/**
 * Creates aspect ratio options with translations
 * @param translations - Translated labels from app
 * @returns Array of aspect ratio options
 */
export const createAspectRatioOptions = (
  translations: AspectRatioTranslations
): AspectRatioOption[] => [
  {
    id: "16:9",
    name: translations.landscape.name,
    icon: "Monitor",
    description: translations.landscape.description,
  },
  {
    id: "9:16",
    name: translations.portrait.name,
    icon: "Smartphone",
    description: translations.portrait.description,
  },
  {
    id: "1:1",
    name: translations.square.name,
    icon: "Square",
    description: translations.square.description,
  },
];

/**
 * Default aspect ratio IDs (no translation needed)
 */
export const ASPECT_RATIO_IDS = ["16:9", "9:16", "1:1"] as const;
