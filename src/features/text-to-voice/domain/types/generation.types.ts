/**
 * Text-to-Voice Generation Types
 * Request, result, and state types for voice generation
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
  model?: string;
  options?: TextToVoiceOptions;
}

export interface TextToVoiceResult {
  success: boolean;
  audioUrl?: string;
  error?: string;
  requestId?: string;
  duration?: number;
}

export interface TextToVoiceGenerationState {
  isGenerating: boolean;
  progress: number;
  audioUrl: string | null;
  error: string | null;
  requestId: string | null;
}

export interface VoiceGeneration {
  id: string;
  text: string;
  audioUrl: string;
  provider: string;
  createdAt: string;
}
