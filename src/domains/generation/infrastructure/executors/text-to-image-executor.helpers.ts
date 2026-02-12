/**
 * Text-to-Image Executor Helpers
 */

import type { TextToImageInput, TextToImageOutput } from "./text-to-image-executor.types";

export function buildModelInput(input: TextToImageInput): Record<string, unknown> {
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

export function extractImagesFromObject(obj: Record<string, unknown>): string[] {
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

export function extractResult(result: unknown): TextToImageOutput | undefined {
  if (typeof result !== "object" || result === null) {
    return undefined;
  }

  const r = result as Record<string, unknown>;

  if (r.data && typeof r.data === "object") {
    const urls = extractImagesFromObject(r.data as Record<string, unknown>);
    if (urls.length > 0) {
      return { imageUrl: urls[0], imageUrls: urls };
    }
  }

  const directUrls = extractImagesFromObject(r);
  if (directUrls.length > 0) {
    return { imageUrl: directUrls[0], imageUrls: directUrls };
  }

  if (typeof r.imageUrl === "string") {
    return { imageUrl: r.imageUrl, imageUrls: [r.imageUrl] };
  }

  if (typeof r.imageBase64 === "string") {
    const mimeType = typeof r.mimeType === "string" ? r.mimeType : "image/png";
    const dataUrl = `data:${mimeType};base64,${r.imageBase64}`;
    return { imageUrl: dataUrl, imageUrls: [dataUrl] };
  }

  return undefined;
}
