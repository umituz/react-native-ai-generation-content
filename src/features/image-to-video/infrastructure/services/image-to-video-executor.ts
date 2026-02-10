/**
 * Image-to-Video Executor
 * Provider-agnostic image-to-video execution using Template Method pattern
 */

import { BaseExecutor } from "../../../../infrastructure/executors/base-executor";
import { isSuccess, type Result } from "../../../../domain/types/result.types";
import { checkFalApiError } from "../../../../infrastructure/utils";
import {
  defaultExtractVideoResult,
  type ExtractedVideoResult,
} from "../../../../infrastructure/utils/video-result-extractor.util";
import type { IAIProvider } from "../../../../domain/interfaces";
import type {
  ImageToVideoRequest,
  ImageToVideoResult,
  ImageToVideoInputBuilder,
  ImageToVideoResultExtractor,
} from "../../domain/types";
import { env } from "../../../../infrastructure/config/env.config";

/**
 * Options for image-to-video execution
 */
export interface ExecuteImageToVideoOptions {
  model: string;
  buildInput: ImageToVideoInputBuilder;
  extractResult?: ImageToVideoResultExtractor;
  onProgress?: (progress: number) => void;
}

/**
 * Map job status to progress percentage
 */
const getProgressFromJobStatus = (status: string): number => {
  switch (status.toLowerCase()) {
    case "queued":
      return 10;
    case "in_queue":
      return 15;
    case "processing":
      return 50;
    case "in_progress":
      return 60;
    case "completed":
      return 100;
    default:
      return 30;
  }
};

/**
 * Image-to-Video Executor using Template Method pattern
 * Eliminates code duplication through BaseExecutor
 */
class ImageToVideoExecutor extends BaseExecutor<
  ImageToVideoRequest,
  ImageToVideoResult,
  ExtractedVideoResult
> {
  constructor() {
    super("ImageToVideo");
  }

  protected validateRequest(
    request: ImageToVideoRequest,
  ): string | undefined {
    if (!request.imageBase64) {
      return "Image base64 is required";
    }
    return undefined;
  }

  protected async executeProvider(
    provider: IAIProvider,
    model: string,
    input: Record<string, unknown>,
    onProgress?: (progress: number) => void,
  ): Promise<unknown> {
    this.logInfo("Starting provider.subscribe()...");

    // Use subscribe for video generation (long-running operation with queue)
    // Provider reports real progress via onQueueUpdate callback
    const result = await provider.subscribe(model, input, {
      onQueueUpdate: (status: { status: string; queuePosition?: number }) => {
        this.logInfo(
          `Queue status: ${status.status}, position: ${status.queuePosition}`,
        );
        // Map provider status to progress
        const progress = getProgressFromJobStatus(status.status);
        onProgress?.(progress);
      },
      timeoutMs: env.generationVideoTimeoutMs,
    });

    this.logInfo(
      `Subscribe resolved, result keys: ${result ? Object.keys(result as object) : "null"}`,
    );

    // FAL can return errors with COMPLETED status - check for this
    checkFalApiError(result);

    return result;
  }

  protected validateExtractedResult(
    extracted: ExtractedVideoResult | undefined,
  ): string | undefined {
    if (!extracted?.videoUrl) {
      return "No video in response";
    }
    return undefined;
  }

  protected transformResult(
    extracted: ExtractedVideoResult,
  ): ImageToVideoResult {
    return {
      success: true,
      videoUrl: extracted.videoUrl,
      thumbnailUrl: extracted.thumbnailUrl,
    };
  }

  protected getDefaultExtractor(): (
    result: unknown,
  ) => ExtractedVideoResult | undefined {
    return defaultExtractVideoResult;
  }
}

// Singleton instance
const executor = new ImageToVideoExecutor();

/**
 * Execute image-to-video generation
 * Public API
 */
export async function executeImageToVideo(
  request: ImageToVideoRequest,
  options: ExecuteImageToVideoOptions,
): Promise<ImageToVideoResult> {
  const result: Result<ImageToVideoResult, string> = await executor.execute(
    request,
    {
      model: options.model,
      buildInput: (req) =>
        options.buildInput(req.imageBase64!, req.motionPrompt, req.options),
      extractResult: options.extractResult,
      onProgress: options.onProgress,
    },
  );

  // Convert Result<T, E> to return format
  if (isSuccess(result)) {
    return result.value;
  }
  return { success: false, error: result.error };
}

/**
 * Check if image-to-video is supported
 * Public API
 */
export function hasImageToVideoSupport(): boolean {
  return executor.hasSupport();
}
