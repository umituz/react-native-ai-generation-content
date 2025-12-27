/**
 * Remove Background Feature Types
 * Request, Result, Config types for background removal
 */

export interface RemoveBackgroundOptions {
  refineEdges?: boolean;
  outputFormat?: "png" | "webp";
  backgroundColor?: string;
}

export interface RemoveBackgroundRequest {
  imageUri: string;
  imageBase64?: string;
  userId: string;
  options?: RemoveBackgroundOptions;
}

export interface RemoveBackgroundResult {
  success: boolean;
  imageUrl?: string;
  imageBase64?: string;
  error?: string;
  requestId?: string;
}

export interface RemoveBackgroundFeatureState {
  imageUri: string | null;
  processedUrl: string | null;
  isProcessing: boolean;
  progress: number;
  error: string | null;
}

export interface RemoveBackgroundTranslations {
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

export type RemoveBackgroundInputBuilder = (
  base64: string,
  options?: RemoveBackgroundOptions,
) => Record<string, unknown>;

export type RemoveBackgroundResultExtractor = (result: unknown) => string | undefined;

export interface RemoveBackgroundFeatureConfig {
  providerId?: string;
  creditCost?: number;
  model: string;
  buildInput: RemoveBackgroundInputBuilder;
  extractResult?: RemoveBackgroundResultExtractor;
  prepareImage: (imageUri: string) => Promise<string>;
  onImageSelect?: (uri: string) => void;
  onProcessingStart?: () => void;
  onProcessingComplete?: (result: RemoveBackgroundResult) => void;
  onError?: (error: string) => void;
}
