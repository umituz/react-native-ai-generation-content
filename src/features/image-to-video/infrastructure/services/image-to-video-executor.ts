/**
 * Image-to-Video Executor
 * Provider-agnostic image-to-video execution using active AI provider
 */

import { providerRegistry } from "../../../../infrastructure/services";
import { cleanBase64 } from "../../../../infrastructure/utils";
import type {
  ImageToVideoRequest,
  ImageToVideoResult,
  ImageToVideoInputBuilder,
  ImageToVideoResultExtractor,
} from "../../domain/types";

declare const __DEV__: boolean;

export interface ExecuteImageToVideoOptions {
  model: string;
  buildInput: ImageToVideoInputBuilder;
  extractResult?: ImageToVideoResultExtractor;
  onProgress?: (progress: number) => void;
}

function defaultExtractResult(
  result: unknown,
): { videoUrl?: string; thumbnailUrl?: string } | undefined {
  if (typeof result !== "object" || result === null) return undefined;

  const r = result as Record<string, unknown>;

  if (typeof r.video === "string") {
    return { videoUrl: r.video };
  }

  if (r.video && typeof r.video === "object") {
    const video = r.video as Record<string, unknown>;
    if (typeof video.url === "string") {
      return {
        videoUrl: video.url,
        thumbnailUrl:
          typeof r.thumbnail === "string" ? r.thumbnail : undefined,
      };
    }
  }

  return undefined;
}

export async function executeImageToVideo(
  request: ImageToVideoRequest,
  options: ExecuteImageToVideoOptions,
): Promise<ImageToVideoResult> {
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

  if (typeof __DEV__ !== "undefined" && __DEV__) {
    // eslint-disable-next-line no-console
    console.log(`[ImageToVideo] Provider: ${provider.providerId}, Model: ${model}`);
  }

  try {
    onProgress?.(10);

    const imageBase64 = cleanBase64(request.imageBase64);
    onProgress?.(30);

    const input = buildInput(imageBase64, request.motionPrompt, request.options);
    onProgress?.(40);

    const result = await provider.run(model, input);
    onProgress?.(90);

    const extractor = extractResult || defaultExtractResult;
    const extracted = extractor(result);
    onProgress?.(100);

    if (!extracted?.videoUrl) {
      return { success: false, error: "No video in response" };
    }

    return {
      success: true,
      videoUrl: extracted.videoUrl,
      thumbnailUrl: extracted.thumbnailUrl,
    };
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    if (typeof __DEV__ !== "undefined" && __DEV__) {
      // eslint-disable-next-line no-console
      console.error("[ImageToVideo] Error:", message);
    }
    return { success: false, error: message };
  }
}

export function hasImageToVideoSupport(): boolean {
  const provider = providerRegistry.getActiveProvider();
  return provider !== null && provider.isInitialized();
}
