/**
 * Video Feature Executor
 * Single entry point for all video feature executions
 * Output: video URL
 */

import { providerRegistry } from "./provider-registry.service";
import { cleanBase64, extractErrorMessage, checkFalApiError } from "../utils";
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
  if (__DEV__) {
    console.log(`[VideoExecutor:${featureType}] START`, {
      hasSource: !!request.sourceImageBase64,
      hasTarget: !!request.targetImageBase64,
      promptLength: request.prompt?.length ?? 0,
      options: request.options,
    });
  }

  const provider = providerRegistry.getActiveProvider();

  if (!provider) {
    if (__DEV__) {
      console.log(`[VideoExecutor:${featureType}] ERROR: No provider`);
    }
    return { success: false, error: "No AI provider configured" };
  }

  if (!provider.isInitialized()) {
    if (__DEV__) {
      console.log(`[VideoExecutor:${featureType}] ERROR: Provider not initialized`);
    }
    return { success: false, error: "AI provider not initialized" };
  }

  const { extractResult, onStatusChange } = options ?? {};

  const model = provider.getVideoFeatureModel(featureType);

  if (__DEV__) {
    console.log(`[VideoExecutor:${featureType}] Provider: ${provider.providerId}, Model: ${model}`);
  }

  try {
    const inputData: VideoFeatureInputData = {
      sourceImageBase64: cleanBase64(request.sourceImageBase64),
      targetImageBase64: cleanBase64(request.targetImageBase64),
      prompt: request.prompt,
      options: request.options,
    };

    if (__DEV__) {
      console.log(`[VideoExecutor:${featureType}] InputData prepared`, {
        sourceSize: inputData.sourceImageBase64 ? `${(inputData.sourceImageBase64.length / 1024).toFixed(1)}KB` : "N/A",
        targetSize: inputData.targetImageBase64 ? `${(inputData.targetImageBase64.length / 1024).toFixed(1)}KB` : "N/A",
        prompt: inputData.prompt?.substring(0, 50) + "...",
      });
    }

    const input = provider.buildVideoFeatureInput(featureType, inputData);

    if (__DEV__) {
      console.log(`[VideoExecutor:${featureType}] Built input for API`, {
        inputKeys: Object.keys(input),
        hasImageUrl: !!(input as Record<string, unknown>).image_url,
        hasPrompt: !!(input as Record<string, unknown>).prompt,
      });
    }

    let statusCount = 0;
    const result = await provider.subscribe(model, input, {
      timeoutMs: VIDEO_TIMEOUT_MS,
      onQueueUpdate: (status) => {
        statusCount++;
        // Log every 10th status update to avoid spam
        if (__DEV__ && statusCount % 10 === 1) {
          console.log(`[VideoExecutor:${featureType}] Queue #${statusCount}:`, status.status);
        }
        onStatusChange?.(status.status);
      },
    });

    if (__DEV__) {
      console.log(`[VideoExecutor:${featureType}] API Response received`, {
        totalStatusUpdates: statusCount,
        resultKeys: result ? Object.keys(result as object) : "null",
        resultType: typeof result,
      });
    }

    // Check for FAL API error in result (may return with COMPLETED status)
    checkFalApiError(result);

    const extractor = extractResult ?? extractVideoResult;
    const videoUrl = extractor(result);

    if (__DEV__) {
      console.log(`[VideoExecutor:${featureType}] Extracted video URL`, {
        hasVideoUrl: !!videoUrl,
        urlPreview: videoUrl ? videoUrl.substring(0, 80) + "..." : "N/A",
      });
    }

    if (!videoUrl) {
      if (__DEV__) {
        console.log(`[VideoExecutor:${featureType}] FAILED: No video URL`, {
          result: JSON.stringify(result).substring(0, 500),
        });
      }
      return { success: false, error: "No video in response" };
    }

    if (__DEV__) {
      console.log(`[VideoExecutor:${featureType}] SUCCESS`, {
        videoUrl: videoUrl.substring(0, 80) + "...",
        requestId: (result as { requestId?: string })?.requestId,
      });
    }

    return {
      success: true,
      videoUrl,
      requestId: (result as { requestId?: string })?.requestId,
    };
  } catch (error) {
    const message = extractErrorMessage(error, "Processing failed", `Video:${featureType}`);
    if (__DEV__) {
      console.log(`[VideoExecutor:${featureType}] EXCEPTION`, {
        error: message,
        originalError: error instanceof Error ? error.message : String(error),
      });
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

/**
 * Submit a video feature to the queue for background processing
 * Returns immediately with requestId and model for later status polling
 */
export async function submitVideoFeatureToQueue(
  featureType: VideoFeatureType,
  request: VideoFeatureRequest,
): Promise<{ success: boolean; requestId?: string; model?: string; error?: string }> {
  if (__DEV__) {
    console.log(`[VideoExecutor:${featureType}] QUEUE SUBMIT`, {
      hasSource: !!request.sourceImageBase64,
      hasTarget: !!request.targetImageBase64,
      promptLength: request.prompt?.length ?? 0,
    });
  }

  const provider = providerRegistry.getActiveProvider();

  if (!provider) {
    return { success: false, error: "No AI provider configured" };
  }

  if (!provider.isInitialized()) {
    return { success: false, error: "AI provider not initialized" };
  }

  const model = provider.getVideoFeatureModel(featureType);

  try {
    const inputData: VideoFeatureInputData = {
      sourceImageBase64: cleanBase64(request.sourceImageBase64),
      targetImageBase64: cleanBase64(request.targetImageBase64),
      prompt: request.prompt,
      options: request.options,
    };

    const input = provider.buildVideoFeatureInput(featureType, inputData);

    const submission = await provider.submitJob(model, input);

    if (__DEV__) {
      console.log(`[VideoExecutor:${featureType}] QUEUE SUBMITTED`, {
        requestId: submission.requestId,
        model,
      });
    }

    return {
      success: true,
      requestId: submission.requestId,
      model,
    };
  } catch (error) {
    const message = extractErrorMessage(error, "Queue submission failed", `Video:${featureType}`);
    if (__DEV__) {
      console.error(`[VideoExecutor:${featureType}] QUEUE EXCEPTION`, { error: message });
    }
    return { success: false, error: message };
  }
}

export type {
  ExecuteVideoFeatureOptions,
  VideoFeatureResult,
  VideoFeatureRequest,
} from "./video-feature-executor.types";
