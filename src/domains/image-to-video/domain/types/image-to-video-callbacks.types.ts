/**
 * Image-to-Video Callbacks Types
 */

import type { ImageToVideoResult } from "./image-to-video-result.types";

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
