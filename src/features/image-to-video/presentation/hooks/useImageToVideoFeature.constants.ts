/**
 * useImageToVideoFeature Constants
 */

import type { ImageToVideoFeatureState } from "../../domain/types";

export const INITIAL_IMAGE_TO_VIDEO_STATE: ImageToVideoFeatureState = {
  imageUri: null,
  motionPrompt: "",
  videoUrl: null,
  thumbnailUrl: null,
  isProcessing: false,
  progress: 0,
  error: null,
};
