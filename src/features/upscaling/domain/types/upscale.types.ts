/**
 * Upscale Feature Types
 * Extends base image-to-image types with upscale-specific options
 */

import type {
  BaseImageResult,
  BaseSingleImageState,
  BaseImageTranslations,
  SingleImageConfig,
} from "../../../image-to-image/domain/types";

export type UpscaleScaleFactor = 2 | 4 | 8;

export interface UpscaleOptions {
  scaleFactor?: UpscaleScaleFactor;
  enhanceFaces?: boolean;
}

export interface UpscaleRequest {
  imageUri: string;
  imageBase64?: string;
  userId: string;
  options?: UpscaleOptions;
}

export type UpscaleResult = BaseImageResult;

export type UpscaleFeatureState = BaseSingleImageState;

export type UpscaleTranslations = BaseImageTranslations;

export interface UpscaleFeatureConfig extends SingleImageConfig<UpscaleResult> {
  defaultScaleFactor?: UpscaleScaleFactor;
}
