/**
 * Multi-Image Generation Executor
 * Handles image generation with multiple input images (e.g., baby prediction)
 * Sends image_urls array as required by FAL AI nano-banana/edit model
 */

import { validateProvider } from "../utils/provider-validator.util";
import { formatBase64 } from "../utils/base64.util";
import { validateURL } from "../validation/base-validator";
import { env } from "../config/env.config";

declare const __DEV__: boolean;

/** Generation timeout in milliseconds */
const GENERATION_TIMEOUT_MS = env.generationMultiImageTimeoutMs;

/** Default model input values */
const MODEL_INPUT_DEFAULTS = {
  aspectRatio: "1:1",
  outputFormat: "jpeg",
  numImages: 1,
  enableSafetyChecker: false,
} as const;

export interface MultiImageGenerationInput {
  /** Base64 encoded images */
  readonly photos: readonly string[];
  /** Complete prompt for generation */
  readonly prompt: string;
  /** AI model to use */
  readonly model: string;
  /** Aspect ratio (default: "1:1") */
  readonly aspectRatio?: string;
  /** Output format (default: "jpeg") */
  readonly outputFormat?: string;
}

export interface MultiImageGenerationResult {
  readonly success: boolean;
  readonly imageUrl?: string;
  readonly error?: string;
}

/**
 * Execute image generation with multiple input images
 * Sends image_urls array as required by FAL AI API
 */
export async function executeMultiImageGeneration(
  input: MultiImageGenerationInput,
): Promise<MultiImageGenerationResult> {
  const validation = validateProvider("MultiImageExecutor");
  if (!validation.success) {
    return { success: false, error: ("error" in validation ? validation.error : "Provider validation failed") };
  }
  const provider = validation.provider;

  try {
    const imageUrls = input.photos.map(formatBase64);

    if (typeof __DEV__ !== "undefined" && __DEV__) {
      console.log("[MultiImageExecutor] Generation started", {
        imageCount: imageUrls.length,
        hasModel: !!input.model,
        hasPrompt: !!input.prompt,
        timestamp: new Date().toISOString(),
      });
    }

    const modelInput: Record<string, unknown> = {
      prompt: input.prompt,
      image_urls: imageUrls,
      aspect_ratio: input.aspectRatio ?? MODEL_INPUT_DEFAULTS.aspectRatio,
      output_format: input.outputFormat ?? MODEL_INPUT_DEFAULTS.outputFormat,
      num_images: MODEL_INPUT_DEFAULTS.numImages,
      enable_safety_checker: MODEL_INPUT_DEFAULTS.enableSafetyChecker,
    };

    const result = await provider.subscribe(input.model, modelInput, {
      timeoutMs: GENERATION_TIMEOUT_MS,
    });

    const rawResult = result as Record<string, unknown>;
    const data = rawResult?.data ?? rawResult;

    // Type-safe extraction of image URL
    if (data && typeof data === "object" && "images" in data) {
      const images = (data as { images?: unknown }).images;
      if (Array.isArray(images) && images.length > 0) {
        const firstImage = images[0];
        if (firstImage && typeof firstImage === "object" && "url" in firstImage) {
          const imageUrl = (firstImage as { url?: unknown }).url;
          if (typeof imageUrl === "string" && imageUrl.length > 0) {
            // Validate URL for security
            const urlValidation = validateURL(imageUrl);
            if (!urlValidation.isValid) {
              return {
                success: false,
                error: `Invalid image URL received: ${urlValidation.errors.join(", ")}`
              };
            }
            return { success: true, imageUrl };
          }
        }
      }
    }

    return { success: false, error: "No image generated" };
  } catch (error) {
    const message = error instanceof Error ? error.message : "Generation failed";
    if (typeof __DEV__ !== "undefined" && __DEV__) {
      console.error("[MultiImageExecutor] Error:", message);
    }
    return { success: false, error: message };
  }
}
