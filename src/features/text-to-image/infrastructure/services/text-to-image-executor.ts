/**
 * Text-to-Image Executor
 * Provider-agnostic text-to-image execution using Template Method pattern
 */

import { BaseExecutor } from "../../../../infrastructure/executors/base-executor";
import { isSuccess, type Result } from "../../../../domain/types/result.types";
import type {
  TextToImageRequest,
  TextToImageResult,
  TextToImageInputBuilder,
  TextToImageResultExtractor,
} from "../../domain/types";

/**
 * Options for text-to-image execution
 */
export interface ExecuteTextToImageOptions {
  model: string;
  buildInput: TextToImageInputBuilder;
  extractResult?: TextToImageResultExtractor;
  onProgress?: (progress: number) => void;
}

/**
 * Extracted result structure from provider response
 */
interface ExtractedImageResult {
  imageUrl?: string;
  imageUrls?: string[];
}

/**
 * Extract images from provider response object
 */
function extractImagesFromObject(
  obj: Record<string, unknown>,
): string[] | null {
  // Direct images array
  if (Array.isArray(obj.images)) {
    const urls = obj.images
      .map((img) => {
        if (typeof img === "string") return img;
        if (img && typeof img === "object" && "url" in img) {
          return (img as { url: string }).url;
        }
        return null;
      })
      .filter((url): url is string => url !== null);

    if (urls.length > 0) return urls;
  }
  return null;
}

/**
 * Default extractor for text-to-image results
 */
function defaultExtractResult(
  result: unknown,
): ExtractedImageResult | undefined {
  if (typeof result !== "object" || result === null) {
    return undefined;
  }

  const r = result as Record<string, unknown>;

  // Check nested 'data' object first (common API wrapper format)
  if (r.data && typeof r.data === "object") {
    const dataObj = r.data as Record<string, unknown>;
    const urls = extractImagesFromObject(dataObj);
    if (urls) {
      return { imageUrl: urls[0], imageUrls: urls };
    }
  }

  // Check direct 'images' array
  const directUrls = extractImagesFromObject(r);
  if (directUrls) {
    return { imageUrl: directUrls[0], imageUrls: directUrls };
  }

  // Check for imageUrl (data URL)
  if (typeof r.imageUrl === "string") {
    return { imageUrl: r.imageUrl, imageUrls: [r.imageUrl] };
  }

  // Fallback: construct data URL from imageBase64
  if (typeof r.imageBase64 === "string") {
    const mimeType = typeof r.mimeType === "string" ? r.mimeType : "image/png";
    const dataUrl = `data:${mimeType};base64,${r.imageBase64}`;
    return { imageUrl: dataUrl, imageUrls: [dataUrl] };
  }

  // Legacy: check for 'image' field
  if (typeof r.image === "string") {
    return { imageUrl: r.image, imageUrls: [r.image] };
  }

  return undefined;
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
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    provider: any,
    model: string,
    input: unknown,
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
    return defaultExtractResult;
  }
}

// Singleton instance
const executor = new TextToImageExecutor();

/**
 * Execute text-to-image generation
 * Public API maintained for backwards compatibility
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

  // Convert Result<T, E> back to legacy format for backwards compatibility
  if (isSuccess(result)) {
    return result.value;
  }
  return { success: false, error: result.error };
}

/**
 * Check if text-to-image is supported
 * Public API maintained for backwards compatibility
 */
export function hasTextToImageSupport(): boolean {
  return executor.hasSupport();
}
