/**
 * Image Generation Executor
 * Handles the actual image generation execution
 */

import type { WizardImageInput } from "./image-generation.types";
import type { ExecutionResult } from "./image-generation.executor.types";
import {
  GENERATION_TIMEOUT_MS,
  MODEL_INPUT_DEFAULTS,
} from "./wizard-strategy.constants";
import { createPhotorealisticPrompt } from "../../../../prompts/domain/base/creators";
import { addGenerationLogs, addGenerationLog, startGenerationLogSession } from "../../../../../infrastructure/services/generation-log-store";
import { formatBase64 } from "./image-generation.executor.utils";

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

    if (typeof __DEV__ !== "undefined" && __DEV__) {
      console.log("[ImageExecutor] ===== EXECUTION START =====");
      console.log("[ImageExecutor] Mode:", mode);
      console.log("[ImageExecutor] Model:", model);
      console.log("[ImageExecutor] Provider ID:", providerId);
      console.log("[ImageExecutor] ===== INPUT DATA =====");
      console.log("[ImageExecutor] Photo count:", imageUrls.length);
      console.log("[ImageExecutor] Total image size:", Math.round(totalImageSize / 1024), "KB");
      console.log("[ImageExecutor] Image sizes:", imageUrls.map((url, i) => `  Photo ${i + 1}: ${(url.length / 1024).toFixed(2)}KB`));
      console.log("[ImageExecutor] Aspect ratio:", input.aspectRatio || MODEL_INPUT_DEFAULTS.aspectRatio);
      console.log("[ImageExecutor] ===== PROMPT =====");
      console.log("[ImageExecutor] Prompt length:", finalPrompt.length);
      console.log("[ImageExecutor] Prompt preview:");
      console.log(finalPrompt.substring(0, 400) + "...");
      console.log("[ImageExecutor] ===== MODEL INPUT =====");
      console.log("[ImageExecutor] Model:", model);
      console.log("[ImageExecutor] Input keys:", Object.keys(MODEL_INPUT_DEFAULTS));
      console.log("[ImageExecutor] Output format:", MODEL_INPUT_DEFAULTS.outputFormat);
      console.log("[ImageExecutor] Num images:", MODEL_INPUT_DEFAULTS.numImages);
      console.log("[ImageExecutor] Safety checker:", MODEL_INPUT_DEFAULTS.enableSafetyChecker);
    }

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
      aspect_ratio: input.aspectRatio || MODEL_INPUT_DEFAULTS.aspectRatio,
    };

    if (imageUrls.length > 0) {
      modelInput.image_urls = imageUrls;
      modelInput.images = imageUrls;
    }

    if (typeof __DEV__ !== "undefined" && __DEV__) {
      console.log("[ImageExecutor] ===== MODEL INPUT CONSTRUCTED =====");
      console.log("[ImageExecutor] Input keys:", Object.keys(modelInput));
      console.log("[ImageExecutor] Has 'images':", "images" in modelInput, "(count:", Array.isArray(modelInput.images) ? modelInput.images.length : "N/A", ")");
      console.log("[ImageExecutor] Has 'image_urls':", "image_urls" in modelInput, "(count:", Array.isArray(modelInput.image_urls) ? modelInput.image_urls.length : "N/A", ")");
      console.log("[ImageExecutor] Images array length:", imageUrls.length);
      if (imageUrls.length > 0) {
        console.log("[ImageExecutor] First image preview:", imageUrls[0].substring(0, 80) + "...");
        console.log("[ImageExecutor] Last image preview:", imageUrls[imageUrls.length - 1].substring(0, 80) + "...");
      }
      console.log("[ImageExecutor] ===== CALLING PROVIDER =====");
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
