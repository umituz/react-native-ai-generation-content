/**
 * Media URL Extractor
 * Extracts media URL from generation result object
 */

interface MediaUrlResult {
  readonly url: string;
  readonly isVideo: boolean;
}

/**
 * Extract media URL from generation result
 * Supports multiple result formats from different AI providers
 */
export function extractMediaUrl(result: unknown): MediaUrlResult | null {
  if (!result || typeof result !== "object") return null;

  const data = result as Record<string, unknown>;
  const output = data.output as Record<string, unknown> | undefined;

  // Try to get video URL first
  const videoUrl = output?.videoUrl || data.videoUrl || data.video_url;
  if (videoUrl && typeof videoUrl === "string") {
    return { url: videoUrl, isVideo: true };
  }

  // Try to get image URL
  const imageUrl = output?.imageUrl || data.imageUrl || data.image_url || data.uri;
  if (imageUrl && typeof imageUrl === "string") {
    return { url: imageUrl, isVideo: false };
  }

  return null;
}
