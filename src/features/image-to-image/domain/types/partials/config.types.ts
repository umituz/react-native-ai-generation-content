/**
 * Image Feature Config Types
 * Configuration interfaces for all image processing features
 */

import type { ImageFeatureType } from "../../../../../domain/interfaces";
import type { BaseImageResult, ImageResultExtractor } from "./result.types";

/**
 * Base config for all image features
 */
export interface BaseImageConfig<TResult extends BaseImageResult = BaseImageResult> {
  featureType: ImageFeatureType;
  creditCost?: number;
  extractResult?: ImageResultExtractor;
  prepareImage: (imageUri: string) => Promise<string>;
  onProcessingStart?: (data: { creationId: string; [key: string]: unknown }) => void;
  onProcessingComplete?: (result: TResult) => void;
  onError?: (error: string, creationId?: string) => void;
}

/**
 * Config for single image features
 */
export interface SingleImageConfig<TResult extends BaseImageResult = BaseImageResult>
  extends BaseImageConfig<TResult> {
  onImageSelect?: (uri: string) => void;
}

/**
 * Config for dual image features
 */
export interface DualImageConfig<TResult extends BaseImageResult = BaseImageResult>
  extends BaseImageConfig<TResult> {
  onSourceImageSelect?: (uri: string) => void;
  onTargetImageSelect?: (uri: string) => void;
}
