/**
 * Text-to-Video Executor
 * Provider-agnostic text-to-video execution using Template Method pattern
 */

import { BaseExecutor } from "../../../../infrastructure/executors/base-executor";
import { isSuccess, type Result } from "../../../../domain/types/result.types";
import {
  defaultExtractVideoResult,
  type ExtractedVideoResult,
} from "../../../../infrastructure/utils/video-result-extractor.util";
import type { IAIProvider } from "../../../../domain/interfaces";
import type {
  TextToVideoRequest,
  TextToVideoResult,
  TextToVideoInputBuilder,
  TextToVideoResultExtractor,
} from "../../domain/types";

declare const __DEV__: boolean;

/**
 * Options for text-to-video execution
 */
export interface ExecuteTextToVideoOptions {
  model: string;
  buildInput: TextToVideoInputBuilder;
  extractResult?: TextToVideoResultExtractor;
  onProgress?: (progress: number) => void;
}

/**
 * Text-to-Video Executor using Template Method pattern
 * Eliminates code duplication through BaseExecutor
 */
class TextToVideoExecutor extends BaseExecutor<
  TextToVideoRequest,
  TextToVideoResult,
  ExtractedVideoResult
> {
  constructor() {
    super("TextToVideo");
  }

  protected validateRequest(request: TextToVideoRequest): string | undefined {
    if (!request.prompt) {
      return "Prompt is required";
    }
    return undefined;
  }

  protected async executeProvider(
    provider: IAIProvider,
    model: string,
    input: Record<string, unknown>,
    onProgress?: (progress: number) => void,
  ): Promise<unknown> {
    this.logInfo("Starting provider.run()...");

    // Provider reports real progress via callback
    const result = await provider.run(model, input, {
      onProgress: (progressInfo: { progress: number }) => {
        const progressValue = progressInfo.progress;
        if (typeof __DEV__ !== "undefined" && __DEV__) {
          console.log("[TextToVideo] Progress:", progressValue);
        }
        onProgress?.(progressValue);
      },
    });

    this.logInfo("provider.run() completed");
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
  ): TextToVideoResult {
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
const executor = new TextToVideoExecutor();

/**
 * Execute text-to-video generation
 * Public API
 */
export async function executeTextToVideo(
  request: TextToVideoRequest,
  options: ExecuteTextToVideoOptions,
): Promise<TextToVideoResult> {
  const result: Result<TextToVideoResult, string> = await executor.execute(
    request,
    {
      model: options.model,
      buildInput: (req) => options.buildInput(req.prompt, req.options),
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
 * Check if text-to-video is supported
 * Public API
 */
export function hasTextToVideoSupport(): boolean {
  return executor.hasSupport();
}
