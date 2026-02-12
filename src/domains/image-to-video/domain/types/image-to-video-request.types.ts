/**
 * Image-to-Video Request Types
 */

import type { AnimationStyleId } from "./animation.types";
import type { VideoDuration } from "./duration.types";

export interface ImageToVideoOptions {
  duration?: number;
  motionStrength?: number;
  aspectRatio?: "16:9" | "9:16" | "1:1";
  fps?: number;
  animationStyle?: AnimationStyleId;
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
  animationStyle?: AnimationStyleId;
  duration?: VideoDuration;
  model?: string;
}
