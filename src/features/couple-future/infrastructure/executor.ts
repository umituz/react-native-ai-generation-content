/**
 * Couple Future Executor
 * Multi-reference image generation using Nano Banana
 */

import { providerRegistry } from "../../../infrastructure/services/provider-registry.service";
import type { CoupleFutureInput, CoupleFutureConfig, CoupleFutureResult } from "../domain/types";
import { COUPLE_FUTURE_DEFAULTS } from "../domain/types";

declare const __DEV__: boolean;

const formatBase64 = (base64: string): string => {
  if (!base64) return "";
  return base64.startsWith("data:") ? base64 : `data:image/jpeg;base64,${base64}`;
};

export async function executeCoupleFuture(
  input: CoupleFutureInput,
  config?: CoupleFutureConfig,
): Promise<CoupleFutureResult> {
  const provider = providerRegistry.getActiveProvider();

  if (!provider) {
    return { success: false, error: "No AI provider configured" };
  }

  if (!provider.isInitialized()) {
    return { success: false, error: "AI provider not initialized" };
  }

  const { onProgress, timeoutMs, aspectRatio, outputFormat } = config ?? {};
  let lastStatus = "";

  if (typeof __DEV__ !== "undefined" && __DEV__) {
    console.log("[CoupleFuture] Starting Nano Banana generation");
  }

  try {
    onProgress?.(5);

    const imageUrls = [input.partnerABase64, input.partnerBBase64]
      .filter(Boolean)
      .map(formatBase64);

    if (imageUrls.length < 2) {
      return { success: false, error: "Two reference images required" };
    }

    onProgress?.(10);

    const enhancedPrompt = `A photorealistic image of a couple. The first person @image1 and the second person @image2. ${input.prompt}. High quality, detailed, professional photography.`;

    const modelInput = {
      image_urls: imageUrls,
      prompt: enhancedPrompt,
      aspect_ratio: aspectRatio ?? COUPLE_FUTURE_DEFAULTS.aspectRatio,
      output_format: outputFormat ?? COUPLE_FUTURE_DEFAULTS.outputFormat,
      num_images: 1,
    };

    if (typeof __DEV__ !== "undefined" && __DEV__) {
      console.log("[CoupleFuture] Prompt:", enhancedPrompt);
    }

    const result = await provider.subscribe(COUPLE_FUTURE_DEFAULTS.model, modelInput, {
      timeoutMs: timeoutMs ?? COUPLE_FUTURE_DEFAULTS.timeoutMs,
      onQueueUpdate: (status) => {
        if (status.status === lastStatus) return;
        lastStatus = status.status;

        if (typeof __DEV__ !== "undefined" && __DEV__) {
          console.log("[CoupleFuture] Status:", status.status);
        }

        if (status.status === "IN_QUEUE") onProgress?.(20);
        else if (status.status === "IN_PROGRESS") onProgress?.(50);
      },
    });

    onProgress?.(90);

    const data = result as { images?: Array<{ url: string }> };
    const imageUrl = data?.images?.[0]?.url;

    onProgress?.(100);

    if (!imageUrl) {
      return { success: false, error: "No image generated" };
    }

    return { success: true, imageUrl };
  } catch (error) {
    const message = error instanceof Error ? error.message : "Generation failed";
    if (typeof __DEV__ !== "undefined" && __DEV__) {
      console.error("[CoupleFuture] Error:", message);
    }
    return { success: false, error: message };
  }
}
