/**
 * Video Generation Executor
 * Generic executor for all video generation features
 */

import type {
  GenerationExecutor,
  VideoGenerationInput,
  VideoGenerationOutput,
  GenerationOptions,
  GenerationResult,
} from "../../domain/generation.types";
import { providerRegistry } from "../../../../infrastructure/services/provider-registry.service";

declare const __DEV__: boolean;

export class VideoExecutor
  implements GenerationExecutor<VideoGenerationInput, VideoGenerationOutput>
{
  async generate(
    model: string,
    input: VideoGenerationInput,
    options?: GenerationOptions,
  ): Promise<GenerationResult<VideoGenerationOutput>> {
    try {
      if (typeof __DEV__ !== "undefined" && __DEV__) {
        console.log("[VideoExecutor] Starting generation", {
          model,
          hasSourceImage: !!input.sourceImageBase64,
          hasTargetImage: !!input.targetImageBase64,
          hasPrompt: !!input.prompt,
        });
      }

      const provider = providerRegistry.getActiveProvider();

      if (!provider?.isInitialized()) {
        if (typeof __DEV__ !== "undefined" && __DEV__) {
          console.error("[VideoExecutor] Provider not initialized");
        }
        return { success: false, error: "AI provider not initialized" };
      }

      options?.onProgress?.(5);

      const modelInput = this.buildModelInput(input);

      if (typeof __DEV__ !== "undefined" && __DEV__) {
        console.log("[VideoExecutor] Model input prepared");
      }

      options?.onProgress?.(10);

      const result = await provider.subscribe(model, modelInput, {
        timeoutMs: options?.timeoutMs ?? 300000,
        onQueueUpdate: (status) => {
          if (typeof __DEV__ !== "undefined" && __DEV__) {
            console.log("[VideoExecutor] Queue status:", status.status);
          }

          if (status.status === "IN_QUEUE") {
            options?.onProgress?.(20);
          } else if (status.status === "IN_PROGRESS") {
            options?.onProgress?.(50);
          }
        },
      });

      options?.onProgress?.(90);

      const videoUrl = this.extractVideoUrl(result);

      if (!videoUrl) {
        if (typeof __DEV__ !== "undefined" && __DEV__) {
          console.error("[VideoExecutor] No video URL in response");
        }
        return { success: false, error: "No video generated" };
      }

      options?.onProgress?.(100);

      if (typeof __DEV__ !== "undefined" && __DEV__) {
        console.log("[VideoExecutor] Generation successful", {
          videoUrl: videoUrl.slice(0, 100),
        });
      }

      return { success: true, data: { videoUrl } };
    } catch (error) {
      const message =
        error instanceof Error ? error.message : "Generation failed";

      if (typeof __DEV__ !== "undefined" && __DEV__) {
        console.error("[VideoExecutor] Generation error:", {
          message,
          error,
        });
      }

      return { success: false, error: message };
    }
  }

  private buildModelInput(input: VideoGenerationInput) {
    const { sourceImageBase64, targetImageBase64, prompt } = input;

    const formatBase64 = (base64: string): string => {
      if (!base64) return "";
      return base64.startsWith("data:")
        ? base64
        : `data:image/jpeg;base64,${base64}`;
    };

    return {
      image_url: formatBase64(sourceImageBase64),
      ...(targetImageBase64
        ? { driver_image_url: formatBase64(targetImageBase64) }
        : {}),
      ...(prompt ? { prompt } : {}),
    };
  }

  private extractVideoUrl(result: unknown): string | undefined {
    const rawResult = result as Record<string, unknown>;
    const data = (rawResult?.data ?? rawResult) as {
      video?: { url: string };
    };
    return data?.video?.url;
  }
}
