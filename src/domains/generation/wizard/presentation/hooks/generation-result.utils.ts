/**
 * Generation Result Utilities
 * Provider-agnostic utilities for extracting generation results
 */

import { extractThumbnailUrl } from "../../../../../infrastructure/utils/url-extractor/thumbnail-extractor";

export interface GenerationErrorDetail {
  msg?: string;
  type?: string;
  loc?: string[];
  input?: string;
}

export interface GenerationResult {
  video?: { url?: string };
  output?: string;
  images?: Array<{ url?: string }>;
  image?: { url?: string };
  detail?: GenerationErrorDetail[];
  error?: string;
}

export interface GenerationUrls {
  imageUrl?: string;
  videoUrl?: string;
  thumbnailUrl?: string;
}

/**
 * Check if result contains an error and throw with appropriate message
 */
function checkForErrors(result: GenerationResult): void {
  if (result.detail && Array.isArray(result.detail) && result.detail.length > 0) {
    const firstError = result.detail[0];
    if (!firstError) return;

    const errorType = firstError.type || "unknown";
    const errorMsg = firstError.msg || "Generation failed";

    if (errorType === "content_policy_violation") {
      throw new Error("error.generation.content_policy");
    }

    if (errorType.includes("validation")) {
      throw new Error("error.generation.validation");
    }

    throw new Error(errorMsg);
  }

  if (result.error && typeof result.error === "string" && result.error.length > 0) {
    throw new Error(result.error);
  }
}

/**
 * Extracts image/video URL from generation result
 * Handles various result formats from different providers
 * Throws error if result contains error information
 */
export function extractResultUrl(result: GenerationResult): GenerationUrls {
  checkForErrors(result);

  const thumbnailUrl = extractThumbnailUrl(result);

  if (result.video?.url && typeof result.video.url === "string") {
    return { videoUrl: result.video.url, thumbnailUrl };
  }

  if (typeof result.output === "string" && result.output.length > 0 && result.output.startsWith("http")) {
    if (result.output.includes(".mp4") || result.output.includes("video")) {
      return { videoUrl: result.output };
    }
    return { imageUrl: result.output };
  }

  if (result.images && Array.isArray(result.images) && result.images.length > 0) {
    const firstImage = result.images[0];
    if (firstImage?.url && typeof firstImage.url === "string") {
      return { imageUrl: firstImage.url };
    }
  }

  if (result.image?.url && typeof result.image.url === "string") {
    return { imageUrl: result.image.url };
  }

  if (typeof __DEV__ !== "undefined" && __DEV__) {
    console.error("[extractResultUrl] ❌ No URL found in result:", {
      hasVideo: !!result.video,
      hasOutput: !!result.output,
      hasImages: !!result.images,
      hasImage: !!result.image,
      resultKeys: Object.keys(result),
    });
  }

  return {};
}
