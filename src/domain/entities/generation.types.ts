/**
 * AI Generation Types
 * Core types for generation workflow
 */

export type GenerationCapability =
  | "text-to-image"
  | "image-to-image"
  | "text-to-video"
  | "image-to-video"
  | "text-to-voice"
  | "voice-to-text";

export type GenerationStatus =
  | "idle"
  | "preparing"
  | "moderating"
  | "submitting"
  | "generating"
  | "polling"
  | "finalizing"
  | "completed"
  | "failed";

export interface GenerationMetadata {
  model?: string;
  provider?: string;
  capability?: GenerationCapability;
  creditCost?: number;
  startTime?: number;
  endTime?: number;
  duration?: number;
}

export interface GenerationResult<T = unknown> {
  success: boolean;
  data?: T;
  error?: string;
  requestId?: string;
  metadata?: GenerationMetadata;
}

export interface GenerationProgress {
  stage: GenerationStatus;
  progress: number;
  message?: string;
  eta?: number;
}

export interface GenerationRequest {
  model: string;
  input: Record<string, unknown>;
  userId?: string;
  capability?: GenerationCapability;
  onProgress?: (progress: GenerationProgress) => void;
}
