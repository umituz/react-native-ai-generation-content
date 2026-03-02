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
import { addGenerationLogs, addGenerationLog, startGenerationLogSession } from "../../../../infrastructure/services/generation-log-store";


export class ImageExecutor
  implements GenerationExecutor<ImageGenerationInput, ImageGenerationOutput>
{
  async generate(
    model: string,
    input: ImageGenerationInput,
    options?: GenerationOptions,
  ): Promise<GenerationResult<ImageGenerationOutput>> {
    const TAG = 'GenericImageExecutor';
    const startTime = Date.now();
    const sid = startGenerationLogSession();

    try {
      const totalImageSize = input.imageUrls?.reduce((sum, url) => sum + url.length, 0) ?? 0;
      addGenerationLog(sid, TAG, 'Starting generation', 'info', {
        model,
        imageCount: input.imageUrls?.length || 0,
        totalImageSizeKB: Math.round(totalImageSize / 1024),
        promptLength: input.prompt?.length || 0,
      });

      const provider = providerRegistry.getActiveProvider();

      if (!provider?.isInitialized()) {
        addGenerationLog(sid, TAG, 'Provider not initialized!', 'error');
        return { success: false, error: "AI provider not initialized" };
      }

      options?.onProgress?.(5);
      const modelInput = this.buildModelInput(input);
      addGenerationLog(sid, TAG, 'Model input prepared', 'info', {
        imageCount: modelInput.image_urls?.length || 0,
        aspectRatio: modelInput.aspect_ratio,
      });

      options?.onProgress?.(10);
      addGenerationLog(sid, TAG, 'Calling provider.subscribe()...');

      const result = await provider.subscribe(model, modelInput, {
        timeoutMs: options?.timeoutMs ?? env.generationImageTimeoutMs,
        onQueueUpdate: (status) => {
          if (status.status === "IN_QUEUE") {
            options?.onProgress?.(20);
          } else if (status.status === "IN_PROGRESS") {
            options?.onProgress?.(50);
          }
        },
      });

      // Collect provider logs — use providerSessionId for concurrent safety
      const providerSessionId = (result as { __providerSessionId?: string })?.__providerSessionId;
      const providerLogs = provider.endLogSession?.(providerSessionId) ?? provider.getSessionLogs?.(providerSessionId) ?? [];
      addGenerationLogs(sid, providerLogs);

      options?.onProgress?.(90);
      const imageUrl = this.extractImageUrl(result);
      const elapsed = Date.now() - startTime;

      if (!imageUrl) {
        addGenerationLog(sid, TAG, `No image URL in response after ${elapsed}ms`, 'error');
        return { success: false, error: "No image generated" };
      }

      options?.onProgress?.(100);
      addGenerationLog(sid, TAG, `Generation SUCCESS in ${elapsed}ms`, 'info', { imageUrl, elapsed });
      return { success: true, data: { imageUrl } };
    } catch (error) {
      // Collect provider logs even on failure — no providerSessionId available in catch
      const provider = providerRegistry.getActiveProvider();
      if (provider) {
        const providerLogs = provider.endLogSession?.() ?? [];
        addGenerationLogs(sid, providerLogs);
      }

      const elapsed = Date.now() - startTime;
      const message = error instanceof Error ? error.message : "Generation failed";
      addGenerationLog(sid, TAG, `Generation FAILED after ${elapsed}ms: ${message}`, 'error', { elapsed });
      return { success: false, error: message };
    }
  }

  private buildModelInput(input: ImageGenerationInput) {
    const { imageUrls, prompt, aspectRatio, outputFormat } = input;

    // Validate required prompt field
    if (!prompt || prompt.trim() === "") {
      throw new Error("Prompt is required for image generation");
    }

    const formattedUrls = imageUrls?.map((url) =>
      url.startsWith("data:") ? url : `data:image/jpeg;base64,${url}`,
    );

    return {
      ...(formattedUrls && formattedUrls.length > 0
        ? { image_urls: formattedUrls }
        : {}),
      prompt: prompt.trim(),
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
