/**
 * Video Generation Executor - Input Builder
 */

import type { WizardVideoInput } from "./video-generation.types";
import { BASE64_IMAGE_PREFIX } from "./wizard-strategy.constants";

/**
 * Format base64 string with data URI prefix if needed
 */
function formatBase64(base64: string | undefined): string | undefined {
  if (!base64) return undefined;
  return base64.startsWith("data:") ? base64 : `${BASE64_IMAGE_PREFIX}${base64}`;
}

/**
 * Generic input builder - used when no modelConfig is provided.
 * Sends standard parameters without model-specific logic.
 */
export function buildGenericInput(input: WizardVideoInput): Record<string, unknown> {
  const modelInput: Record<string, unknown> = { prompt: input.prompt };
  const sourceImage = formatBase64(input.sourceImageBase64);

  if (sourceImage && sourceImage.length > 0) {
    modelInput.image_url = sourceImage;
  }
  if (input.duration) {
    modelInput.duration = input.duration;
  }
  if (input.aspectRatio) {
    modelInput.aspect_ratio = input.aspectRatio;
  }
  if (input.resolution) {
    modelInput.resolution = input.resolution;
  }
  if (input.audioUrl) {
    modelInput.audio = input.audioUrl;
  }

  // Quality mode: "draft" → draft=true (faster, cheaper), "normal" → draft=false (higher quality)
  if (input.qualityMode === "draft" || input.qualityMode === "normal") {
    modelInput.draft = input.qualityMode === "draft";
  }

  return modelInput;
}
