/**
 * Image Feature State Types
 * State interfaces for all image processing features
 */

/**
 * Base state for single image features
 */
export interface BaseSingleImageState {
  imageUri: string | null;
  processedUrl: string | null;
  isProcessing: boolean;
  progress: number;
  error: string | null;
}

/**
 * Base state for single image + prompt features
 */
export interface BaseImageWithPromptState extends BaseSingleImageState {
  prompt: string;
}

/**
 * Base state for dual image features
 */
export interface BaseDualImageState {
  sourceImageUri: string | null;
  targetImageUri: string | null;
  processedUrl: string | null;
  isProcessing: boolean;
  progress: number;
  error: string | null;
}
