/**
 * HD Touch Up Feature Types
 * Request, Result, Config types for HD enhancement
 */

export interface HDTouchUpOptions {
  enhanceQuality?: boolean;
  upscaleFactor?: 2 | 4;
  sharpen?: boolean;
}

export interface HDTouchUpRequest {
  imageUri: string;
  imageBase64?: string;
  userId: string;
  options?: HDTouchUpOptions;
}

export interface HDTouchUpResult {
  success: boolean;
  imageUrl?: string;
  imageBase64?: string;
  error?: string;
  requestId?: string;
}

export interface HDTouchUpFeatureState {
  imageUri: string | null;
  processedUrl: string | null;
  isProcessing: boolean;
  progress: number;
  error: string | null;
}

export interface HDTouchUpTranslations {
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

export type HDTouchUpResultExtractor = (result: unknown) => string | undefined;

export interface HDTouchUpFeatureConfig {
  creditCost?: number;
  extractResult?: HDTouchUpResultExtractor;
  prepareImage: (imageUri: string) => Promise<string>;
  onImageSelect?: (uri: string) => void;
  onProcessingStart?: () => void;
  onProcessingComplete?: (result: HDTouchUpResult) => void;
  onError?: (error: string) => void;
}
