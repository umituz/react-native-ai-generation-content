/**
 * Video Result Extractor Utility
 * Shared extractor for video generation results
 */

export interface ExtractedVideoResult {
  videoUrl?: string;
  thumbnailUrl?: string;
}

/**
 * Default extractor for video generation results.
 * Handles common provider response formats.
 */
export function defaultExtractVideoResult(
  result: unknown,
): ExtractedVideoResult | undefined {
  if (typeof result !== "object" || result === null) return undefined;

  const r = result as Record<string, unknown>;

  if (typeof r.video === "string") {
    return { videoUrl: r.video };
  }

  if (r.video && typeof r.video === "object") {
    const video = r.video as Record<string, unknown>;
    if (typeof video.url === "string") {
      return {
        videoUrl: video.url,
        thumbnailUrl:
          typeof r.thumbnail === "string" ? r.thumbnail : undefined,
      };
    }
  }

  return undefined;
}
