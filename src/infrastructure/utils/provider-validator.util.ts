/**
 * Provider Validator Utility
 * Validates provider state and prepares feature inputs
 */

import { providerRegistry } from "../services/provider-registry.service";
import { cleanBase64 } from "./index";
import type { IAIProvider, VideoFeatureInputData, ImageFeatureInputData } from "../../domain/interfaces";

declare const __DEV__: boolean;

export type ProviderValidationResult =
  | { success: true; provider: IAIProvider }
  | { success: false; error: string };

/**
 * Validate provider is available and initialized
 */
export function validateProvider(context: string): ProviderValidationResult {
  const provider = providerRegistry.getActiveProvider();

  if (!provider) {
    if (typeof __DEV__ !== "undefined" && __DEV__) {
      console.log(`[${context}] ERROR: No provider`);
    }
    return { success: false, error: "No AI provider configured" };
  }

  if (!provider.isInitialized()) {
    if (typeof __DEV__ !== "undefined" && __DEV__) {
      console.log(`[${context}] ERROR: Provider not initialized`);
    }
    return { success: false, error: "AI provider not initialized" };
  }

  return { success: true, provider };
}

/**
 * Prepare video feature input data
 */
export function prepareVideoInputData(
  sourceImageBase64?: string,
  targetImageBase64?: string,
  prompt?: string,
  options?: Record<string, unknown>,
): VideoFeatureInputData {
  return {
    sourceImageBase64: cleanBase64(sourceImageBase64),
    targetImageBase64: cleanBase64(targetImageBase64),
    prompt,
    options,
  };
}

/**
 * Prepare image feature input data
 */
export function prepareImageInputData(
  imageBase64: string,
  targetImageBase64?: string,
  prompt?: string,
  options?: Record<string, unknown>,
): ImageFeatureInputData {
  return {
    imageBase64: cleanBase64(imageBase64) ?? "",
    targetImageBase64: cleanBase64(targetImageBase64),
    prompt,
    options,
  };
}
