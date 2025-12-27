/**
 * Face Swap Feature Types
 * Request, Result, Config types for face swap generation
 */

export interface FaceSwapOptions {
  enhanceFace?: boolean;
  preserveSkinTone?: boolean;
}

export interface FaceSwapRequest {
  sourceImageUri: string;
  targetImageUri: string;
  sourceImageBase64?: string;
  targetImageBase64?: string;
  userId: string;
  options?: FaceSwapOptions;
}

export interface FaceSwapResult {
  success: boolean;
  imageUrl?: string;
  imageBase64?: string;
  error?: string;
  requestId?: string;
}

export interface FaceSwapFeatureState {
  sourceImageUri: string | null;
  targetImageUri: string | null;
  processedUrl: string | null;
  isProcessing: boolean;
  progress: number;
  error: string | null;
}

export interface FaceSwapTranslations {
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

export type FaceSwapInputBuilder = (
  sourceBase64: string,
  targetBase64: string,
  options?: FaceSwapOptions,
) => Record<string, unknown>;

export type FaceSwapResultExtractor = (result: unknown) => string | undefined;

export interface FaceSwapFeatureConfig {
  providerId?: string;
  creditCost?: number;
  model: string;
  buildInput: FaceSwapInputBuilder;
  extractResult?: FaceSwapResultExtractor;
  prepareImage: (imageUri: string) => Promise<string>;
  onSourceImageSelect?: (uri: string) => void;
  onTargetImageSelect?: (uri: string) => void;
  onProcessingStart?: () => void;
  onProcessingComplete?: (result: FaceSwapResult) => void;
  onError?: (error: string) => void;
}
