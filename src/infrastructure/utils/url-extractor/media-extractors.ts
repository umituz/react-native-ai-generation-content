/**
 * Media URL Extractors
 * Specialized extractors for video, audio, and image URLs
 */

import { extractOutputUrl } from "./base-extractor";

/**
 * Extract video URL from AI generation result
 */
export function extractVideoUrl(result: unknown): string | undefined {
  return extractOutputUrl(result, [
    "video_url",
    "videoUrl",
    "video",
    "url",
  ]);
}

/**
 * Extract audio URL from AI generation result
 */
export function extractAudioUrl(result: unknown): string | undefined {
  return extractOutputUrl(result, [
    "audio_url",
    "audioUrl",
    "audio",
    "url",
  ]);
}

/**
 * Extract image URLs from AI generation result
 */
export function extractImageUrls(result: unknown): string[] {
  if (!result || typeof result !== "object") {
    return [];
  }

  const urls: string[] = [];
  const resultObj = result as Record<string, unknown>;

  // Check top-level image object (birefnet, rembg format)
  const topImage = resultObj.image as Record<string, unknown>;
  if (topImage && typeof topImage === "object" && typeof topImage.url === "string") {
    urls.push(topImage.url);
    return urls;
  }

  // Check images array with bounds checking
  if (Array.isArray(resultObj.images) && resultObj.images.length > 0) {
    for (const img of resultObj.images) {
      if (!img) continue; // Skip null/undefined items

      if (typeof img === "string" && img.length > 0) {
        urls.push(img);
      } else if (typeof img === "object") {
        const imgObj = img as Record<string, unknown>;
        if (typeof imgObj.url === "string" && imgObj.url.length > 0) {
          urls.push(imgObj.url);
        }
      }
    }
  }

  // Check single image
  if (urls.length === 0) {
    const singleUrl = extractOutputUrl(result, [
      "image_url",
      "imageUrl",
      "image",
      "url",
    ]);
    if (singleUrl) {
      urls.push(singleUrl);
    }
  }

  return urls;
}
