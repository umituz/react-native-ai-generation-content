/**
 * Base URL Extractor
 * Core extraction logic for various AI provider response formats
 */

/**
 * Default URL field names to check
 */
const DEFAULT_URL_FIELDS = [
  "url",
  "image_url",
  "video_url",
  "output_url",
  "result_url",
] as const;

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

  const fields = urlFields ?? [...DEFAULT_URL_FIELDS];
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
  if (topMedia && typeof topMedia === "object") {
    const url = topMedia.url;
    if (typeof url === "string" && url.length > 0) {
      return url;
    }
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
