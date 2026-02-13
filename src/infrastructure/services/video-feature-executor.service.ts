/**
 * Video Feature Executor
 * Single entry point for all video feature executions
 * Output: video URL
 */

import { extractErrorMessage, checkFalApiError, validateProvider, prepareVideoInputData } from "../utils";
import { extractVideoResult } from "../utils/url-extractor";
import { DEFAULT_MAX_POLL_TIME_MS } from "../constants";
import type { VideoFeatureType } from "../../domain/interfaces";
import type { ExecuteVideoFeatureOptions, VideoFeatureResult, VideoFeatureRequest } from "./video-feature-executor.types";


/**
 * Execute any video feature using the active provider
 */
export async function executeVideoFeature(
  featureType: VideoFeatureType,
  request: VideoFeatureRequest,
  options?: ExecuteVideoFeatureOptions,
): Promise<VideoFeatureResult> {
  const validation = validateProvider(`VideoExecutor:${featureType}`);
  if (!validation.success) {
    return { success: false, error: ("error" in validation ? validation.error : "Provider validation failed") };
  }

  const { provider } = validation;
  const { extractResult, onStatusChange } = options ?? {};
  const model = provider.getVideoFeatureModel(featureType);

  try {
    const inputData = prepareVideoInputData(
      request.sourceImageBase64,
      request.targetImageBase64,
      request.prompt,
      request.options,
    );
    const input = provider.buildVideoFeatureInput(featureType, inputData);

    const result = await provider.subscribe(model, input, {
      timeoutMs: DEFAULT_MAX_POLL_TIME_MS,
      onQueueUpdate: (status) => onStatusChange?.(status.status),
    });

    checkFalApiError(result);

    const videoUrl = (extractResult ?? extractVideoResult)(result);

    if (!videoUrl) {
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
  const validation = validateProvider("VideoFeatureSupport");
  return validation.success;
}

/**
 * Submit a video feature to the queue for background processing
 */
export async function submitVideoFeatureToQueue(
  featureType: VideoFeatureType,
  request: VideoFeatureRequest,
): Promise<{ success: boolean; requestId?: string; model?: string; error?: string }> {
  const validation = validateProvider(`VideoExecutor:${featureType}`);
  if (!validation.success) {
    return { success: false, error: ("error" in validation ? validation.error : "Provider validation failed") };
  }

  const { provider } = validation;
  const model = provider.getVideoFeatureModel(featureType);

  try {
    const inputData = prepareVideoInputData(
      request.sourceImageBase64,
      request.targetImageBase64,
      request.prompt,
      request.options,
    );
    const input = provider.buildVideoFeatureInput(featureType, inputData);
    const submission = await provider.submitJob(model, input);

    return { success: true, requestId: submission.requestId, model };
  } catch (error) {
    const message = extractErrorMessage(error, "Queue submission failed", `Video:${featureType}`);
    return { success: false, error: message };
  }
}

export type {
  ExecuteVideoFeatureOptions,
  VideoFeatureResult,
  VideoFeatureRequest,
} from "./video-feature-executor.types";
