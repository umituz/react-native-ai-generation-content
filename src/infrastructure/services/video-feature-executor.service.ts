/**
 * Video Feature Executor
 * Single entry point for all video feature executions
 * Output: video URL
 */

import { providerRegistry } from "./provider-registry.service";
import { cleanBase64 } from "../utils";
import { defaultExtractVideoResult } from "../utils/video-result-extractor.util";
import type { VideoFeatureType, VideoFeatureInputData } from "../../domain/interfaces";
import type {
  ExecuteVideoFeatureOptions,
  VideoFeatureResult,
  VideoFeatureRequest,
} from "./video-feature-executor.types";

declare const __DEV__: boolean;

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
    const message = extractErrorMessage(error, featureType);
    return { success: false, error: message };
  }
}

/**
 * Extract error message from various error formats
 */
function extractErrorMessage(error: unknown, featureType: VideoFeatureType): string {
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

  return message;
}

/**
 * Check if video features are supported
 */
export function hasVideoFeatureSupport(): boolean {
  const provider = providerRegistry.getActiveProvider();
  return provider !== null && provider.isInitialized();
}

export type {
  ExecuteVideoFeatureOptions,
  VideoFeatureResult,
  VideoFeatureRequest,
} from "./video-feature-executor.types";
