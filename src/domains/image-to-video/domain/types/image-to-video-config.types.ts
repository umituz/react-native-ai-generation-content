/**
 * Image-to-Video Config Types
 */

import type { ImageToVideoOptions } from "./image-to-video-request.types";
import type { ImageToVideoResult } from "./image-to-video-result.types";

export type ImageToVideoInputBuilder = (
  imageBase64: string,
  motionPrompt?: string,
  options?: ImageToVideoOptions
) => Record<string, unknown>;

export type ImageToVideoResultExtractor = (
  result: unknown
) => { videoUrl?: string; thumbnailUrl?: string } | undefined;

export interface ImageToVideoFeatureConfig {
  providerId?: string;
  creditCost?: number;
  model: string;
  buildInput: ImageToVideoInputBuilder;
  extractResult?: ImageToVideoResultExtractor;
  prepareImage: (imageUri: string) => Promise<string>;
  onImageSelect?: (uri: string) => void;
  onProcessingStart?: () => void;
  onProcessingComplete?: (result: ImageToVideoResult) => void;
  onError?: (error: string) => void;
}
