/**
 * Upscale Feature Types
 * Request, Result, Config types for upscaling
 */

export type UpscaleScaleFactor = 2 | 4 | 8;

export interface UpscaleOptions {
  scaleFactor?: UpscaleScaleFactor;
  enhanceFaces?: boolean;
}

export interface UpscaleRequest {
  imageUri: string;
  imageBase64?: string;
  userId: string;
  options?: UpscaleOptions;
}

export interface UpscaleResult {
  success: boolean;
  imageUrl?: string;
  imageBase64?: string;
  error?: string;
  requestId?: string;
}

export interface UpscaleFeatureState {
  imageUri: string | null;
  processedUrl: string | null;
  isProcessing: boolean;
  progress: number;
  error: string | null;
}

export interface UpscaleTranslations {
  uploadTitle: string;
  uploadSubtitle: string;
  uploadChange: string;
  uploadAnalyzing: string;
  description: string;
  processingText: string;
  processButtonText: string;
  successText: string;
  saveButtonText: string;
  tryAnotherText: string;
  beforeLabel?: string;
  afterLabel?: string;
  compareHint?: string;
}

export type UpscaleResultExtractor = (
  result: unknown,
) => string | undefined;

export interface UpscaleFeatureConfig {
  defaultScaleFactor?: UpscaleScaleFactor;
  creditCost?: number;
  extractResult?: UpscaleResultExtractor;
  prepareImage: (imageUri: string) => Promise<string>;
  onImageSelect?: (uri: string) => void;
  onProcessingStart?: () => void;
  onProcessingComplete?: (result: UpscaleResult) => void;
  onError?: (error: string) => void;
}
