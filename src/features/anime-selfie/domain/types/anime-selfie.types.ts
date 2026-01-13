/**
 * Anime Selfie Feature Types
 */

export type AnimeSelfieStyle = "anime" | "manga" | "cartoon" | "disney" | "pixar";

export interface AnimeSelfieResult {
  success: boolean;
  imageUrl?: string;
  imageBase64?: string;
  error?: string;
  requestId?: string;
  creationId?: string;
}

export interface AnimeSelfieFeatureState {
  imageUri: string | null;
  processedUrl: string | null;
  isProcessing: boolean;
  progress: number;
  error: string | null;
}

export interface AnimeSelfieTranslations {
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

export type AnimeSelfieResultExtractor = (result: unknown) => string | undefined;

export interface AnimeSelfieFeatureConfig {
  featureType: "anime-selfie";
  creditCost?: number;
  defaultStyle?: AnimeSelfieStyle;
  extractResult?: AnimeSelfieResultExtractor;
  prepareImage: (imageUri: string) => Promise<string>;
  onImageSelect?: (uri: string) => void;
  onProcessingStart?: (data: { creationId: string; imageUri: string }) => void;
  onProcessingComplete?: (result: AnimeSelfieResult) => void;
  onError?: (error: string, creationId?: string) => void;
}
