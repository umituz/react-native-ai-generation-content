/**
 * Multi-Image Generation Executor
 * Handles image generation with multiple input images
 */

import { validateProvider } from "../utils/provider-validator.util";
import { formatBase64 } from "../utils/base64.util";
import { validateURL } from "../validation/base-validator";
import { env } from "../config/env.config";
import { addGenerationLogs, addGenerationLog, startGenerationLogSession } from "./generation-log-store";


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
  readonly logSessionId?: string;
}

/**
 * Execute image generation with multiple input images
 */
export async function executeMultiImageGeneration(
  input: MultiImageGenerationInput,
): Promise<MultiImageGenerationResult> {
  const TAG = 'MultiImageExecutor';
  const startTime = Date.now();
  const sid = startGenerationLogSession();

  const validation = validateProvider("MultiImageExecutor");
  if (!validation.success) {
    addGenerationLog(sid, TAG, 'Provider validation failed', 'error');
    return { success: false, error: ("error" in validation ? validation.error : "Provider validation failed"), logSessionId: sid };
  }
  const provider = validation.provider;

  try {
    const imageUrls = input.photos.map(formatBase64);
    const totalImageSize = imageUrls.reduce((sum, url) => sum + url.length, 0);

    addGenerationLog(sid, TAG, 'Generation starting', 'info', {
      model: input.model,
      imageCount: imageUrls.length,
      totalImageSizeKB: Math.round(totalImageSize / 1024),
      promptLength: input.prompt.length,
      timeout: GENERATION_TIMEOUT_MS,
    });

    const modelInput: Record<string, unknown> = {
      prompt: input.prompt,
      image_urls: imageUrls,
      aspect_ratio: input.aspectRatio ?? MODEL_INPUT_DEFAULTS.aspectRatio,
      output_format: input.outputFormat ?? MODEL_INPUT_DEFAULTS.outputFormat,
      num_images: MODEL_INPUT_DEFAULTS.numImages,
      enable_safety_checker: MODEL_INPUT_DEFAULTS.enableSafetyChecker,
    };

    addGenerationLog(sid, TAG, 'Calling provider.subscribe()...');
    const result = await provider.subscribe(input.model, modelInput, {
      timeoutMs: GENERATION_TIMEOUT_MS,
    });

    // Collect provider logs — use providerSessionId for concurrent safety
    const providerSessionId = (result as { __providerSessionId?: string })?.__providerSessionId;
    const providerLogs = provider.endLogSession?.(providerSessionId) ?? provider.getSessionLogs?.(providerSessionId) ?? [];
    addGenerationLogs(sid, providerLogs);

    const rawResult = result as Record<string, unknown>;
    const data = rawResult?.data ?? rawResult;

    if (data && typeof data === "object" && "images" in data) {
      const images = (data as { images?: unknown }).images;
      if (Array.isArray(images) && images.length > 0) {
        const firstImage = images[0];
        if (firstImage && typeof firstImage === "object" && "url" in firstImage) {
          const imageUrl = (firstImage as { url?: unknown }).url;
          if (typeof imageUrl === "string" && imageUrl.length > 0) {
            const urlValidation = validateURL(imageUrl);
            if (!urlValidation.isValid) {
              addGenerationLog(sid, TAG, `Invalid URL in response: ${urlValidation.errors.join(", ")}`, 'error');
              return {
                success: false,
                error: `Invalid image URL received: ${urlValidation.errors.join(", ")}`,
                logSessionId: sid,
              };
            }
            const elapsed = Date.now() - startTime;
            addGenerationLog(sid, TAG, `Generation SUCCESS in ${elapsed}ms`, 'info', { imageUrl, elapsed });
            return { success: true, imageUrl, logSessionId: sid };
          }
        }
      }
    }

    const elapsed = Date.now() - startTime;
    addGenerationLog(sid, TAG, `No image in response after ${elapsed}ms`, 'error', {
      dataKeys: data && typeof data === "object" ? Object.keys(data) : [],
      elapsed,
    });
    return { success: false, error: "No image generated", logSessionId: sid };
  } catch (error) {
    // Collect provider logs even on failure — no providerSessionId available in catch
    const providerLogs = provider.endLogSession?.() ?? [];
    addGenerationLogs(sid, providerLogs);

    const elapsed = Date.now() - startTime;
    const message = error instanceof Error ? error.message : "Generation failed";
    addGenerationLog(sid, TAG, `Generation FAILED after ${elapsed}ms: ${message}`, 'error', { elapsed });
    return { success: false, error: message, logSessionId: sid };
  }
}
