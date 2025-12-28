/**
 * AI Kiss Feature Types
 * Request, Result, Config types for AI kiss video generation
 */

export interface AIKissOptions {
  style?: "romantic" | "cheek" | "forehead";
  preserveFaces?: boolean;
}

export interface AIKissRequest {
  sourceImageUri: string;
  targetImageUri: string;
  sourceImageBase64?: string;
  targetImageBase64?: string;
  userId: string;
  prompt?: string;
  options?: AIKissOptions;
}

export interface AIKissResult {
  success: boolean;
  videoUrl?: string;
  error?: string;
  requestId?: string;
}

export interface AIKissFeatureState {
  sourceImageUri: string | null;
  targetImageUri: string | null;
  processedVideoUrl: string | null;
  isProcessing: boolean;
  progress: number;
  error: string | null;
}

export interface AIKissTranslations {
  sourceUploadTitle: string;
  sourceUploadSubtitle: string;
  targetUploadTitle: string;
  targetUploadSubtitle: string;
  uploadChange: string;
  uploadAnalyzing: string;
  description: string;
  processingText: string;
  processButtonText: string;
  successText: string;
  saveButtonText: string;
  tryAnotherText: string;
}

export type AIKissResultExtractor = (result: unknown) => string | undefined;

export interface AIKissFeatureConfig {
  creditCost?: number;
  extractResult?: AIKissResultExtractor;
  prepareImage: (imageUri: string) => Promise<string>;
  onSourceImageSelect?: (uri: string) => void;
  onTargetImageSelect?: (uri: string) => void;
  onProcessingStart?: () => void;
  onProcessingComplete?: (result: AIKissResult) => void;
  onError?: (error: string) => void;
}
