/**
 * Text-to-Image Executor Types
 */

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
