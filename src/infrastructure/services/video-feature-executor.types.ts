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
  sourceImageBase64: string;
  targetImageBase64: string;
  prompt?: string;
  options?: Record<string, unknown>;
}
