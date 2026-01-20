/**
 * Image-to-Video Feature Types
 * Types, interfaces, and constants for the image-to-video feature hook
 */

import type {
  ImageToVideoFeatureState,
  ImageToVideoFeatureConfig,
  ImageToVideoResult,
  ImageToVideoFeatureCallbacks,
  ImageToVideoGenerateParams,
} from "../../domain/types";
import type { AlertMessages } from "../../../../presentation/hooks/generation";

export const INITIAL_STATE: ImageToVideoFeatureState = {
  imageUri: null,
  motionPrompt: "",
  videoUrl: null,
  thumbnailUrl: null,
  isProcessing: false,
  progress: 0,
  error: null,
};

export const DEFAULT_ALERT_MESSAGES: AlertMessages = {
  networkError: "No internet connection. Please check your network.",
  policyViolation: "Content not allowed. Please try again.",
  saveFailed: "Failed to save. Please try again.",
  creditFailed: "Credit operation failed. Please try again.",
  unknown: "An error occurred. Please try again.",
};

export interface UseImageToVideoFeatureProps {
  config: ImageToVideoFeatureConfig;
  callbacks?: ImageToVideoFeatureCallbacks;
  userId: string;
}

export interface UseImageToVideoFeatureReturn {
  state: ImageToVideoFeatureState;
  setImageUri: (uri: string) => void;
  setMotionPrompt: (prompt: string) => void;
  generate: (params?: ImageToVideoGenerateParams) => Promise<ImageToVideoResult>;
  reset: () => void;
  isReady: boolean;
  canGenerate: boolean;
}

export interface VideoGenerationInput {
  imageUri: string;
  imageBase64: string;
  motionPrompt: string;
  options?: Omit<ImageToVideoGenerateParams, "imageUri" | "motionPrompt">;
  creationId: string;
}

export function generateCreationId(): string {
  return `image-to-video_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`;
}
