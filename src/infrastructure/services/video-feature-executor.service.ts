/**
 * Video Feature Executor
 * Single entry point for all video feature executions
 * Output: video URL
 */

import { providerRegistry } from "./provider-registry.service";
import { cleanBase64 } from "../utils";
import type { VideoFeatureType, VideoFeatureInputData } from "../../domain/interfaces";

declare const __DEV__: boolean;

/**
 * Result extractor function type
 */
export type VideoResultExtractor = (result: unknown) => string | undefined;

/**
 * Execution options
 */
export interface ExecuteVideoFeatureOptions {
  extractResult?: VideoResultExtractor;
  onProgress?: (progress: number) => void;
}

/**
 * Execution result
 */
export interface VideoFeatureResult {
  success: boolean;
  videoUrl?: string;
  error?: string;
  requestId?: string;
}

/**
 * Request data for video features
 */
export interface VideoFeatureRequest {
  sourceImageBase64: string;
  targetImageBase64: string;
  prompt?: string;
  options?: Record<string, unknown>;
}

/**
 * Default result extractor - handles common response formats
 * Supports FAL data wrapper and nested object formats
 */
function defaultExtractVideoResult(result: unknown): string | undefined {
  if (typeof result !== "object" || result === null) return undefined;

  const r = result as Record<string, unknown>;

  if (typeof __DEV__ !== "undefined" && __DEV__) {
    console.log("[VideoExtractor] Result keys:", Object.keys(r));
  }

  // Handle fal.ai data wrapper
  const data = (r.data as Record<string, unknown>) ?? r;

  if (typeof __DEV__ !== "undefined" && __DEV__) {
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
    if (typeof __DEV__ !== "undefined" && __DEV__) {
      console.log("[VideoExtractor] Found data.video.url:", videoObj.url);
    }
    return videoObj.url;
  }

  // Array format (e.g., { videos: [{ url: "..." }] })
  if (Array.isArray(data.videos) && typeof data.videos[0]?.url === "string") {
    if (typeof __DEV__ !== "undefined" && __DEV__) {
      console.log("[VideoExtractor] Found videos[0].url:", data.videos[0].url);
    }
    return data.videos[0].url;
  }

  if (typeof __DEV__ !== "undefined" && __DEV__) {
    console.log("[VideoExtractor] No video URL found in result");
  }

  return undefined;
}

/**
 * Execute any video feature using the active provider
 * Uses subscribe for video features to handle long-running generation with progress updates
 */
export async function executeVideoFeature(
  featureType: VideoFeatureType,
  request: VideoFeatureRequest,
  options?: ExecuteVideoFeatureOptions,
): Promise<VideoFeatureResult> {
  const provider = providerRegistry.getActiveProvider();

  if (!provider) {
    return { success: false, error: "No AI provider configured" };
  }

  if (!provider.isInitialized()) {
    return { success: false, error: "AI provider not initialized" };
  }

  const { extractResult, onProgress } = options ?? {};

  const model = provider.getVideoFeatureModel(featureType);

  if (__DEV__) {
    console.log(`[Video:${featureType}] Provider: ${provider.providerId}, Model: ${model}`);
  }

  try {
    onProgress?.(5);

    const inputData: VideoFeatureInputData = {
      sourceImageBase64: cleanBase64(request.sourceImageBase64),
      targetImageBase64: cleanBase64(request.targetImageBase64),
      prompt: request.prompt,
      options: request.options,
    };

    onProgress?.(10);

    const input = provider.buildVideoFeatureInput(featureType, inputData);

    onProgress?.(15);

    // Use subscribe for video features - provides queue updates and handles long-running tasks
    const result = await provider.subscribe(model, input, {
      timeoutMs: 300000, // 5 minutes timeout for video generation
      onQueueUpdate: (status) => {
        if (__DEV__) {
          console.log(`[Video:${featureType}] Queue update:`, status.status);
        }
        // Map queue status to progress percentage
        if (status.status === "IN_QUEUE") {
          onProgress?.(20);
        } else if (status.status === "IN_PROGRESS") {
          onProgress?.(50);
        }
      },
    });

    onProgress?.(90);

    const extractor = extractResult ?? defaultExtractVideoResult;
    const videoUrl = extractor(result);

    onProgress?.(100);

    if (!videoUrl) {
      if (__DEV__) {
        console.log(`[Video:${featureType}] No video URL found in result:`, JSON.stringify(result, null, 2));
      }
      return { success: false, error: "No video in response" };
    }

    return {
      success: true,
      videoUrl,
      requestId: (result as { requestId?: string })?.requestId,
    };
  } catch (error) {
    // Extract detailed error message from FAL API errors
    let message = "Processing failed";
    if (error instanceof Error) {
      message = error.message;
    } else if (typeof error === "object" && error !== null) {
      const errObj = error as Record<string, unknown>;
      if (errObj.detail) {
        message = JSON.stringify(errObj.detail);
      } else if (errObj.message) {
        message = String(errObj.message);
      }
    }

    if (__DEV__) {
      console.error(`[Video:${featureType}] Error:`, message, error);
    }
    return { success: false, error: message };
  }
}

/**
 * Check if video features are supported
 */
export function hasVideoFeatureSupport(): boolean {
  const provider = providerRegistry.getActiveProvider();
  return provider !== null && provider.isInitialized();
}
