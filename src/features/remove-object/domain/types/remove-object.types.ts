/**
 * Remove Object Feature Types
 * Types for object removal (inpainting)
 */

export interface RemoveObjectResult {
  success: boolean;
  imageUrl?: string;
  imageBase64?: string;
  error?: string;
  requestId?: string;
}

export interface RemoveObjectFeatureState {
  imageUri: string | null;
  maskUri: string | null;
  prompt: string;
  processedUrl: string | null;
  isProcessing: boolean;
  progress: number;
  error: string | null;
}

export interface RemoveObjectTranslations {
  uploadTitle: string;
  uploadSubtitle: string;
  uploadChange: string;
  uploadAnalyzing: string;
  maskTitle: string;
  maskSubtitle: string;
  promptPlaceholder: string;
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

export type RemoveObjectResultExtractor = (result: unknown) => string | undefined;

export interface RemoveObjectFeatureConfig {
  creditCost?: number;
  extractResult?: RemoveObjectResultExtractor;
  prepareImage: (imageUri: string) => Promise<string>;
  onImageSelect?: (uri: string) => void;
  onMaskSelect?: (uri: string) => void;
  onProcessingStart?: (data: { creationId: string; imageUri: string }) => void;
  onProcessingComplete?: (result: RemoveObjectResult & { creationId?: string }) => void;
  onError?: (error: string, creationId?: string) => void;
}
