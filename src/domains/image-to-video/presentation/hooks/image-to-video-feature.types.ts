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
export { DEFAULT_ALERT_MESSAGES } from "../../../../presentation/constants/alert-messages";
export { generateCreationId } from "../../../../infrastructure/utils/id-generator.util";

export const INITIAL_STATE: ImageToVideoFeatureState = {
  imageUri: null,
  motionPrompt: "",
  videoUrl: null,
  thumbnailUrl: null,
  isProcessing: false,
  progress: 0,
  error: null,
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

