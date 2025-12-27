/**
 * Text-to-Voice Config Types
 * Feature configuration types
 */

import type { TextToVoiceOptions, TextToVoiceResult } from "./generation.types";

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

export interface TextToVoiceExecuteOptions {
  model: string;
  buildInput: TextToVoiceInputBuilder;
  extractResult?: TextToVoiceResultExtractor;
  onProgress?: (progress: number) => void;
}
