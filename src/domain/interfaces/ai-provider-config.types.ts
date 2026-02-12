/**
 * AI Provider Configuration Types
 * Configuration interface for AI provider initialization
 */

import type { ImageFeatureType, VideoFeatureType } from "./ai-provider-feature-types";

/**
 * AI Provider Configuration
 * Contains API keys, retry settings, timeouts, and model mappings
 */
export interface AIProviderConfig {
  apiKey: string;
  maxRetries?: number;
  baseDelay?: number;
  maxDelay?: number;
  defaultTimeoutMs?: number;
  /** Text generation model ID */
  textModel?: string;
  /** Text-to-image generation model ID */
  textToImageModel?: string;
  /** Image editing model ID */
  imageEditModel?: string;
  /** Video generation model ID */
  videoGenerationModel?: string;
  /** Video feature model mapping - app provides models for each feature */
  videoFeatureModels?: Partial<Record<VideoFeatureType, string>>;
  /** Image feature model mapping - app provides models for each feature */
  imageFeatureModels?: Partial<Record<ImageFeatureType, string>>;
}
