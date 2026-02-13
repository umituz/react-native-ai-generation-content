/**
 * Image Feature Executor
 * Single entry point for all image feature executions
 * Output: image URL
 */

import { extractErrorMessage, validateProvider, prepareImageInputData } from "../utils";
import { extractImageResult } from "../utils/url-extractor";
import type { ImageResultExtractor } from "../utils/url-extractor";
import type { ImageFeatureType } from "../../domain/interfaces";

export interface ExecuteImageFeatureOptions {
  extractResult?: ImageResultExtractor;
  onProgress?: (progress: number) => void;
}

export interface ImageFeatureResult {
  success: boolean;
  imageUrl?: string;
  error?: string;
  requestId?: string;
}

export interface ImageFeatureRequest {
  imageBase64?: string;
  targetImageBase64?: string;
  prompt?: string;
  options?: Record<string, unknown>;
}

/**
 * Execute any image feature using the active provider
 */
export async function executeImageFeature(
  featureType: ImageFeatureType,
  request: ImageFeatureRequest,
  options?: ExecuteImageFeatureOptions,
): Promise<ImageFeatureResult> {
  const validation = validateProvider(`Image:${featureType}`);
  if (!validation.success) {
    return { success: false, error: ("error" in validation ? validation.error : "Provider validation failed") };
  }

  const { provider } = validation;
  const { extractResult, onProgress } = options ?? {};
  const model = provider.getImageFeatureModel(featureType);

  try {
    const inputData = prepareImageInputData(
      request.imageBase64 ?? "",
      request.targetImageBase64,
      request.prompt,
      request.options,
    );
    const input = provider.buildImageFeatureInput(featureType, inputData);
    const result = await provider.run(model, input);

    const imageUrl = (extractResult ?? extractImageResult)(result);
    onProgress?.(100);

    if (!imageUrl) {
      return { success: false, error: "No image in response" };
    }

    return {
      success: true,
      imageUrl,
      requestId: (result as { requestId?: string })?.requestId,
    };
  } catch (error) {
    const message = extractErrorMessage(error, "Processing failed", `Image:${featureType}`);
    return { success: false, error: message };
  }
}

/**
 * Check if image features are supported
 */
export function hasImageFeatureSupport(): boolean {
  return validateProvider("ImageFeatureSupport").success;
}
