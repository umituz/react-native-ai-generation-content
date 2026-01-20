/**
 * Preview Helpers
 * Utility functions for creation preview/thumbnail extraction
 */

import { isImageUrl } from "@umituz/react-native-design-system";
import type { CreationOutput } from "../entities/Creation";

// Re-export for convenience
export type { CreationOutput } from "../entities/Creation";

/**
 * Get preview URL from creation output
 * Priority: thumbnailUrl > imageUrl > first imageUrls item > videoUrl > null
 */
export function getPreviewUrl(output?: CreationOutput): string | null {
  if (!output) return null;

  return (
    output.thumbnailUrl ||
    output.imageUrl ||
    output.imageUrls?.[0] ||
    output.videoUrl ||
    null
  );
}

/**
 * Get all available media URLs from creation output
 */
export function getAllMediaUrls(output?: CreationOutput): string[] {
  if (!output) return [];

  const urls: string[] = [];

  if (output.imageUrl) urls.push(output.imageUrl);
  if (output.imageUrls) urls.push(...output.imageUrls);
  if (output.videoUrl) urls.push(output.videoUrl);
  if (output.audioUrl) urls.push(output.audioUrl);

  return urls;
}

/**
 * Check if creation has downloadable content
 */
export function hasDownloadableContent(output?: CreationOutput): boolean {
  if (!output) return false;

  return !!(
    output.imageUrl ||
    (output.imageUrls && output.imageUrls.length > 0) ||
    output.videoUrl ||
    output.audioUrl
  );
}

/**
 * Check if creation has video content
 */
export function hasVideoContent(output?: CreationOutput): boolean {
  return !!output?.videoUrl;
}

/**
 * Check if creation has audio content
 */
export function hasAudioContent(output?: CreationOutput): boolean {
  return !!output?.audioUrl;
}

/**
 * Get primary media URL (for download/share)
 */
export function getPrimaryMediaUrl(output?: CreationOutput): string | null {
  if (!output) return null;

  return (
    output.videoUrl ||
    output.imageUrl ||
    output.imageUrls?.[0] ||
    output.audioUrl ||
    null
  );
}

/**
 * Determine if thumbnail URL is valid and should be displayed
 * - Must exist
 * - Must be an image URL (not a video URL)
 * - Content must not be in progress
 */
export function shouldShowThumbnail(
  thumbnailUrl?: string | null,
  inProgress?: boolean
): boolean {
  if (!thumbnailUrl || inProgress) {
    return false;
  }

  // Thumbnail must be an image, not a video
  return isImageUrl(thumbnailUrl);
}
