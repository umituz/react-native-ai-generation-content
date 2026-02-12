/**
 * Image-to-Video Result Types
 */

export interface ImageToVideoResult {
  success: boolean;
  videoUrl?: string;
  thumbnailUrl?: string;
  error?: string;
  requestId?: string;
}

export interface ImageToVideoGenerationState {
  isGenerating: boolean;
  progress: number;
  error: string | null;
}
