/**
 * Video Feature Executor Type Definitions
 */

import type { VideoResultExtractor } from "../utils/url-extractor";

/**
 * Execution options
 */
export interface ExecuteVideoFeatureOptions {
  extractResult?: VideoResultExtractor;
  onProgress?: (progress: number) => void;
  onStatusChange?: (status: string) => void;
}

/**
 * Execution result
 */
export interface VideoFeatureResult {
  success: boolean;
  videoUrl?: string;
  error?: string;
  requestId?: string;
}

/**
 * Request data for video features
 */
export interface VideoFeatureRequest {
  /** Source image (required for image-to-video, optional for text-to-video) */
  sourceImageBase64?: string;
  /** Target image (optional, used for dual-image features) */
  targetImageBase64?: string;
  /** Generation prompt (required for text-to-video) */
  prompt?: string;
  /** Additional options */
  options?: Record<string, unknown>;
}
