/**
 * Text-to-Video Feature Types
 * Request, Result, Config types for text-to-video generation
 */

export interface TextToVideoOptions {
  duration?: number;
  fps?: number;
  guidanceScale?: number;
  aspectRatio?: "16:9" | "9:16" | "1:1";
}

export interface TextToVideoRequest {
  prompt: string;
  userId: string;
  negativePrompt?: string;
  options?: TextToVideoOptions;
}

export interface TextToVideoResult {
  success: boolean;
  videoUrl?: string;
  thumbnailUrl?: string;
  error?: string;
  requestId?: string;
}

export interface TextToVideoFeatureState {
  prompt: string;
  videoUrl: string | null;
  thumbnailUrl: string | null;
  isProcessing: boolean;
  progress: number;
  error: string | null;
}

export interface TextToVideoTranslations {
  promptPlaceholder: string;
  generateButtonText: string;
  processingText: string;
  successText: string;
  saveButtonText: string;
  tryAnotherText: string;
}

export type TextToVideoInputBuilder = (
  prompt: string,
  options?: TextToVideoOptions,
) => Record<string, unknown>;

export type TextToVideoResultExtractor = (
  result: unknown,
) => { videoUrl?: string; thumbnailUrl?: string } | undefined;

export interface TextToVideoFeatureConfig {
  providerId?: string;
  creditCost?: number;
  model: string;
  buildInput: TextToVideoInputBuilder;
  extractResult?: TextToVideoResultExtractor;
  onPromptChange?: (prompt: string) => void;
  onProcessingStart?: () => void;
  onProcessingComplete?: (result: TextToVideoResult) => void;
  onError?: (error: string) => void;
}
