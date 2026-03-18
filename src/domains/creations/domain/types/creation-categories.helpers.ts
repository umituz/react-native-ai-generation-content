/**
 * Creation Categories - Helpers
 * Helper functions for creation type categorization
 */

import type { CreationTypeId, CreationCategory } from "./creation-types";
import { IMAGE_CREATION_TYPES, VIDEO_CREATION_TYPES } from "./creation-categories.constants";

/**
 * Get creation types for a category
 */
export function getTypesForCategory(
  category: CreationCategory
): CreationTypeId[] {
  switch (category) {
    case "image":
      return IMAGE_CREATION_TYPES;
    case "video":
      return VIDEO_CREATION_TYPES;
    case "all":
      return [...IMAGE_CREATION_TYPES, ...VIDEO_CREATION_TYPES];
    default:
      return [...IMAGE_CREATION_TYPES, ...VIDEO_CREATION_TYPES];
  }
}

/**
 * Get category for a creation type (type-based fallback only)
 */
export function getCategoryForType(type: CreationTypeId): CreationCategory {
  if (IMAGE_CREATION_TYPES.includes(type)) {
    return "image";
  }
  if (VIDEO_CREATION_TYPES.includes(type)) {
    return "video";
  }
  return "image"; // Default fallback
}

/**
 * Check if a type belongs to a category
 */
export function isTypeInCategory(
  type: CreationTypeId,
  category: CreationCategory
): boolean {
  if (category === "all") {
    return true;
  }
  return getTypesForCategory(category).includes(type);
}

/**
 * Check if creation type is video
 */
export function isVideoCreationType(type?: string): boolean {
  if (!type) return false;
  return VIDEO_CREATION_TYPES.includes(type as CreationTypeId);
}

/**
 * Check if creation type is image
 */
export function isImageCreationType(type?: string): boolean {
  if (!type) return false;
  return IMAGE_CREATION_TYPES.includes(type as CreationTypeId);
}
