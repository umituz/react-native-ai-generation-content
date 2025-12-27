/**
 * Text-to-Image Executor
 * Provider-agnostic text-to-image execution using active AI provider
 */

import { providerRegistry } from "../../../../infrastructure/services";
import type {
  TextToImageRequest,
  TextToImageResult,
  TextToImageInputBuilder,
  TextToImageResultExtractor,
} from "../../domain/types";

declare const __DEV__: boolean;

export interface ExecuteTextToImageOptions {
  model: string;
  buildInput: TextToImageInputBuilder;
  extractResult?: TextToImageResultExtractor;
  onProgress?: (progress: number) => void;
}

function defaultExtractResult(
  result: unknown,
): { imageUrl?: string; imageUrls?: string[] } | undefined {
  if (typeof result !== "object" || result === null) return undefined;

  const r = result as Record<string, unknown>;

  if (typeof r.image === "string") {
    return { imageUrl: r.image };
  }

  if (Array.isArray(r.images)) {
    const urls = r.images
      .map((img) => {
        if (typeof img === "string") return img;
        if (img && typeof img === "object" && "url" in img) {
          return (img as { url: string }).url;
        }
        return null;
      })
      .filter((url): url is string => url !== null);

    if (urls.length > 0) {
      return { imageUrl: urls[0], imageUrls: urls };
    }
  }

  return undefined;
}

export async function executeTextToImage(
  request: TextToImageRequest,
  options: ExecuteTextToImageOptions,
): Promise<TextToImageResult> {
  const provider = providerRegistry.getActiveProvider();

  if (!provider) {
    return { success: false, error: "No AI provider configured" };
  }

  if (!provider.isInitialized()) {
    return { success: false, error: "AI provider not initialized" };
  }

  if (!request.prompt) {
    return { success: false, error: "Prompt is required" };
  }

  const { model, buildInput, extractResult, onProgress } = options;

  if (__DEV__) {
    // eslint-disable-next-line no-console
    console.log(`[TextToImage] Provider: ${provider.providerId}, Model: ${model}`);
  }

  try {
    onProgress?.(10);

    const input = buildInput(request.prompt, request.options);
    onProgress?.(20);

    const result = await provider.run(model, input);
    onProgress?.(90);

    const extractor = extractResult || defaultExtractResult;
    const extracted = extractor(result);
    onProgress?.(100);

    if (!extracted?.imageUrl) {
      return { success: false, error: "No image in response" };
    }

    return {
      success: true,
      imageUrl: extracted.imageUrl,
      imageUrls: extracted.imageUrls,
    };
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    if (__DEV__) {
      // eslint-disable-next-line no-console
      console.error("[TextToImage] Error:", message);
    }
    return { success: false, error: message };
  }
}

export function hasTextToImageSupport(): boolean {
  const provider = providerRegistry.getActiveProvider();
  return provider !== null && provider.isInitialized();
}
