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
  "ai-hug",
  "ai-kiss",
  "anime-selfie",
];

/**
 * Video-related creation types
 */
export const VIDEO_CREATION_TYPES: CreationTypeId[] = [
  "text-to-video",
  "image-to-video",
];

/**
 * Voice-related creation types
 */
export const VOICE_CREATION_TYPES: CreationTypeId[] = ["text-to-voice"];

/**
 * All creation types
 */
export const ALL_CREATION_TYPES: CreationTypeId[] = [
  ...IMAGE_CREATION_TYPES,
  ...VIDEO_CREATION_TYPES,
  ...VOICE_CREATION_TYPES,
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
    case "voice":
      return VOICE_CREATION_TYPES;
    case "all":
      return ALL_CREATION_TYPES;
  }
}

/**
 * Get category for a creation type
 */
export function getCategoryForType(type: CreationTypeId): CreationCategory {
  if (IMAGE_CREATION_TYPES.includes(type)) {
    return "image";
  }
  if (VIDEO_CREATION_TYPES.includes(type)) {
    return "video";
  }
  if (VOICE_CREATION_TYPES.includes(type)) {
    return "voice";
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

/**
 * Check if creation type is voice
 */
export function isVoiceCreationType(type?: string): boolean {
  if (!type) return false;
  return VOICE_CREATION_TYPES.includes(type as CreationTypeId);
}

/**
 * Get media type (image/video/audio) for a creation type
 */
export function getMediaTypeForCreation(
  type?: string
): "image" | "video" | "audio" | "unknown" {
  if (!type) return "unknown";
  if (isVideoCreationType(type)) return "video";
  if (isVoiceCreationType(type)) return "audio";
  if (isImageCreationType(type)) return "image";
  return "unknown";
}
