/**
 * Image-to-Video Feature Types
 * Request, Result, Config types for image-to-video generation
 */

export interface ImageToVideoOptions {
  duration?: number;
  motionStrength?: number;
  aspectRatio?: "16:9" | "9:16" | "1:1";
  fps?: number;
}

export interface ImageToVideoRequest {
  imageUri: string;
  imageBase64?: string;
  userId: string;
  motionPrompt?: string;
  options?: ImageToVideoOptions;
}

export interface ImageToVideoResult {
  success: boolean;
  videoUrl?: string;
  thumbnailUrl?: string;
  error?: string;
  requestId?: string;
}

export interface ImageToVideoFeatureState {
  imageUri: string | null;
  motionPrompt: string;
  videoUrl: string | null;
  thumbnailUrl: string | null;
  isProcessing: boolean;
  progress: number;
  error: string | null;
}

export interface ImageToVideoTranslations {
  uploadTitle: string;
  uploadSubtitle: string;
  motionPromptPlaceholder: string;
  generateButtonText: string;
  processingText: string;
  successText: string;
  saveButtonText: string;
  tryAnotherText: string;
}

export type ImageToVideoInputBuilder = (
  imageBase64: string,
  motionPrompt?: string,
  options?: ImageToVideoOptions,
) => Record<string, unknown>;

export type ImageToVideoResultExtractor = (
  result: unknown,
) => { videoUrl?: string; thumbnailUrl?: string } | undefined;

export interface ImageToVideoFeatureConfig {
  providerId?: string;
  creditCost?: number;
  model: string;
  buildInput: ImageToVideoInputBuilder;
  extractResult?: ImageToVideoResultExtractor;
  prepareImage: (imageUri: string) => Promise<string>;
  onImageSelect?: (uri: string) => void;
  onProcessingStart?: () => void;
  onProcessingComplete?: (result: ImageToVideoResult) => void;
  onError?: (error: string) => void;
}
