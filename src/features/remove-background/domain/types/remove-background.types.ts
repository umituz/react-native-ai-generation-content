/**
 * Remove Background Feature Types
 * Extends base image-to-image types with remove-background options
 */

import type {
  BaseImageResult,
  BaseSingleImageState,
  BaseImageTranslations,
  SingleImageConfig,
} from "../../../image-to-image/domain/types";

export interface RemoveBackgroundOptions {
  refineEdges?: boolean;
  outputFormat?: "png" | "webp";
  backgroundColor?: string;
}

export interface RemoveBackgroundRequest {
  imageUri: string;
  imageBase64?: string;
  userId: string;
  options?: RemoveBackgroundOptions;
}

export type RemoveBackgroundResult = BaseImageResult;

export type RemoveBackgroundFeatureState = BaseSingleImageState;

export type RemoveBackgroundTranslations = BaseImageTranslations;

export interface RemoveBackgroundFeatureConfig
  extends SingleImageConfig<RemoveBackgroundResult> {
  defaultOptions?: RemoveBackgroundOptions;
}
