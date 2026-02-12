/**
 * Text-to-Image Executor
 * Uses provider.run() for quick prompt-based image generation
 */

import type {
  GenerationExecutor,
  GenerationOptions,
} from "../../domain/generation.types";
import type { GenerationResult } from "../../../../domain/entities/generation.types";
import { providerRegistry } from "../../../../infrastructure/services/provider-registry.service";
import type { TextToImageInput, TextToImageOutput } from "./text-to-image-executor.types";
import { buildModelInput, extractResult } from "./text-to-image-executor.helpers";

declare const __DEV__: boolean;

export class TextToImageExecutor
  implements GenerationExecutor<TextToImageInput, TextToImageOutput>
{
  async generate(
    model: string,
    input: TextToImageInput,
    options?: GenerationOptions,
  ): Promise<GenerationResult<TextToImageOutput>> {
    try {
      if (typeof __DEV__ !== "undefined" && __DEV__) {
        console.log("[TextToImageExecutor] Starting", {
          model,
          promptLength: input.prompt?.length || 0,
          aspectRatio: input.aspectRatio,
          numImages: input.numImages,
        });
      }

      const provider = providerRegistry.getActiveProvider();

      if (!provider?.isInitialized()) {
        return { success: false, error: "AI provider not initialized" };
      }

      if (!input.prompt?.trim()) {
        return { success: false, error: "Prompt is required" };
      }

      options?.onProgress?.(10);

      const modelInput = buildModelInput(input);
      options?.onProgress?.(20);

      const result = await provider.run(model, modelInput);
      options?.onProgress?.(90);

      const extracted = extractResult(result);
      options?.onProgress?.(100);

      if (!extracted?.imageUrl) {
        return { success: false, error: "No image in response" };
      }

      if (typeof __DEV__ !== "undefined" && __DEV__) {
        console.log("[TextToImageExecutor] Success", {
          imageCount: extracted.imageUrls.length,
        });
      }

      return { success: true, data: extracted };
    } catch (error) {
      const message = error instanceof Error ? error.message : String(error);

      if (typeof __DEV__ !== "undefined" && __DEV__) {
        console.error("[TextToImageExecutor] Error:", message);
      }

      return { success: false, error: message };
    }
  }
}
