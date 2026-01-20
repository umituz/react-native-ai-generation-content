/**
 * Image Generation Executor
 * Handles the actual image generation execution
 */

import { buildFacePreservationPrompt } from "../../../../prompts/infrastructure/builders/face-preservation-builder";
import { buildInteractionStylePrompt } from "../../../../prompts/infrastructure/builders/interaction-style-builder";
import type { WizardImageInput } from "./image-generation.types";
import {
  GENERATION_TIMEOUT_MS,
  BASE64_IMAGE_PREFIX,
  DEFAULT_STYLE_VALUE,
  MODEL_INPUT_DEFAULTS,
} from "./wizard-strategy.constants";

declare const __DEV__: boolean;

interface ExecutionResult {
  success: boolean;
  imageUrl?: string;
  error?: string;
}

/**
 * Formats base64 string with proper data URI prefix
 */
function formatBase64(base64: string): string {
  return base64.startsWith("data:") ? base64 : `${BASE64_IMAGE_PREFIX}${base64}`;
}

/**
 * Builds the final prompt based on input type (photo-based or text-to-image)
 */
function buildFinalPrompt(input: WizardImageInput, imageUrls: string[]): string {
  const hasPhotos = imageUrls.length > 0;

  if (hasPhotos) {
    const facePrompt = buildFacePreservationPrompt({
      scenarioPrompt: input.prompt,
      personCount: imageUrls.length,
    });

    const interactionPrompt = buildInteractionStylePrompt({
      style: input.interactionStyle ?? "romantic",
      personCount: imageUrls.length,
    });

    return interactionPrompt ? `${facePrompt}\n\n${interactionPrompt}` : facePrompt;
  }

  // Text-to-image with optional style
  if (input.style && input.style !== DEFAULT_STYLE_VALUE) {
    return `${input.prompt}. Style: ${input.style}`;
  }

  return input.prompt;
}

/**
 * Executes image generation using the AI provider
 */
export async function executeImageGeneration(
  input: WizardImageInput,
  model: string,
  onProgress?: (progress: number) => void,
): Promise<ExecutionResult> {
  const { providerRegistry } = await import("../../../../../infrastructure/services/provider-registry.service");

  const provider = providerRegistry.getActiveProvider();
  if (!provider?.isInitialized()) {
    return { success: false, error: "AI provider not initialized" };
  }

  try {
    const imageUrls = input.photos.map(formatBase64);
    const finalPrompt = buildFinalPrompt(input, imageUrls);

    if (typeof __DEV__ !== "undefined" && __DEV__) {
      const mode = imageUrls.length > 0 ? "Photo-based" : "Text-to-image";
      console.log(`[ImageExecutor] ${mode} generation`, { personCount: imageUrls.length });
    }

    const modelInput: Record<string, unknown> = {
      prompt: finalPrompt,
      aspect_ratio: MODEL_INPUT_DEFAULTS.aspectRatio,
      output_format: MODEL_INPUT_DEFAULTS.outputFormat,
      num_images: MODEL_INPUT_DEFAULTS.numImages,
      enable_safety_checker: MODEL_INPUT_DEFAULTS.enableSafetyChecker,
    };

    if (imageUrls.length > 0) {
      modelInput.image_urls = imageUrls;
    }

    let lastStatus = "";
    const result = await provider.subscribe(model, modelInput, {
      timeoutMs: GENERATION_TIMEOUT_MS,
      onQueueUpdate: (status) => {
        if (status.status !== lastStatus) lastStatus = status.status;
      },
    });

    const rawResult = result as Record<string, unknown>;
    const data = (rawResult?.data ?? rawResult) as { images?: Array<{ url: string }> };
    const imageUrl = data?.images?.[0]?.url;

    onProgress?.(100);

    return imageUrl ? { success: true, imageUrl } : { success: false, error: "No image generated" };
  } catch (error) {
    return { success: false, error: error instanceof Error ? error.message : "Generation failed" };
  }
}
