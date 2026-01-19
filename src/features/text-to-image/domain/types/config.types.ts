/**
 * Text-to-Image Configuration Types
 * Callback and configuration types for app integration
 */

import type {
  AspectRatio,
  ImageSize,
  NumImages,
  OutputFormat,
  StyleOption,
  TextToImageFormDefaults,
} from "./form.types";

export interface TextToImageGenerationRequest {
  prompt: string;
  model?: string;
  aspectRatio: AspectRatio;
  size: ImageSize;
  negativePrompt?: string;
  guidanceScale: number;
  numImages: NumImages;
  style?: string;
  outputFormat?: OutputFormat;
}

export interface TextToImageGenerationResultSuccess {
  success: true;
  imageUrls: string[];
}

export interface TextToImageGenerationResultError {
  success: false;
  error: string;
}

export type TextToImageGenerationResult =
  | TextToImageGenerationResultSuccess
  | TextToImageGenerationResultError;

export interface TextToImageCallbacks {
  /** User ID for orchestrator - required for credit deduction */
  userId: string | null;
  executeGeneration: (
    request: TextToImageGenerationRequest,
  ) => Promise<TextToImageGenerationResult>;
  calculateCost: (numImages: NumImages, model?: string | null) => number;
  canAfford: (cost: number) => boolean;
  isAuthenticated: () => boolean;
  onAuthRequired?: () => void;
  onCreditsRequired?: (cost: number) => void;
  onSuccess?: (imageUrls: string[]) => void;
  onError?: (error: string) => void;
}

export interface TextToImageFormConfig {
  defaults?: TextToImageFormDefaults;
  numImagesOptions?: NumImages[];
  styleOptions?: StyleOption[];
  aspectRatioOptions?: { value: AspectRatio; label: string }[];
  sizeOptions?: { value: ImageSize; label: string }[];
  outputFormatOptions?: { value: OutputFormat; label: string }[];
}

export interface TextToImageTranslations {
  promptLabel: string;
  promptPlaceholder: string;
  promptCharacterCount?: string;
  examplesLabel: string;
  numImagesLabel: string;
  styleLabel: string;
  generateButton: string;
  generateButtonMultiple?: string;
  costLabel?: string;
  settingsTitle?: string;
  doneButton?: string;
}
