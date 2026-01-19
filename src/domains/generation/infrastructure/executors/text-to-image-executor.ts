/**
 * Text-to-Image Executor
 * Uses provider.run() for quick prompt-based image generation
 */

import type {
  GenerationExecutor,
  GenerationOptions,
  GenerationResult,
} from "../../domain/generation.types";
import { providerRegistry } from "../../../../infrastructure/services/provider-registry.service";

declare const __DEV__: boolean;

export interface TextToImageInput {
  prompt: string;
  negativePrompt?: string;
  aspectRatio?: string;
  size?: string;
  numImages?: number;
  guidanceScale?: number;
  style?: string;
  outputFormat?: "jpeg" | "png" | "webp";
}

export interface TextToImageOutput {
  imageUrl: string;
  imageUrls: string[];
}

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

      const modelInput = this.buildModelInput(input);
      options?.onProgress?.(20);

      const result = await provider.run(model, modelInput);
      options?.onProgress?.(90);

      const extracted = this.extractResult(result);
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

  private buildModelInput(input: TextToImageInput): Record<string, unknown> {
    const {
      prompt,
      negativePrompt,
      aspectRatio,
      size,
      numImages,
      guidanceScale,
      style,
      outputFormat,
    } = input;

    let finalPrompt = prompt;
    if (style && style !== "none") {
      finalPrompt = `${prompt}, ${style} style`;
    }

    return {
      prompt: finalPrompt,
      ...(negativePrompt && { negative_prompt: negativePrompt }),
      ...(aspectRatio && { aspect_ratio: aspectRatio }),
      ...(size && { image_size: size }),
      ...(numImages && { num_images: numImages }),
      ...(guidanceScale && { guidance_scale: guidanceScale }),
      ...(outputFormat && { output_format: outputFormat }),
    };
  }

  private extractResult(
    result: unknown,
  ): { imageUrl: string; imageUrls: string[] } | undefined {
    if (typeof result !== "object" || result === null) {
      return undefined;
    }

    const r = result as Record<string, unknown>;

    // Check nested 'data' object
    if (r.data && typeof r.data === "object") {
      const urls = this.extractImagesFromObject(r.data as Record<string, unknown>);
      if (urls.length > 0) {
        return { imageUrl: urls[0], imageUrls: urls };
      }
    }

    // Check direct images array
    const directUrls = this.extractImagesFromObject(r);
    if (directUrls.length > 0) {
      return { imageUrl: directUrls[0], imageUrls: directUrls };
    }

    // Check for imageUrl
    if (typeof r.imageUrl === "string") {
      return { imageUrl: r.imageUrl, imageUrls: [r.imageUrl] };
    }

    // Fallback: base64
    if (typeof r.imageBase64 === "string") {
      const mimeType = typeof r.mimeType === "string" ? r.mimeType : "image/png";
      const dataUrl = `data:${mimeType};base64,${r.imageBase64}`;
      return { imageUrl: dataUrl, imageUrls: [dataUrl] };
    }

    return undefined;
  }

  private extractImagesFromObject(obj: Record<string, unknown>): string[] {
    if (!Array.isArray(obj.images)) {
      return [];
    }

    return obj.images
      .map((img) => {
        if (typeof img === "string") return img;
        if (img && typeof img === "object" && "url" in img) {
          return (img as { url: string }).url;
        }
        return null;
      })
      .filter((url): url is string => url !== null);
  }
}
