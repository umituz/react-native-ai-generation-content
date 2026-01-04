/**
 * Image-to-Video Executor
 * Provider-agnostic image-to-video execution using active AI provider
 * Uses progress mapper for consistent progress reporting
 */

import { providerRegistry } from "../../../../infrastructure/services";
import { getProgressFromJobStatus } from "../../../../infrastructure/utils";
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
  if (typeof __DEV__ !== "undefined" && __DEV__) {
     
    console.log("[ImageToVideoExecutor] executeImageToVideo() called");
  }

  const provider = providerRegistry.getActiveProvider();

  if (!provider) {
    if (typeof __DEV__ !== "undefined" && __DEV__) {
       
      console.error("[ImageToVideoExecutor] No AI provider configured");
    }
    return { success: false, error: "No AI provider configured" };
  }

  if (!provider.isInitialized()) {
    if (typeof __DEV__ !== "undefined" && __DEV__) {
       
      console.error("[ImageToVideoExecutor] AI provider not initialized");
    }
    return { success: false, error: "AI provider not initialized" };
  }

  if (!request.imageBase64) {
    return { success: false, error: "Image base64 is required" };
  }

  const { model, buildInput, extractResult, onProgress } = options;

  if (typeof __DEV__ !== "undefined" && __DEV__) {
     
    console.log(`[ImageToVideoExecutor] Provider: ${provider.providerId}, Model: ${model}`);
  }

  try {
    onProgress?.(5);

    if (typeof __DEV__ !== "undefined" && __DEV__) {
       
      console.log("[ImageToVideoExecutor] Starting provider.subscribe()...");
    }

    // Build input directly - let buildInput handle base64 format
    const input = buildInput(request.imageBase64, request.motionPrompt, request.options);

    // Use subscribe for video generation (long-running operation with queue)
    // subscribe provides progress updates unlike run()
    const result = await provider.subscribe(model, input, {
      onQueueUpdate: (status) => {
        if (typeof __DEV__ !== "undefined" && __DEV__) {
           
          console.log("[ImageToVideoExecutor] Queue status:", status.status, "position:", status.queuePosition);
        }
        // Map provider status to progress using centralized mapper
        const progress = getProgressFromJobStatus(status.status);
        onProgress?.(progress);
      },
      timeoutMs: 300000, // 5 minutes timeout for video generation
    });

    if (typeof __DEV__ !== "undefined" && __DEV__) {
       
      console.log("[ImageToVideoExecutor] Subscribe resolved, result keys:", result ? Object.keys(result as object) : "null");
    }

    if (typeof __DEV__ !== "undefined" && __DEV__) {
       
      console.log("[ImageToVideoExecutor] provider.subscribe() completed");
    }

    const extractor = extractResult || defaultExtractResult;
    const extracted = extractor(result);
    onProgress?.(100);

    if (!extracted?.videoUrl) {
      if (typeof __DEV__ !== "undefined" && __DEV__) {
         
        console.error("[ImageToVideoExecutor] No video URL in response");
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
       
      console.error("[ImageToVideoExecutor] Error:", message);
    }
    return { success: false, error: message };
  }
}

export function hasImageToVideoSupport(): boolean {
  const provider = providerRegistry.getActiveProvider();
  return provider !== null && provider.isInitialized();
}
