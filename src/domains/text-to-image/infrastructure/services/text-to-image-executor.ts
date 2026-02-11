/**
 * Text-to-Image Executor
 * Provider-agnostic text-to-image execution using Template Method pattern
 */

import { BaseExecutor } from "../../../../infrastructure/executors/base-executor";
import { isSuccess, type Result } from "../../../../domain/types/result.types";
import type { IAIProvider } from "../../../../domain/interfaces";
import type {
  TextToImageRequest,
  TextToImageResult,
  TextToImageInputBuilder,
  TextToImageResultExtractor,
} from "../../domain/types";
import { defaultExtractImageResult, type ExtractedImageResult } from "../utils/imageResultExtractor";

export interface ExecuteTextToImageOptions {
  model: string;
  buildInput: TextToImageInputBuilder;
  extractResult?: TextToImageResultExtractor;
  onProgress?: (progress: number) => void;
}

/**
 * Text-to-Image Executor using Template Method pattern
 * Eliminates code duplication through BaseExecutor
 */
class TextToImageExecutor extends BaseExecutor<
  TextToImageRequest,
  TextToImageResult,
  ExtractedImageResult
> {
  constructor() {
    super("TextToImage");
  }

  protected validateRequest(request: TextToImageRequest): string | undefined {
    if (!request.prompt) {
      return "Prompt is required";
    }
    return undefined;
  }

  protected async executeProvider(
    provider: IAIProvider,
    model: string,
    input: Record<string, unknown>,
  ): Promise<unknown> {
    return provider.run(model, input);
  }

  protected validateExtractedResult(
    extracted: ExtractedImageResult | undefined,
  ): string | undefined {
    if (!extracted?.imageUrl) {
      return "No image in response";
    }
    return undefined;
  }

  protected transformResult(
    extracted: ExtractedImageResult,
  ): TextToImageResult {
    return {
      success: true,
      imageUrl: extracted.imageUrl,
      imageUrls: extracted.imageUrls,
    };
  }

  protected getDefaultExtractor(): (
    result: unknown,
  ) => ExtractedImageResult | undefined {
    return defaultExtractImageResult;
  }
}

// Singleton instance
const executor = new TextToImageExecutor();

/**
 * Execute text-to-image generation
 * Public API
 */
export async function executeTextToImage(
  request: TextToImageRequest,
  options: ExecuteTextToImageOptions,
): Promise<TextToImageResult> {
  const result: Result<TextToImageResult, string> = await executor.execute(
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
 * Check if text-to-image is supported
 * Public API
 */
export function hasTextToImageSupport(): boolean {
  return executor.hasSupport();
}
