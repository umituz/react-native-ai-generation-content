/**
 * Text-to-Voice Feature Types
 * Request, Result, Config types for text-to-voice generation
 */

export interface TextToVoiceOptions {
  voice?: string;
  speed?: number;
  pitch?: number;
  stability?: number;
  similarityBoost?: number;
}

export interface TextToVoiceRequest {
  text: string;
  userId: string;
  options?: TextToVoiceOptions;
}

export interface TextToVoiceResult {
  success: boolean;
  audioUrl?: string;
  error?: string;
  requestId?: string;
  duration?: number;
}

export interface TextToVoiceFeatureState {
  text: string;
  audioUrl: string | null;
  isProcessing: boolean;
  progress: number;
  error: string | null;
}

export interface TextToVoiceTranslations {
  textPlaceholder: string;
  generateButtonText: string;
  processingText: string;
  successText: string;
  playButtonText: string;
  saveButtonText: string;
  tryAnotherText: string;
}

export type TextToVoiceInputBuilder = (
  text: string,
  options?: TextToVoiceOptions,
) => Record<string, unknown>;

export type TextToVoiceResultExtractor = (
  result: unknown,
) => { audioUrl?: string; duration?: number } | undefined;

export interface TextToVoiceFeatureConfig {
  providerId?: string;
  creditCost?: number;
  model: string;
  buildInput: TextToVoiceInputBuilder;
  extractResult?: TextToVoiceResultExtractor;
  onTextChange?: (text: string) => void;
  onProcessingStart?: () => void;
  onProcessingComplete?: (result: TextToVoiceResult) => void;
  onError?: (error: string) => void;
}
