/**
 * Text-to-Video Executor
 * Single Responsibility: Execute text-to-video using active AI provider
 */

import { providerRegistry } from "../../../../infrastructure/services";
import type {
  TextToVideoRequest,
  TextToVideoResult,
  TextToVideoInputBuilder,
  TextToVideoResultExtractor,
} from "../../domain/types";

declare const __DEV__: boolean;

export interface ExecuteTextToVideoOptions {
  model: string;
  buildInput: TextToVideoInputBuilder;
  extractResult?: TextToVideoResultExtractor;
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

export async function executeTextToVideo(
  request: TextToVideoRequest,
  options: ExecuteTextToVideoOptions,
): Promise<TextToVideoResult> {
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
    console.log(`[TextToVideo] Provider: ${provider.providerId}, Model: ${model}`);
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
    if (__DEV__) {
      // eslint-disable-next-line no-console
      console.error("[TextToVideo] Error:", message);
    }
    return { success: false, error: message };
  }
}

export function hasTextToVideoSupport(): boolean {
  const provider = providerRegistry.getActiveProvider();
  return provider !== null && provider.isInitialized();
}
