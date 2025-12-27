/**
 * Upscale Executor
 * Provider-agnostic upscale execution using active AI provider
 * Model and input format are provided via options from app level
 *
 * Note: imageBase64 must be provided in the request. Image URI to base64
 * conversion should be handled at the app level before calling this executor.
 */

import { providerRegistry } from "../../../../infrastructure/services";
import { cleanBase64 } from "../../../../infrastructure/utils";
import type {
  UpscaleRequest,
  UpscaleResult,
  UpscaleInputBuilder,
  UpscaleResultExtractor,
} from "../../domain/types";

declare const __DEV__: boolean;

export interface ExecuteUpscaleOptions {
  model: string;
  buildInput: UpscaleInputBuilder;
  extractResult?: UpscaleResultExtractor;
  onProgress?: (progress: number) => void;
}

function defaultExtractResult(result: unknown): string | undefined {
  if (typeof result !== "object" || result === null) return undefined;

  const r = result as Record<string, unknown>;

  if (typeof r.image === "string") return r.image;
  if (Array.isArray(r.images) && r.images[0]?.url) return r.images[0].url;

  return undefined;
}

export async function executeUpscale(
  request: UpscaleRequest,
  options: ExecuteUpscaleOptions,
): Promise<UpscaleResult> {
  const provider = providerRegistry.getActiveProvider();

  if (!provider) {
    return { success: false, error: "No AI provider configured" };
  }

  if (!provider.isInitialized()) {
    return { success: false, error: "AI provider not initialized" };
  }

  if (!request.imageBase64) {
    return { success: false, error: "Image base64 is required" };
  }

  const { model, buildInput, extractResult, onProgress } = options;

  if (__DEV__) {
    // eslint-disable-next-line no-console
    console.log(`[Upscale] Provider: ${provider.providerId}, Model: ${model}`);
  }

  try {
    onProgress?.(10);

    const base64 = cleanBase64(request.imageBase64);
    onProgress?.(30);

    const input = buildInput(base64, request.options);
    onProgress?.(40);

    const result = await provider.run(model, input);
    onProgress?.(90);

    const extractor = extractResult || defaultExtractResult;
    const imageUrl = extractor(result);
    onProgress?.(100);

    if (!imageUrl) {
      return { success: false, error: "No image in response" };
    }

    return { success: true, imageUrl };
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    if (__DEV__) {
      // eslint-disable-next-line no-console
      console.error("[Upscale] Error:", message);
    }
    return { success: false, error: message };
  }
}

export function hasUpscaleSupport(): boolean {
  const provider = providerRegistry.getActiveProvider();
  return provider !== null && provider.isInitialized();
}
