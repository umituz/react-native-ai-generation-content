/**
 * Text-to-Image Feature Types
 * Request, Result, Config types for text-to-image generation
 */

export interface TextToImageOptions {
  aspectRatio?: "16:9" | "9:16" | "1:1";
  size?: "512x512" | "768x768" | "1024x1024" | "1024x1792" | "1792x1024";
  numImages?: number;
  guidanceScale?: number;
  seed?: number;
}

export interface TextToImageRequest {
  prompt: string;
  userId: string;
  negativePrompt?: string;
  options?: TextToImageOptions;
}

export interface TextToImageResult {
  success: boolean;
  imageUrl?: string;
  imageUrls?: string[];
  error?: string;
  requestId?: string;
}

export interface TextToImageFeatureState {
  prompt: string;
  imageUrl: string | null;
  imageUrls: string[];
  isProcessing: boolean;
  progress: number;
  error: string | null;
}

export interface TextToImageTranslations {
  promptPlaceholder: string;
  generateButtonText: string;
  processingText: string;
  successText: string;
  saveButtonText: string;
  tryAnotherText: string;
}

export type TextToImageInputBuilder = (
  prompt: string,
  options?: TextToImageOptions,
) => Record<string, unknown>;

export type TextToImageResultExtractor = (
  result: unknown,
) => { imageUrl?: string; imageUrls?: string[] } | undefined;

export interface TextToImageFeatureConfig {
  providerId?: string;
  creditCost?: number;
  model: string;
  buildInput: TextToImageInputBuilder;
  extractResult?: TextToImageResultExtractor;
  onPromptChange?: (prompt: string) => void;
  onProcessingStart?: () => void;
  onProcessingComplete?: (result: TextToImageResult) => void;
  onError?: (error: string) => void;
}
