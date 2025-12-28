/**
 * AI Hug Feature Types
 * Request, Result, Config types for AI hug video generation
 */

export interface AIHugOptions {
  intensity?: "gentle" | "warm" | "tight";
  preserveFaces?: boolean;
}

export interface AIHugRequest {
  sourceImageUri: string;
  targetImageUri: string;
  sourceImageBase64?: string;
  targetImageBase64?: string;
  userId: string;
  prompt?: string;
  options?: AIHugOptions;
}

export interface AIHugResult {
  success: boolean;
  videoUrl?: string;
  error?: string;
  requestId?: string;
}

export interface AIHugFeatureState {
  sourceImageUri: string | null;
  targetImageUri: string | null;
  processedVideoUrl: string | null;
  isProcessing: boolean;
  progress: number;
  error: string | null;
}

export interface AIHugTranslations {
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

export type AIHugResultExtractor = (result: unknown) => string | undefined;

export interface AIHugFeatureConfig {
  creditCost?: number;
  extractResult?: AIHugResultExtractor;
  prepareImage: (imageUri: string) => Promise<string>;
  onSourceImageSelect?: (uri: string) => void;
  onTargetImageSelect?: (uri: string) => void;
  onProcessingStart?: () => void;
  onProcessingComplete?: (result: AIHugResult) => void;
  onError?: (error: string) => void;
}
