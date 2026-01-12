/**
 * Video Result Extractor Utility
 * Extracts video URL from various provider response formats
 */

import type { VideoResultExtractor } from "../services/video-feature-executor.types";

declare const __DEV__: boolean;

/**
 * Default result extractor - handles common response formats
 * Supports FAL data wrapper and nested object formats
 */
export const defaultExtractVideoResult: VideoResultExtractor = (result) => {
  if (typeof result !== "object" || result === null) return undefined;

  const r = result as Record<string, unknown>;

  if (__DEV__) {
    console.log("[VideoExtractor] Result keys:", Object.keys(r));
  }

  // Handle fal.ai data wrapper
  const data = (r.data as Record<string, unknown>) ?? r;

  if (__DEV__) {
    console.log("[VideoExtractor] Data keys:", Object.keys(data));
  }

  // Direct string values
  if (typeof data.video === "string") return data.video;
  if (typeof data.videoUrl === "string") return data.videoUrl;
  if (typeof data.video_url === "string") return data.video_url;
  if (typeof data.output === "string") return data.output;
  if (typeof data.url === "string") return data.url;

  // Object with url property (e.g., { video: { url: "..." } })
  const videoObj = data.video as Record<string, unknown> | undefined;
  if (videoObj && typeof videoObj === "object" && typeof videoObj.url === "string") {
    if (__DEV__) {
      console.log("[VideoExtractor] Found data.video.url:", videoObj.url);
    }
    return videoObj.url;
  }

  // Array format (e.g., { videos: [{ url: "..." }] })
  if (Array.isArray(data.videos) && typeof data.videos[0]?.url === "string") {
    if (__DEV__) {
      console.log("[VideoExtractor] Found videos[0].url:", data.videos[0].url);
    }
    return data.videos[0].url;
  }

  if (__DEV__) {
    console.log("[VideoExtractor] No video URL found in result");
  }

  return undefined;
};
