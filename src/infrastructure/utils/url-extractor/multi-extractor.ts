/**
 * Multiple URL Extractor
 * Extracts arrays of URLs from AI generation results
 */

import { extractOutputUrl } from "./base-extractor";

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
