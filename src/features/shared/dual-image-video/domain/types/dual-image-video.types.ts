/**
 * Dual Image Video Feature Types
 * Shared types for video features that take two images (ai-hug, ai-kiss, etc.)
 * DRY: Consolidates common types from ai-hug and ai-kiss features
 */

import type { VideoFeatureType } from "../../../../../domain/interfaces/ai-provider.interface";

export interface DualImageVideoFeatureState {
  sourceImageUri: string | null;
  targetImageUri: string | null;
  processedVideoUrl: string | null;
  isProcessing: boolean;
  progress: number;
  error: string | null;
}

export interface DualImageVideoResult {
  success: boolean;
  videoUrl?: string;
  error?: string;
  requestId?: string;
  creationId?: string;
}

export interface DualImageVideoProcessingStartData {
  creationId: string;
  featureType: string;
  sourceImageUri: string;
  targetImageUri: string;
}

export type DualImageVideoResultExtractor = (result: unknown) => string | undefined;

export interface DualImageVideoFeatureConfig {
  creditCost?: number;
  extractResult?: DualImageVideoResultExtractor;
  prepareImage: (imageUri: string) => Promise<string>;
  onSourceImageSelect?: (uri: string) => void;
  onTargetImageSelect?: (uri: string) => void;
  /** Called when processing starts - use to create Firestore doc with "processing" status */
  onProcessingStart?: (data: DualImageVideoProcessingStartData) => void;
  /** Called when processing completes - use to update Firestore doc with result */
  onProcessingComplete?: (result: DualImageVideoResult) => void;
  /** Called on error - use to update Firestore doc with "failed" status */
  onError?: (error: string, creationId?: string) => void;
}

export interface DualImageVideoTranslations {
  sourceUploadTitle: string;
  sourceUploadSubtitle: string;
  targetUploadTitle: string;
  targetUploadSubtitle: string;
  uploadChange: string;
  uploadAnalyzing: string;
  description: string;
  processingText: string;
  processButtonText: string;
  successText: string;
  saveButtonText: string;
  tryAnotherText: string;
}

export interface UseDualImageVideoFeatureProps {
  featureType: VideoFeatureType;
  config: DualImageVideoFeatureConfig;
  onSelectSourceImage: () => Promise<string | null>;
  onSelectTargetImage: () => Promise<string | null>;
  onSaveVideo: (videoUrl: string) => Promise<void>;
  /** Called before processing starts. Return false to cancel. */
  onBeforeProcess?: () => Promise<boolean>;
}

export interface UseDualImageVideoFeatureReturn extends DualImageVideoFeatureState {
  selectSourceImage: () => Promise<void>;
  selectTargetImage: () => Promise<void>;
  process: () => Promise<void>;
  save: () => Promise<void>;
  reset: () => void;
}
