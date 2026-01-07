/**
 * Feature State Types
 * State interfaces for different feature types
 */

/**
 * Dual image video feature state (for ai-kiss, ai-hug)
 */
export interface DualImageVideoFeatureState {
  sourceImageUri: string | null;
  targetImageUri: string | null;
  processedVideoUrl: string | null;
  isProcessing: boolean;
  progress: number;
  error: string | null;
  selectSourceImage: () => Promise<void>;
  selectTargetImage: () => Promise<void>;
  process: () => Promise<void>;
  save: () => Promise<void>;
  reset: () => void;
}

/**
 * Single image with prompt feature state
 */
export interface SingleImageWithPromptFeatureState {
  imageUri: string | null;
  prompt: string;
  processedUrl: string | null;
  isProcessing: boolean;
  progress: number;
  error: string | null;
  selectImage: () => Promise<void>;
  setPrompt: (prompt: string) => void;
  process: () => Promise<void>;
  save: () => Promise<void>;
  reset: () => void;
}
