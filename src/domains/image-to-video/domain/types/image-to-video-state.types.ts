/**
 * Image-to-Video State Types
 */

export interface ImageToVideoFeatureState {
  imageUri: string | null;
  motionPrompt: string;
  videoUrl: string | null;
  thumbnailUrl: string | null;
  isProcessing: boolean;
  progress: number;
  error: string | null;
}

export interface ImageToVideoTranslations {
  uploadTitle: string;
  uploadSubtitle: string;
  motionPromptPlaceholder: string;
  generateButtonText: string;
  processingText: string;
  successText: string;
  saveButtonText: string;
  tryAnotherText: string;
}
