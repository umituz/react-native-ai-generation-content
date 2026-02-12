/**
 * Creation Display Utilities
 * Single Responsibility: UI display helpers (icons, titles, text)
 */

import type { CreationTypeId } from "../types";

/**
 * Icon name type for design system
 */
export type IconName = "image" | "film" | "mic" | "sparkles" | "color-palette" | "brush";

/**
 * Get icon name for creation type
 */
export function getTypeIcon(type: CreationTypeId): IconName {
  switch (type) {
    case "text-to-video":
    case "image-to-video":
      return "film";
    case "style-transfer":
    case "colorization":
      return "color-palette";
    case "ai-brush":
    case "inpainting":
      return "brush";
    default:
      return "image";
  }
}

/**
 * Get i18n key for creation type
 */
export function getTypeTextKey(type: CreationTypeId): string {
  return `creations.types.${type}`;
}

/**
 * Get formatted type text (fallback)
 */
export function getTypeText(type: CreationTypeId): string {
  return type.split("-").map(word =>
    word.charAt(0).toUpperCase() + word.slice(1)
  ).join(" ");
}

/**
 * Get creation title from prompt or type
 */
export function getCreationTitle(
  prompt?: string,
  type?: CreationTypeId,
  maxLength: number = 50
): string {
  if (prompt && prompt.length > 0) {
    return prompt.length > maxLength
      ? prompt.substring(0, maxLength) + "..."
      : prompt;
  }

  if (type) {
    return getTypeText(type);
  }

  return "Untitled Creation";
}
