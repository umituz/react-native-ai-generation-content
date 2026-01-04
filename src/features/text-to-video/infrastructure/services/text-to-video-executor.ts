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
  if (typeof __DEV__ !== "undefined" && __DEV__) {
     
    console.log("[TextToVideoExecutor] executeTextToVideo() called");
  }

  const provider = providerRegistry.getActiveProvider();

  if (!provider) {
    if (typeof __DEV__ !== "undefined" && __DEV__) {
       
      console.error("[TextToVideoExecutor] No AI provider configured");
    }
    return { success: false, error: "No AI provider configured" };
  }

  if (!provider.isInitialized()) {
    if (typeof __DEV__ !== "undefined" && __DEV__) {
       
      console.error("[TextToVideoExecutor] AI provider not initialized");
    }
    return { success: false, error: "AI provider not initialized" };
  }

  if (!request.prompt) {
    return { success: false, error: "Prompt is required" };
  }

  const { model, buildInput, extractResult, onProgress } = options;

  if (typeof __DEV__ !== "undefined" && __DEV__) {
     
    console.log(`[TextToVideoExecutor] Provider: ${provider.providerId}, Model: ${model}`);
  }

  try {
    onProgress?.(5);
    if (typeof __DEV__ !== "undefined" && __DEV__) {
       
      console.log("[TextToVideoExecutor] Starting provider.run()...");
    }

    const input = buildInput(request.prompt, request.options);

    const result = await provider.run(model, input, {
      onProgress: (progressInfo) => {
        const progressValue = progressInfo.progress;
        if (typeof __DEV__ !== "undefined" && __DEV__) {
           
          console.log("[TextToVideoExecutor] Progress:", progressValue);
        }
        onProgress?.(progressValue);
      },
    });

    if (typeof __DEV__ !== "undefined" && __DEV__) {
       
      console.log("[TextToVideoExecutor] provider.run() completed", result);
    }

    const extractor = extractResult || defaultExtractResult;
    const extracted = extractor(result);
    onProgress?.(100);

    if (!extracted?.videoUrl) {
      if (typeof __DEV__ !== "undefined" && __DEV__) {
         
        console.error("[TextToVideoExecutor] No video URL in response");
      }
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
       
      console.error("[TextToVideoExecutor] Error:", message);
    }
    return { success: false, error: message };
  }
}

export function hasTextToVideoSupport(): boolean {
  const provider = providerRegistry.getActiveProvider();
  return provider !== null && provider.isInitialized();
}
