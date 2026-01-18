/**
 * Video Feature Executor
 * Single entry point for all video feature executions
 * Output: video URL
 */

import { providerRegistry } from "./provider-registry.service";
import { cleanBase64, extractErrorMessage } from "../utils";
import { extractVideoResult } from "../utils/url-extractor";
import { VIDEO_TIMEOUT_MS } from "../constants";
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

  const { extractResult, onProgress, onStatusChange } = options ?? {};

  const model = provider.getVideoFeatureModel(featureType);

  if (__DEV__) {
    console.log(`[Video:${featureType}] Provider: ${provider.providerId}, Model: ${model}`);
  }

  try {
    const inputData: VideoFeatureInputData = {
      sourceImageBase64: cleanBase64(request.sourceImageBase64),
      targetImageBase64: cleanBase64(request.targetImageBase64),
      prompt: request.prompt,
      options: request.options,
    };

    const input = provider.buildVideoFeatureInput(featureType, inputData);

    const result = await provider.subscribe(model, input, {
      timeoutMs: VIDEO_TIMEOUT_MS,
      onQueueUpdate: (status) => {
        if (__DEV__) {
          console.log(`[Video:${featureType}] Queue status:`, status.status);
        }
        onStatusChange?.(status.status);
      },
    });

    const extractor = extractResult ?? extractVideoResult;
    const videoUrl = extractor(result);

    onProgress?.(100);

    if (!videoUrl) {
      if (__DEV__) {
        console.log(`[Video:${featureType}] No video URL found in result`);
      }
      return { success: false, error: "No video in response" };
    }

    return {
      success: true,
      videoUrl,
      requestId: (result as { requestId?: string })?.requestId,
    };
  } catch (error) {
    const message = extractErrorMessage(error, "Processing failed", `Video:${featureType}`);
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

export type {
  ExecuteVideoFeatureOptions,
  VideoFeatureResult,
  VideoFeatureRequest,
} from "./video-feature-executor.types";
