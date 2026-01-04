/**
 * Face Swap Feature Types
 * Extends base image-to-image types for dual image processing
 */

import type {
  BaseImageResult,
  BaseDualImageState,
  BaseDualImageTranslations,
  DualImageConfig,
} from "../../../image-to-image/domain/types";

export interface FaceSwapOptions {
  enhanceFace?: boolean;
  preserveSkinTone?: boolean;
}

export interface FaceSwapRequest {
  sourceImageUri: string;
  targetImageUri: string;
  sourceImageBase64?: string;
  targetImageBase64?: string;
  userId: string;
  options?: FaceSwapOptions;
}

export type FaceSwapResult = BaseImageResult;

export type FaceSwapFeatureState = BaseDualImageState;

export type FaceSwapTranslations = BaseDualImageTranslations;

export interface FaceSwapFeatureConfig extends DualImageConfig<FaceSwapResult> {
  defaultOptions?: FaceSwapOptions;
}
