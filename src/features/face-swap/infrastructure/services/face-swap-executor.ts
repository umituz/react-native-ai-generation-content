/**
 * Face Swap Executor
 * Provider-agnostic face swap execution using active AI provider
 * Model and input format are provided via options from app level
 */

import { providerRegistry } from "../../../../infrastructure/services";
import { cleanBase64 } from "../../../../infrastructure/utils";
import type {
  FaceSwapRequest,
  FaceSwapResult,
  FaceSwapInputBuilder,
  FaceSwapResultExtractor,
} from "../../domain/types";

declare const __DEV__: boolean;

export interface ExecuteFaceSwapOptions {
  model: string;
  buildInput: FaceSwapInputBuilder;
  extractResult?: FaceSwapResultExtractor;
  onProgress?: (progress: number) => void;
}

function defaultExtractResult(result: unknown): string | undefined {
  if (typeof result !== "object" || result === null) return undefined;

  const r = result as Record<string, unknown>;

  if (typeof r.image === "string") return r.image;
  if (Array.isArray(r.images) && r.images[0]?.url) return r.images[0].url;

  return undefined;
}

export async function executeFaceSwap(
  request: FaceSwapRequest,
  options: ExecuteFaceSwapOptions,
): Promise<FaceSwapResult> {
  const provider = providerRegistry.getActiveProvider();

  if (!provider) {
    return { success: false, error: "No AI provider configured" };
  }

  if (!provider.isInitialized()) {
    return { success: false, error: "AI provider not initialized" };
  }

  if (!request.sourceImageBase64 || !request.targetImageBase64) {
    return { success: false, error: "Both source and target image base64 are required" };
  }

  const { model, buildInput, extractResult, onProgress } = options;

  if (__DEV__) {
    // eslint-disable-next-line no-console
    console.log(`[FaceSwap] Provider: ${provider.providerId}, Model: ${model}`);
  }

  try {
    onProgress?.(10);

    const sourceBase64 = cleanBase64(request.sourceImageBase64);
    const targetBase64 = cleanBase64(request.targetImageBase64);
    onProgress?.(30);

    const input = buildInput(sourceBase64, targetBase64, request.options);
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
      console.error("[FaceSwap] Error:", message);
    }
    return { success: false, error: message };
  }
}

export function hasFaceSwapSupport(): boolean {
  const provider = providerRegistry.getActiveProvider();
  return provider !== null && provider.isInitialized();
}
