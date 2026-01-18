/**
 * Image Feature Executor
 * Single entry point for all image feature executions
 * Output: image URL
 */

import { providerRegistry } from "./provider-registry.service";
import { cleanBase64 } from "../utils";
import { extractImageResult } from "../utils/url-extractor";
import type { ImageResultExtractor } from "../utils/url-extractor";
import type { ImageFeatureType, ImageFeatureInputData } from "../../domain/interfaces";

declare const __DEV__: boolean;

/**
 * Execution options
 */
export interface ExecuteImageFeatureOptions {
  extractResult?: ImageResultExtractor;
  onProgress?: (progress: number) => void;
}

/**
 * Execution result
 */
export interface ImageFeatureResult {
  success: boolean;
  imageUrl?: string;
  error?: string;
  requestId?: string;
}

/**
 * Request data for image features
 */
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
  const provider = providerRegistry.getActiveProvider();

  if (!provider) {
    return { success: false, error: "No AI provider configured" };
  }

  if (!provider.isInitialized()) {
    return { success: false, error: "AI provider not initialized" };
  }

  const { extractResult, onProgress } = options ?? {};

  const model = provider.getImageFeatureModel(featureType);

  if (__DEV__) {
     
    console.log(`[Image:${featureType}] Provider: ${provider.providerId}, Model: ${model}`);
  }

  try {
    onProgress?.(10);

    const inputData: ImageFeatureInputData = {
      imageBase64: request.imageBase64 ? cleanBase64(request.imageBase64) : "",
      targetImageBase64: request.targetImageBase64
        ? cleanBase64(request.targetImageBase64)
        : undefined,
      prompt: request.prompt,
      options: request.options,
    };

    onProgress?.(30);

    const input = provider.buildImageFeatureInput(featureType, inputData);

    onProgress?.(40);

    const result = await provider.run(model, input);

    onProgress?.(90);

    const extractor = extractResult ?? extractImageResult;
    const imageUrl = extractor(result);

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
    // Extract detailed error message from FAL API errors
    let message = "Processing failed";
    if (error instanceof Error) {
      message = error.message;
    } else if (typeof error === "object" && error !== null) {
      const errObj = error as Record<string, unknown>;
      // FAL API error format: {detail: [{msg, type, loc}]} or {message}
      if (Array.isArray(errObj.detail) && errObj.detail[0]?.msg) {
        message = String(errObj.detail[0].msg);
      } else if (errObj.detail) {
        message = JSON.stringify(errObj.detail);
      } else if (errObj.message) {
        message = String(errObj.message);
      } else if (errObj.msg) {
        message = String(errObj.msg);
      }
    }
    if (__DEV__) {
      console.error(`[Image:${featureType}] Error:`, message, error);
    }
    return { success: false, error: message };
  }
}

/**
 * Check if image features are supported
 */
export function hasImageFeatureSupport(): boolean {
  const provider = providerRegistry.getActiveProvider();
  return provider !== null && provider.isInitialized();
}
