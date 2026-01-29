/**
 * Generation Result Utilities
 * Shared utilities for extracting and processing generation results
 */

export interface FalErrorDetail {
  msg?: string;
  type?: string;
  loc?: string[];
  input?: string;
}

export interface FalResult {
  video?: { url?: string };
  output?: string;
  images?: Array<{ url?: string }>;
  image?: { url?: string };
  detail?: FalErrorDetail[];
  error?: string;
}

export interface GenerationUrls {
  imageUrl?: string;
  videoUrl?: string;
}

/**
 * Check if result contains an error and throw with appropriate message
 */
function checkForErrors(result: FalResult): void {
  // Check for FAL API error format: {detail: [{msg, type}]}
  if (result.detail && Array.isArray(result.detail) && result.detail.length > 0) {
    const firstError = result.detail[0];
    const errorType = firstError?.type || "unknown";
    const errorMsg = firstError?.msg || "Generation failed";

    // Map error type to translation key
    if (errorType === "content_policy_violation") {
      throw new Error("error.generation.content_policy");
    }

    if (errorType.includes("validation")) {
      throw new Error("error.generation.validation");
    }

    throw new Error(errorMsg);
  }

  // Check for simple error field
  if (result.error) {
    throw new Error(result.error);
  }
}

/**
 * Extracts image/video URL from FAL result
 * Handles various result formats from different FAL models
 * Throws error if result contains error information
 */
export function extractResultUrl(result: FalResult): GenerationUrls {
  // First check for errors in the result
  checkForErrors(result);

  // Video result
  if (result.video?.url) {
    return { videoUrl: result.video.url };
  }

  // Output URL (some models return direct URL)
  if (typeof result.output === "string" && result.output.startsWith("http")) {
    if (result.output.includes(".mp4") || result.output.includes("video")) {
      return { videoUrl: result.output };
    }
    return { imageUrl: result.output };
  }

  // Images array (most image models)
  if (result.images?.[0]?.url) {
    return { imageUrl: result.images[0].url };
  }

  // Single image
  if (result.image?.url) {
    return { imageUrl: result.image.url };
  }

  return {};
}
