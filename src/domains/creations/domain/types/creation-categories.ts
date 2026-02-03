/**
 * Creation Categories
 * Maps creation types to categories for filtering and organization
 */

import type { CreationTypeId, CreationCategory } from "./creation-types";

/**
 * Image-related creation types
 */
export const IMAGE_CREATION_TYPES: CreationTypeId[] = [
  "text-to-image",
  "upscale",
  "remove-background",
  "photo-restore",
  "inpainting",
  "style-transfer",
  "colorization",
  "face-swap",
  "object-removal",
  "background-replacement",
  "ai-brush",
  "hd-touch-up",
  "anime-selfie",
];

/**
 * Video-related creation types (core types only)
 * NOTE: All other video types (scenarios, etc.)
 * are dynamically determined by output content via isVideoUrl()
 */
export const VIDEO_CREATION_TYPES: CreationTypeId[] = [
  "text-to-video",
  "image-to-video",
];

/**
 * All creation types
 */
export const ALL_CREATION_TYPES: CreationTypeId[] = [
  ...IMAGE_CREATION_TYPES,
  ...VIDEO_CREATION_TYPES,
];

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
      return ALL_CREATION_TYPES;
    default:
      return ALL_CREATION_TYPES;
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
 * Get category for a creation based on its output content
 * This is the PRIMARY method for categorization - OUTPUT determines category, not type
 * Handles all scenarios (solo_martial_artist, ski_resort, etc.)
 *
 * Strategy: API response already tells us the type via field names:
 * - output.videoUrl exists → video
 * - output.imageUrl exists → image
 * No need to parse URLs or check extensions!
 */
export function getCategoryForCreation(creation: {
  type?: string;
  output?: {
    videoUrl?: string;
    imageUrl?: string;
    imageUrls?: string[];
  };
  uri?: string;
}): CreationCategory {
  // PRIORITY 1: Check output field names (most reliable)
  if (creation.output?.videoUrl) {
    return "video";
  }

  if (creation.output?.imageUrl || creation.output?.imageUrls?.length) {
    return "image";
  }

  // PRIORITY 2: Fallback to type-based (for known types)
  if (creation.type) {
    return getCategoryForType(creation.type as CreationTypeId);
  }

  // Final fallback
  return "image";
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
