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
 */
function defaultExtractVideoResult(result: unknown): string | undefined {
  if (typeof result !== "object" || result === null) return undefined;

  const r = result as Record<string, unknown>;

  if (typeof r.video === "string") return r.video;
  if (typeof r.videoUrl === "string") return r.videoUrl;
  if (typeof r.video_url === "string") return r.video_url;
  if (typeof r.output === "string") return r.output;
  if (typeof r.url === "string") return r.url;

  return undefined;
}

/**
 * Execute any video feature using the active provider
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
    onProgress?.(10);

    const inputData: VideoFeatureInputData = {
      sourceImageBase64: cleanBase64(request.sourceImageBase64),
      targetImageBase64: cleanBase64(request.targetImageBase64),
      prompt: request.prompt,
      options: request.options,
    };

    onProgress?.(30);

    const input = provider.buildVideoFeatureInput(featureType, inputData);

    onProgress?.(40);

    const result = await provider.run(model, input);

    onProgress?.(90);

    const extractor = extractResult ?? defaultExtractVideoResult;
    const videoUrl = extractor(result);

    onProgress?.(100);

    if (!videoUrl) {
      return { success: false, error: "No video in response" };
    }

    return {
      success: true,
      videoUrl,
      requestId: (result as { requestId?: string })?.requestId,
    };
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    if (__DEV__) {
       
      console.error(`[Video:${featureType}] Error:`, message);
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
