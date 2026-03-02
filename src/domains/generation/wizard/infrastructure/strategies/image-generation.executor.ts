/**
 * Image Generation Executor
 * Handles the actual image generation execution
 */

import { buildUnifiedPrompt } from "./shared/unified-prompt-builder";
import type { WizardImageInput } from "./image-generation.types";
import {
  GENERATION_TIMEOUT_MS,
  BASE64_IMAGE_PREFIX,
  DEFAULT_STYLE_VALUE,
  MODEL_INPUT_DEFAULTS,
} from "./wizard-strategy.constants";
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

function buildFinalPrompt(input: WizardImageInput, imageUrls: string[]): string {
  const hasPhotos = imageUrls.length > 0;

  if (hasPhotos) {
    // Custom prompt type means app provides complete prompt - skip identity preservation
    const skipIdentityPreservation = input.promptType === "custom";

    return buildUnifiedPrompt({
      basePrompt: input.prompt,
      photoCount: imageUrls.length,
      interactionStyle: input.interactionStyle,
      skipIdentityPreservation,
    });
  }

  // Text-to-image with optional style
  if (input.style && input.style !== DEFAULT_STYLE_VALUE) {
    return `${input.prompt}. Style: ${input.style}`;
  }

  return input.prompt;
}

export async function executeImageGeneration(
  input: WizardImageInput,
  model: string,
  onProgress?: (progress: number) => void,
): Promise<ExecutionResult> {
  const TAG = 'ImageExecutor';
  const startTime = Date.now();
  const sid = startGenerationLogSession();
  const { providerRegistry } = await import("../../../../../infrastructure/services/provider-registry.service");

  const provider = providerRegistry.getActiveProvider();
  if (!provider?.isInitialized()) {
    addGenerationLog(sid, TAG, 'Provider not initialized!', 'error');
    return { success: false, error: "AI provider not initialized", logSessionId: sid };
  }

  try {
    const imageUrls = input.photos.map(formatBase64);
    const finalPrompt = buildFinalPrompt(input, imageUrls);
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

    let lastStatus = "";
    addGenerationLog(sid, TAG, 'Calling provider.subscribe()...');
    const result = await provider.subscribe(model, modelInput, {
      timeoutMs: GENERATION_TIMEOUT_MS,
      onQueueUpdate: (status) => {
        if (status.status !== lastStatus) {
          lastStatus = status.status;
        }
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
