/**
 * Image Generation Executor
 * Generic executor for all image generation features
 */

import type {
  GenerationExecutor,
  ImageGenerationInput,
  ImageGenerationOutput,
  GenerationOptions,
} from "../../domain/generation.types";
import type { GenerationResult } from "../../../../domain/entities/generation.types";
import { providerRegistry } from "../../../../infrastructure/services/provider-registry.service";
import { env } from "../../../../infrastructure/config/env.config";

declare const __DEV__: boolean;

export class ImageExecutor
  implements GenerationExecutor<ImageGenerationInput, ImageGenerationOutput>
{
  async generate(
    model: string,
    input: ImageGenerationInput,
    options?: GenerationOptions,
  ): Promise<GenerationResult<ImageGenerationOutput>> {
    try {
      if (typeof __DEV__ !== "undefined" && __DEV__) {
        console.log("[ImageExecutor] Starting generation", {
          model,
          hasImages: !!input.imageUrls,
          imageCount: input.imageUrls?.length || 0,
          promptLength: input.prompt?.length || 0,
        });
      }

      const provider = providerRegistry.getActiveProvider();

      if (!provider?.isInitialized()) {
        if (typeof __DEV__ !== "undefined" && __DEV__) {
          console.error("[ImageExecutor] Provider not initialized");
        }
        return { success: false, error: "AI provider not initialized" };
      }

      options?.onProgress?.(5);

      const modelInput = this.buildModelInput(input);

      if (typeof __DEV__ !== "undefined" && __DEV__) {
        console.log("[ImageExecutor] Model input prepared", {
          imageCount: modelInput.image_urls?.length || 0,
          aspectRatio: modelInput.aspect_ratio,
          outputFormat: modelInput.output_format,
        });
      }

      options?.onProgress?.(10);

      const result = await provider.subscribe(model, modelInput, {
        timeoutMs: options?.timeoutMs ?? env.generationImageTimeoutMs,
        onQueueUpdate: (status) => {
          if (typeof __DEV__ !== "undefined" && __DEV__) {
            console.log("[ImageExecutor] Queue status:", status.status);
          }

          if (status.status === "IN_QUEUE") {
            options?.onProgress?.(20);
          } else if (status.status === "IN_PROGRESS") {
            options?.onProgress?.(50);
          }
        },
      });

      options?.onProgress?.(90);

      const imageUrl = this.extractImageUrl(result);

      if (!imageUrl) {
        if (typeof __DEV__ !== "undefined" && __DEV__) {
          console.error("[ImageExecutor] No image URL in response");
        }
        return { success: false, error: "No image generated" };
      }

      options?.onProgress?.(100);

      if (typeof __DEV__ !== "undefined" && __DEV__) {
        console.log("[ImageExecutor] Generation successful", {
          imageUrl: imageUrl.slice(0, 100),
        });
      }

      return { success: true, data: { imageUrl } };
    } catch (error) {
      const message =
        error instanceof Error ? error.message : "Generation failed";

      if (typeof __DEV__ !== "undefined" && __DEV__) {
        console.error("[ImageExecutor] Generation error:", {
          message,
          error,
        });
      }

      return { success: false, error: message };
    }
  }

  private buildModelInput(input: ImageGenerationInput) {
    const { imageUrls, prompt, aspectRatio, outputFormat } = input;

    const formattedUrls = imageUrls?.map((url) =>
      url.startsWith("data:") ? url : `data:image/jpeg;base64,${url}`,
    );

    return {
      ...(formattedUrls && formattedUrls.length > 0
        ? { image_urls: formattedUrls }
        : {}),
      prompt,
      aspect_ratio: aspectRatio ?? "4:3",
      output_format: outputFormat ?? "jpeg",
      num_images: 1,
    };
  }

  private extractImageUrl(result: unknown): string | undefined {
    const rawResult = result as Record<string, unknown>;
    const data = (rawResult?.data ?? rawResult) as {
      images?: Array<{ url: string }>;
    };
    return data?.images?.[0]?.url;
  }
}
