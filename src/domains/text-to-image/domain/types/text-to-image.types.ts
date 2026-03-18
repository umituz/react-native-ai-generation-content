/**
 * Text-to-Image Feature Types
 * Refactored to use shared kernel types
 */

import type {
  AspectRatio,
  BaseGenerationOptions,
  BaseGenerationResult,
  BaseRequestMeta,
  BaseFeatureState,
  BaseGenerationCallbacks,
} from '../../../../shared-kernel/base-types';

/**
 * Text-to-image specific options
 * Extends base options with image-specific fields
 */
export interface TextToImageOptions extends BaseGenerationOptions {
  /** Image size dimensions */
  size?: '512x512' | '768x768' | '1024x1024' | '1024x1792' | '1792x1024';
  /** Number of images to generate */
  numImages?: number;
}

/**
 * Text-to-image request
 * Uses base metadata from shared kernel
 */
export interface TextToImageRequest {
  prompt: string;
  negativePrompt?: string;
  options?: TextToImageOptions;
  meta: BaseRequestMeta;
}

/**
 * Text-to-image result
 * Extends base result with image-specific output
 */
export interface TextToImageResult extends BaseGenerationResult<string | string[]> {
  imageUrl?: string;
  imageUrls?: string[];
}

/**
 * Text-to-image feature state
 * Extends base feature state with prompt field
 */
export interface TextToImageFeatureState extends BaseFeatureState<string | string[]> {
  prompt: string;
}

/**
 * Input builder type
 */
export type TextToImageInputBuilder = (
  prompt: string,
  options?: TextToImageOptions,
) => Record<string, unknown>;

/**
 * Result extractor type
 */
export type TextToImageResultExtractor = (
  result: unknown,
) => { imageUrl?: string; imageUrls?: string[] } | undefined;

/**
 * Text-to-image feature configuration
 * Uses shared callbacks
 */
export interface TextToImageFeatureConfig {
  providerId?: string;
  creditCost?: number;
  model: string;
  buildInput: TextToImageInputBuilder;
  extractResult?: TextToImageResultExtractor;
  callbacks?: BaseGenerationCallbacks<string | string[]>;
}
