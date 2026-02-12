/**
 * Image-to-Video Executor Types
 */

import type {
  ImageToVideoInputBuilder,
  ImageToVideoResultExtractor,
} from "../../domain/types";

export interface ExecuteImageToVideoOptions {
  model: string;
  buildInput: ImageToVideoInputBuilder;
  extractResult?: ImageToVideoResultExtractor;
  onProgress?: (progress: number) => void;
}
