/**
 * Text-to-Voice Form Types
 * Form state and setter types
 */

import type { TextToVoiceRequest } from "./generation.types";

export interface TextToVoiceFormState {
  text: string;
  model: string;
  voice: string;
  speed: number;
  stability: number;
  similarityBoost: number;
}

export interface TextToVoiceFormSetters {
  setText: (text: string) => void;
  setModel: (model: string) => void;
  setVoice: (voice: string) => void;
  setSpeed: (speed: number) => void;
  setStability: (stability: number) => void;
  setSimilarityBoost: (similarityBoost: number) => void;
}

export interface TextToVoiceFormReturn extends TextToVoiceFormSetters {
  formState: TextToVoiceFormState;
  buildRequest: () => TextToVoiceRequest;
  resetForm: () => void;
}

export interface TextToVoiceFormConfig {
  initialText?: string;
  initialModel?: string;
  initialVoice?: string;
  initialSpeed?: number;
  initialStability?: number;
  initialSimilarityBoost?: number;
}
