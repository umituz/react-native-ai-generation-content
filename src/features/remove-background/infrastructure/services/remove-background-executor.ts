/**
 * Remove Background Executor
 * Provider-agnostic background removal execution using active AI provider
 * Model and input format are provided via options from app level
 */

import { providerRegistry } from "../../../../infrastructure/services";
import { cleanBase64 } from "../../../../infrastructure/utils";
import type {
  RemoveBackgroundRequest,
  RemoveBackgroundResult,
  RemoveBackgroundInputBuilder,
  RemoveBackgroundResultExtractor,
} from "../../domain/types";

declare const __DEV__: boolean;

export interface ExecuteRemoveBackgroundOptions {
  model: string;
  buildInput: RemoveBackgroundInputBuilder;
  extractResult?: RemoveBackgroundResultExtractor;
  onProgress?: (progress: number) => void;
}

function defaultExtractResult(result: unknown): string | undefined {
  if (typeof result !== "object" || result === null) return undefined;

  const r = result as Record<string, unknown>;

  if (typeof r.image === "string") return r.image;
  if (Array.isArray(r.images) && r.images[0]?.url) return r.images[0].url;

  return undefined;
}

export async function executeRemoveBackground(
  request: RemoveBackgroundRequest,
  options: ExecuteRemoveBackgroundOptions,
): Promise<RemoveBackgroundResult> {
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
    console.log(`[RemoveBackground] Provider: ${provider.providerId}, Model: ${model}`);
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
      console.error("[RemoveBackground] Error:", message);
    }
    return { success: false, error: message };
  }
}

export function hasRemoveBackgroundSupport(): boolean {
  const provider = providerRegistry.getActiveProvider();
  return provider !== null && provider.isInitialized();
}
