/**
 * Photo Restore Feature Types
 * Request, Result, Config types for photo restoration
 */

export interface PhotoRestoreOptions {
  fixScratches?: boolean;
  enhanceFaces?: boolean;
  colorize?: boolean;
}

export interface PhotoRestoreRequest {
  imageUri: string;
  imageBase64?: string;
  userId: string;
  options?: PhotoRestoreOptions;
}

export interface PhotoRestoreResult {
  success: boolean;
  imageUrl?: string;
  imageBase64?: string;
  error?: string;
  requestId?: string;
}

export interface PhotoRestoreFeatureState {
  imageUri: string | null;
  processedUrl: string | null;
  isProcessing: boolean;
  progress: number;
  error: string | null;
}

export interface PhotoRestoreTranslations {
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

export type PhotoRestoreResultExtractor = (
  result: unknown,
) => string | undefined;

export interface PhotoRestoreFeatureConfig {
  creditCost?: number;
  extractResult?: PhotoRestoreResultExtractor;
  prepareImage: (imageUri: string) => Promise<string>;
  onImageSelect?: (uri: string) => void;
  onProcessingStart?: (data: { creationId: string; imageUri: string }) => void;
  onProcessingComplete?: (result: PhotoRestoreResult & { creationId?: string }) => void;
  onError?: (error: string, creationId?: string) => void;
}
