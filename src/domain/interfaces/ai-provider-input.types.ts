/**
 * AI Provider Input Data Types
 * Input data structures for feature execution
 */

/**
 * Input data for image processing features
 */
export interface ImageFeatureInputData {
  imageBase64: string;
  targetImageBase64?: string;
  prompt?: string;
  options?: Record<string, unknown>;
}

/**
 * Input data for video generation features
 */
export interface VideoFeatureInputData {
  /** Source image (required for image-to-video, optional for text-to-video) */
  sourceImageBase64?: string;
  /** Target image (optional, used for dual-image features) */
  targetImageBase64?: string;
  /** Generation prompt (required for text-to-video) */
  prompt?: string;
  /** Additional generation options */
  options?: Record<string, unknown>;
}
