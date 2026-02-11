/**
 * Image-to-Video Feature Types
 * Request, Result, Config types for image-to-video generation
 */

import type { AnimationStyleId } from "./animation.types";
import type { MusicMoodId } from "./music.types";
import type { VideoDuration } from "./duration.types";

export interface ImageToVideoOptions {
  duration?: number;
  motionStrength?: number;
  aspectRatio?: "16:9" | "9:16" | "1:1";
  fps?: number;
  animationStyle?: AnimationStyleId;
  musicMood?: MusicMoodId;
}

export interface ImageToVideoGenerateParams extends ImageToVideoOptions {
  imageUri?: string;
  motionPrompt?: string;
}

export interface ImageToVideoRequest {
  imageUri: string;
  imageBase64?: string;
  userId: string;
  motionPrompt?: string;
  options?: ImageToVideoOptions;
  allImages?: string[];
  customAudioUri?: string | null;
  animationStyle?: AnimationStyleId;
  duration?: VideoDuration;
  musicMood?: MusicMoodId;
  model?: string;
}

export interface ImageToVideoResult {
  success: boolean;
  videoUrl?: string;
  thumbnailUrl?: string;
  error?: string;
  requestId?: string;
}

export interface ImageToVideoGenerationState {
  isGenerating: boolean;
  progress: number;
  error: string | null;
}

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

export type ImageToVideoInputBuilder = (
  imageBase64: string,
  motionPrompt?: string,
  options?: ImageToVideoOptions,
) => Record<string, unknown>;

export type ImageToVideoResultExtractor = (
  result: unknown,
) => { videoUrl?: string; thumbnailUrl?: string } | undefined;

export interface ImageToVideoFeatureCallbacks {
  onCreditCheck?: (cost: number) => Promise<boolean>;
  onCreditDeduct?: (cost: number) => Promise<void>;
  onAuthCheck?: () => boolean;
  onShowPaywall?: (creditCost: number) => void;
  onGenerationStart?: (data: ImageToVideoGenerationStartData) => Promise<void>;
  onCreationSave?: (data: ImageToVideoCreationData) => Promise<void>;
  onGenerate?: (result: ImageToVideoResult) => void;
  onProgress?: (progress: number) => void;
  onError?: (error: string) => void;
}

export interface ImageToVideoGenerationStartData {
  creationId: string;
  type: string;
  imageUri: string;
  metadata?: Record<string, unknown>;
}

export interface ImageToVideoCreationData {
  creationId: string;
  type: string;
  videoUrl: string;
  thumbnailUrl?: string;
  imageUri: string;
  metadata?: Record<string, unknown>;
}

export interface ImageToVideoFeatureConfig {
  providerId?: string;
  creditCost?: number;
  model: string;
  buildInput: ImageToVideoInputBuilder;
  extractResult?: ImageToVideoResultExtractor;
  prepareImage: (imageUri: string) => Promise<string>;
  onImageSelect?: (uri: string) => void;
  onProcessingStart?: () => void;
  onProcessingComplete?: (result: ImageToVideoResult) => void;
  onError?: (error: string) => void;
}
