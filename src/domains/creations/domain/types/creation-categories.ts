/**
 * Creation Categories
 * Maps creation types to categories for filtering and organization
 */

import type { CreationCategory } from "./creation-types";
import { getCategoryForType } from "./creation-categories.helpers";

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
    return getCategoryForType(creation.type as import("./creation-types").CreationTypeId);
  }

  // Final fallback
  return "image";
}

export { IMAGE_CREATION_TYPES, VIDEO_CREATION_TYPES, ALL_CREATION_TYPES } from "./creation-categories.constants";
export { getTypesForCategory, getCategoryForType, isTypeInCategory, isVideoCreationType, isImageCreationType } from "./creation-categories.helpers";

