/**
 * Creation Helpers
 * Utility functions for creation data manipulation
 */

import { generateUUID } from "@umituz/react-native-design-system";
import type { CreationTypeId } from "../types";

/**
 * Generate a unique creation ID using UUID v4
 */
export function generateCreationId(): string {
  return generateUUID();
}

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
    case "text-to-voice":
      return "mic";
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

/**
 * Filter creations by search query (client-side)
 */
export function filterBySearch<T extends { prompt?: string; type?: string; provider?: string }>(
  items: T[],
  searchQuery?: string,
): T[] {
  if (!searchQuery || searchQuery.trim().length === 0) {
    return items;
  }

  const query = searchQuery.toLowerCase().trim();

  return items.filter((item) =>
    item.prompt?.toLowerCase().includes(query) ||
    item.type?.toLowerCase().includes(query) ||
    item.provider?.toLowerCase().includes(query)
  );
}

/**
 * Sort creations by field
 */
export function sortCreations<T extends Record<string, unknown>>(
  items: T[],
  field: keyof T,
  order: "asc" | "desc" = "desc"
): T[] {
  return [...items].sort((a, b) => {
    const aVal = a[field] as unknown;
    const bVal = b[field] as unknown;

    if (aVal === undefined && bVal === undefined) return 0;
    if (aVal === undefined) return 1;
    if (bVal === undefined) return -1;

    if (typeof aVal === "string" && typeof bVal === "string") {
      return order === "desc"
        ? bVal.localeCompare(aVal)
        : aVal.localeCompare(bVal);
    }

    if (typeof aVal === "number" && typeof bVal === "number") {
      return order === "desc" ? bVal - aVal : aVal - bVal;
    }

    // Handle Date objects
    if (aVal instanceof Date && bVal instanceof Date) {
      return order === "desc"
        ? bVal.getTime() - aVal.getTime()
        : aVal.getTime() - bVal.getTime();
    }

    return 0;
  });
}

/**
 * Truncate text with ellipsis
 */
export function truncateText(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text;
  return text.substring(0, maxLength - 3) + "...";
}
