/**
 * Replace Background Feature Types
 * Request, Result, Config types for background replacement
 */

export type ReplaceBackgroundMode =
  | "replace"
  | "blur"
  | "creative-scene"
  | "solid-color";

export interface ReplaceBackgroundOptions {
  mode?: ReplaceBackgroundMode;
  prompt?: string;
  backgroundColor?: string;
  blurIntensity?: number;
}

export interface ReplaceBackgroundRequest {
  imageUri: string;
  imageBase64?: string;
  userId: string;
  prompt?: string;
  options?: ReplaceBackgroundOptions;
}

export interface ReplaceBackgroundResult {
  success: boolean;
  imageUrl?: string;
  imageBase64?: string;
  error?: string;
  requestId?: string;
}

export interface ReplaceBackgroundFeatureState {
  imageUri: string | null;
  prompt: string;
  processedUrl: string | null;
  isProcessing: boolean;
  progress: number;
  error: string | null;
  mode: ReplaceBackgroundMode;
}

export interface ReplaceBackgroundTranslations {
  uploadTitle: string;
  uploadSubtitle: string;
  uploadChange: string;
  uploadAnalyzing: string;
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

export type ReplaceBackgroundResultExtractor = (result: unknown) => string | undefined;

export interface ReplaceBackgroundFeatureConfig {
  creditCost?: number;
  defaultMode?: ReplaceBackgroundMode;
  extractResult?: ReplaceBackgroundResultExtractor;
  prepareImage: (imageUri: string) => Promise<string>;
  onImageSelect?: (uri: string) => void;
  onProcessingStart?: () => void;
  onProcessingComplete?: (result: ReplaceBackgroundResult) => void;
  onError?: (error: string) => void;
}
