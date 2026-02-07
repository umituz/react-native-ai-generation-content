/**
 * Multi-Image Generation Executor
 * Handles image generation with multiple input images (e.g., baby prediction)
 * Sends image_urls array as required by FAL AI nano-banana/edit model
 */

import { validateProvider } from "../utils/provider-validator.util";
import { formatBase64 } from "../utils/base64.util";

declare const __DEV__: boolean;

/** Generation timeout in milliseconds (2 minutes) */
const GENERATION_TIMEOUT_MS = 120000;

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
    return { success: false, error: validation.error };
  }
  const provider = validation.provider;

  try {
    const imageUrls = input.photos.map(formatBase64);

    if (typeof __DEV__ !== "undefined" && __DEV__) {
      console.log("[MultiImageExecutor] Generation started", {
        imageCount: imageUrls.length,
        model: input.model,
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
    const data = (rawResult?.data ?? rawResult) as { images?: Array<{ url: string }> };
    const imageUrl = data?.images?.[0]?.url;

    return imageUrl
      ? { success: true, imageUrl }
      : { success: false, error: "No image generated" };
  } catch (error) {
    const message = error instanceof Error ? error.message : "Generation failed";
    if (typeof __DEV__ !== "undefined" && __DEV__) {
      console.error("[MultiImageExecutor] Error:", message);
    }
    return { success: false, error: message };
  }
}
