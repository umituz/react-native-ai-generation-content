/**
 * HD Touch Up Executor
 * Executes HD enhancement using the configured provider
 */

import { providerRegistry } from "../../../../infrastructure/services";
import type {
  HDTouchUpRequest,
  HDTouchUpResult,
  HDTouchUpInputBuilder,
  HDTouchUpResultExtractor,
} from "../../domain/types";

declare const __DEV__: boolean;

export interface ExecuteHDTouchUpOptions {
  model: string;
  buildInput: HDTouchUpInputBuilder;
  extractResult?: HDTouchUpResultExtractor;
  onProgress?: (progress: number) => void;
}

export async function executeHDTouchUp(
  request: HDTouchUpRequest,
  options: ExecuteHDTouchUpOptions,
): Promise<HDTouchUpResult> {
  const { model, buildInput, extractResult, onProgress } = options;

  try {
    const provider = providerRegistry.getActiveProvider();
    if (!provider) {
      return {
        success: false,
        error: "No AI provider configured",
      };
    }

    if (__DEV__) {
      // eslint-disable-next-line no-console
      console.log("[HDTouchUp] Starting HD enhancement with model:", model);
    }

    onProgress?.(10);

    const imageBase64 = request.imageBase64;
    if (!imageBase64) {
      return {
        success: false,
        error: "Image base64 is required",
      };
    }

    const input = buildInput(imageBase64, request.options);

    onProgress?.(30);

    const result = await provider.generate(model, input, request.userId);

    onProgress?.(80);

    const imageUrl = extractResult
      ? extractResult(result)
      : (result as { imageUrl?: string })?.imageUrl ||
        (result as { image?: string })?.image ||
        (result as { output?: string })?.output;

    onProgress?.(100);

    if (imageUrl) {
      return {
        success: true,
        imageUrl,
        requestId: (result as { requestId?: string })?.requestId,
      };
    }

    return {
      success: false,
      error: "No image URL in response",
    };
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    if (__DEV__) {
      // eslint-disable-next-line no-console
      console.error("[HDTouchUp] Error:", message);
    }
    return {
      success: false,
      error: message,
    };
  }
}

export function hasHDTouchUpSupport(): boolean {
  const provider = providerRegistry.getActiveProvider();
  return !!provider;
}
