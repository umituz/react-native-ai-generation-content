/**
 * Text-to-Video Request/Response Types
 * Refactored to use shared kernel types
 */

import type {
  AspectRatio,
  BaseGenerationOptions,
  BaseGenerationResult,
  BaseRequestMeta,
} from '../../../../shared-kernel/base-types';

/**
 * Text-to-video specific options
 * Extends base options with video-specific fields
 */
export interface TextToVideoOptions extends BaseGenerationOptions {
  /** Video duration in seconds */
  duration?: number;
  /** Frames per second */
  fps?: number;
  /** Video style preset */
  style?: string;
  /** Negative prompt for content avoidance */
  negativePrompt?: string;
}

/**
 * Text-to-video request
 * Uses base metadata from shared kernel
 */
export interface TextToVideoRequest {
  prompt: string;
  options?: TextToVideoOptions;
  meta: BaseRequestMeta;
}

/**
 * Text-to-video result
 * Extends base result with video-specific output
 */
export interface TextToVideoResult extends BaseGenerationResult {
  videoUrl?: string;
  thumbnailUrl?: string;
}

/**
 * Input builder type
 */
export type TextToVideoInputBuilder = (
  prompt: string,
  options?: TextToVideoOptions,
) => Record<string, unknown>;

/**
 * Result extractor type
 */
export type TextToVideoResultExtractor = (
  result: unknown,
) => { videoUrl?: string; thumbnailUrl?: string } | undefined;
