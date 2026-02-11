/**
 * Text-to-Video Request/Response Types
 * Single Responsibility: Define API request and response structures
 */

export interface TextToVideoOptions {
  duration?: number;
  fps?: number;
  guidanceScale?: number;
  aspectRatio?: "16:9" | "9:16" | "1:1";
  style?: string;
  negativePrompt?: string;
}

export interface TextToVideoRequest {
  prompt: string;
  userId: string;
  options?: TextToVideoOptions;
}

export interface TextToVideoResult {
  success: boolean;
  videoUrl?: string;
  thumbnailUrl?: string;
  error?: string;
  requestId?: string;
}

export type TextToVideoInputBuilder = (
  prompt: string,
  options?: TextToVideoOptions,
) => Record<string, unknown>;

export type TextToVideoResultExtractor = (
  result: unknown,
) => { videoUrl?: string; thumbnailUrl?: string } | undefined;
