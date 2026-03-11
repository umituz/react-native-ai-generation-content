/**
 * Image Generation Executor
 * Handles the actual image generation execution
 */

import type { WizardImageInput } from "./image-generation.types";
import {
  GENERATION_TIMEOUT_MS,
  BASE64_IMAGE_PREFIX,
  MODEL_INPUT_DEFAULTS,
} from "./wizard-strategy.constants";
import { createPhotorealisticPrompt } from "../../../../prompts/domain/base/creators";
import { addGenerationLogs, addGenerationLog, startGenerationLogSession } from "../../../../../infrastructure/services/generation-log-store";

interface ExecutionResult {
  success: boolean;
  imageUrl?: string;
  error?: string;
  logSessionId?: string;
}

function formatBase64(base64: string): string {
  return base64.startsWith("data:") ? base64 : `${BASE64_IMAGE_PREFIX}${base64}`;
}

export async function executeImageGeneration(
  input: WizardImageInput,
  model: string,
  onProgress?: (progress: number) => void,
  providerId?: string,
): Promise<ExecutionResult> {
  const TAG = 'ImageExecutor';
  const startTime = Date.now();
  const sid = startGenerationLogSession();
  const { resolveProvider } = await import("../../../../../infrastructure/services/provider-resolver");

  let provider;
  try {
    provider = resolveProvider(providerId);
  } catch {
    addGenerationLog(sid, TAG, 'Provider not initialized!', 'error');
    return { success: false, error: "AI provider not initialized", logSessionId: sid };
  }

  try {
    const imageUrls = input.photos.map(formatBase64);

    // Photo-based: prompt is already complete (app builds it with Gemini analysis + scenario)
    // Text-only: wrap with photorealistic style
    const finalPrompt = imageUrls.length > 0
      ? input.prompt
      : createPhotorealisticPrompt(input.prompt, {
          includeIdentityPreservation: false,
          includePhotoRealism: true,
          includePoseGuidelines: true,
        });

    const mode = imageUrls.length > 0 ? "Photo-based" : "Text-to-image";
    const totalImageSize = imageUrls.reduce((sum, url) => sum + url.length, 0);

    addGenerationLog(sid, TAG, `${mode} generation starting`, 'info', {
      model,
      photoCount: imageUrls.length,
      totalImageSizeKB: Math.round(totalImageSize / 1024),
      promptLength: finalPrompt.length,
      timeout: GENERATION_TIMEOUT_MS,
    });
    addGenerationLog(sid, TAG, `Prompt: ${finalPrompt.substring(0, 300)}${finalPrompt.length > 300 ? "..." : ""}`);

    const modelInput: Record<string, unknown> = {
      prompt: finalPrompt,
      aspect_ratio: MODEL_INPUT_DEFAULTS.aspectRatio,
      output_format: MODEL_INPUT_DEFAULTS.outputFormat,
      num_images: MODEL_INPUT_DEFAULTS.numImages,
      enable_safety_checker: MODEL_INPUT_DEFAULTS.enableSafetyChecker,
    };

    // nano-banana/edit uses image_urls (array) for both single and multi-image
    if (imageUrls.length > 0) {
      modelInput.image_urls = imageUrls;
    }

    addGenerationLog(sid, TAG, 'Calling provider.subscribe()...');
    const result = await provider.subscribe(model, modelInput, {
      timeoutMs: GENERATION_TIMEOUT_MS,
      onQueueUpdate: (status) => {
        addGenerationLog(sid, TAG, `Queue: ${status.status}`);
      },
    });

    // Collect provider logs — use providerSessionId for concurrent safety
    const providerSessionId = (result as { __providerSessionId?: string })?.__providerSessionId;
    const providerLogs = provider.endLogSession?.(providerSessionId) ?? provider.getSessionLogs?.(providerSessionId) ?? [];
    addGenerationLogs(sid, providerLogs);

    const rawResult = result as Record<string, unknown>;
    const data = (rawResult?.data ?? rawResult) as { images?: Array<{ url: string }> };
    const imageUrl = data?.images?.[0]?.url;

    const elapsed = Date.now() - startTime;
    onProgress?.(100);

    if (imageUrl) {
      addGenerationLog(sid, TAG, `Generation SUCCESS in ${elapsed}ms`, 'info', { imageUrl, elapsed });
      return { success: true, imageUrl, logSessionId: sid };
    }

    addGenerationLog(sid, TAG, `No image in response after ${elapsed}ms`, 'error', {
      responseKeys: Object.keys(data || {}),
      elapsed,
    });
    return { success: false, error: "No image generated", logSessionId: sid };
  } catch (error) {
    // Collect provider logs even on failure — no providerSessionId available in catch
    const providerLogs = provider.endLogSession?.() ?? [];
    addGenerationLogs(sid, providerLogs);

    const elapsed = Date.now() - startTime;
    const errorMsg = error instanceof Error ? error.message : "Generation failed";
    addGenerationLog(sid, TAG, `Generation FAILED after ${elapsed}ms: ${errorMsg}`, 'error', { elapsed });
    return { success: false, error: errorMsg, logSessionId: sid };
  }
}
