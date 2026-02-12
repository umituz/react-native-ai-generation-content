/**
 * Image-to-Video Executor
 */

import { BaseExecutor } from "../../../../infrastructure/executors/base-executor";
import { isSuccess, type Result } from "../../../../domain/types/result.types";
import { checkFalApiError } from "../../../../infrastructure/utils";
import {
  defaultExtractVideoResult,
  type ExtractedVideoResult,
} from "../../../../infrastructure/utils/video-result-extractor.util";
import type { IAIProvider } from "../../../../domain/interfaces";
import type { ImageToVideoRequest, ImageToVideoResult } from "../../domain/types";
import { env } from "../../../../infrastructure/config/env.config";
import type { ExecuteImageToVideoOptions } from "./image-to-video-executor.types";

// Export types
export type { ExecuteImageToVideoOptions };

const STATUS_PROGRESS: Record<string, number> = {
  queued: 10,
  in_queue: 15,
  processing: 50,
  in_progress: 60,
  completed: 100,
};

class ImageToVideoExecutor extends BaseExecutor<
  ImageToVideoRequest,
  ImageToVideoResult,
  ExtractedVideoResult
> {
  constructor() {
    super("ImageToVideo");
  }

  protected validateRequest(request: ImageToVideoRequest): string | undefined {
    return request.imageBase64 ? undefined : "Image base64 is required";
  }

  protected async executeProvider(
    provider: IAIProvider,
    model: string,
    input: Record<string, unknown>,
    onProgress?: (progress: number) => void,
  ): Promise<unknown> {
    this.log("info", "Starting provider.subscribe()...");

    const result = await provider.subscribe(model, input, {
      onQueueUpdate: (status: { status: string; queuePosition?: number }) => {
        this.log("info", `Queue: ${status.status}, pos: ${status.queuePosition}`);
        onProgress?.(STATUS_PROGRESS[status.status.toLowerCase()] ?? 30);
      },
      timeoutMs: env.generationVideoTimeoutMs,
    });

    this.log("info", `Complete, keys: ${result ? Object.keys(result as object) : "null"}`);
    checkFalApiError(result);
    return result;
  }

  protected validateExtractedResult(extracted: ExtractedVideoResult | undefined): string | undefined {
    return extracted?.videoUrl ? undefined : "No video in response";
  }

  protected transformResult(extracted: ExtractedVideoResult): ImageToVideoResult {
    return {
      success: true,
      videoUrl: extracted.videoUrl,
      thumbnailUrl: extracted.thumbnailUrl,
    };
  }

  protected getDefaultExtractor(): (result: unknown) => ExtractedVideoResult | undefined {
    return defaultExtractVideoResult;
  }
}

const executor = new ImageToVideoExecutor();

export async function executeImageToVideo(
  request: ImageToVideoRequest,
  options: ExecuteImageToVideoOptions,
): Promise<ImageToVideoResult> {
  const result: Result<ImageToVideoResult, string> = await executor.execute(request, {
    model: options.model,
    buildInput: (req) => options.buildInput(req.imageBase64!, req.motionPrompt, req.options),
    extractResult: options.extractResult,
    onProgress: options.onProgress,
  });

  return isSuccess(result) ? result.value : { success: false, error: result.error };
}

export function hasImageToVideoSupport(): boolean {
  return executor.hasSupport();
}
