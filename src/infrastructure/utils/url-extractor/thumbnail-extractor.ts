/**
 * Thumbnail URL Extractor
 */

/**
 * Extract thumbnail URL from AI generation result
 */
export function extractThumbnailUrl(result: unknown): string | undefined {
  if (!result || typeof result !== "object") {
    return undefined;
  }

  const resultObj = result as Record<string, unknown>;

  // Check direct fields
  const fields = ["thumbnail_url", "thumbnailUrl", "thumbnail", "poster"];
  for (const field of fields) {
    const value = resultObj[field];
    if (typeof value === "string" && value.length > 0) {
      return value;
    }
    if (value && typeof value === "object") {
      const nested = value as Record<string, unknown>;
      if (typeof nested.url === "string") {
        return nested.url;
      }
    }
  }

  return undefined;
}
