/**
 * URL Extractor Utility
 * Extracts output URLs from AI generation results
 * Supports various provider response formats
 */

/**
 * Extract output URL from result
 * Supports various AI provider response formats
 */
export function extractOutputUrl(
  result: unknown,
  urlFields?: string[],
): string | undefined {
  if (!result || typeof result !== "object") {
    return undefined;
  }

  const fields = urlFields ?? [
    "url",
    "image_url",
    "video_url",
    "output_url",
    "result_url",
  ];

  const resultObj = result as Record<string, unknown>;

  // Check top-level fields
  for (const field of fields) {
    const value = resultObj[field];
    if (typeof value === "string" && value.length > 0) {
      return value;
    }
  }

  // Check top-level image/video objects (for birefnet, rembg, etc.)
  const topMedia =
    (resultObj.image as Record<string, unknown>) ||
    (resultObj.video as Record<string, unknown>);
  if (topMedia && typeof topMedia === "object" && typeof topMedia.url === "string") {
    return topMedia.url;
  }

  // Check nested data/output objects
  const nested =
    (resultObj.data as Record<string, unknown>) ||
    (resultObj.output as Record<string, unknown>) ||
    (resultObj.result as Record<string, unknown>);

  if (nested && typeof nested === "object") {
    for (const field of fields) {
      const value = nested[field];
      if (typeof value === "string" && value.length > 0) {
        return value;
      }
    }

    // Check for nested image/video objects
    const media =
      (nested.image as Record<string, unknown>) ||
      (nested.video as Record<string, unknown>);
    if (media && typeof media === "object" && typeof media.url === "string") {
      return media.url;
    }
  }

  return undefined;
}

/**
 * Extract multiple output URLs from result
 */
export function extractOutputUrls(
  result: unknown,
  urlFields?: string[],
): string[] {
  if (!result || typeof result !== "object") {
    return [];
  }

  const urls: string[] = [];
  const resultObj = result as Record<string, unknown>;

  // Check for arrays
  const arrayFields = ["images", "videos", "outputs", "results", "urls"];
  for (const field of arrayFields) {
    const arr = resultObj[field];
    if (Array.isArray(arr)) {
      for (const item of arr) {
        const url = extractOutputUrl(item, urlFields);
        if (url) {
          urls.push(url);
        }
      }
    }
  }

  // Check nested data/output
  const nested = resultObj.data || resultObj.output;
  if (nested && typeof nested === "object") {
    for (const field of arrayFields) {
      const arr = (nested as Record<string, unknown>)[field];
      if (Array.isArray(arr)) {
        for (const item of arr) {
          const url = extractOutputUrl(item, urlFields);
          if (url) {
            urls.push(url);
          }
        }
      }
    }
  }

  // If no array found, try single URL
  if (urls.length === 0) {
    const singleUrl = extractOutputUrl(result, urlFields);
    if (singleUrl) {
      urls.push(singleUrl);
    }
  }

  return urls;
}

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

  // Check images array
  if (Array.isArray(resultObj.images)) {
    for (const img of resultObj.images) {
      if (typeof img === "string" && img.length > 0) {
        urls.push(img);
      } else if (img && typeof img === "object") {
        const imgObj = img as Record<string, unknown>;
        if (typeof imgObj.url === "string") {
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
