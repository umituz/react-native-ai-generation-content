/**
 * Style Factory
 * Creates i18n-ready style options
 */

import type { StyleOption } from "../types";

interface StyleTranslation {
  name: string;
  description?: string;
}

export type StyleTranslations = Record<string, StyleTranslation>;

/**
 * Creates style options with translations
 * @param styleIds - Array of style IDs
 * @param translations - Map of style ID to translations
 * @param getThumbnail - Optional function to get thumbnail URL for style
 * @returns Array of style options
 */
export const createStyleOptions = (
  styleIds: readonly string[],
  translations: StyleTranslations,
  getThumbnail?: (styleId: string) => string | undefined
): StyleOption[] =>
  styleIds.map((id) => ({
    id,
    name: translations[id]?.name || id,
    description: translations[id]?.description,
    thumbnail: getThumbnail?.(id),
  }));

/**
 * Helper to create style options from array of style configs
 */
export const createStyleOptionsFromConfig = <T extends { id: string }>(
  styles: readonly T[],
  translations: StyleTranslations,
  getThumbnail?: (style: T) => string | undefined
): StyleOption[] =>
  styles.map((style) => ({
    id: style.id,
    name: translations[style.id]?.name || style.id,
    description: translations[style.id]?.description,
    thumbnail: getThumbnail?.(style),
  }));
