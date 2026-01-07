/**
 * Image Feature Result Types
 * Result interfaces for all image processing features
 */

/**
 * Base result for all image processing features
 */
export interface BaseImageResult {
  success: boolean;
  imageUrl?: string;
  imageBase64?: string;
  error?: string;
  requestId?: string;
}

/**
 * Base result with optional creationId for persistence
 */
export interface BaseImageResultWithCreationId extends BaseImageResult {
  creationId?: string;
}

/**
 * Result extractor function type
 */
export type ImageResultExtractor = (result: unknown) => string | undefined;

/**
 * Image processing start data
 */
export interface SingleImageProcessingStartData {
  creationId: string;
  imageUri: string;
}

/**
 * Dual image processing start data
 */
export interface DualImageProcessingStartData {
  creationId: string;
  sourceImageUri: string;
  targetImageUri: string;
}
