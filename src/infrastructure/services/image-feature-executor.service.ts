/**
 * Image Feature Executor
 * Single entry point for all image feature executions
 * Output: image URL
 */

import { providerRegistry } from "./provider-registry.service";
import { cleanBase64 } from "../utils";
import type { ImageFeatureType, ImageFeatureInputData } from "../../domain/interfaces";

declare const __DEV__: boolean;

/**
 * Result extractor function type
 */
export type ImageResultExtractor = (result: unknown) => string | undefined;

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
 * Default result extractor - handles common response formats
 */
function defaultExtractImageResult(result: unknown): string | undefined {
  if (typeof result !== "object" || result === null) return undefined;

  const r = result as Record<string, unknown>;

  if (typeof r.image === "string") return r.image;
  if (typeof r.imageUrl === "string") return r.imageUrl;
  if (typeof r.output === "string") return r.output;
  if (Array.isArray(r.images) && typeof r.images[0]?.url === "string") {
    return r.images[0].url;
  }

  return undefined;
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

    const extractor = extractResult ?? defaultExtractImageResult;
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
    const message = error instanceof Error ? error.message : String(error);
    if (__DEV__) {
       
      console.error(`[Image:${featureType}] Error:`, message);
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
