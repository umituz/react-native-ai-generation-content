/**
 * AI Provider Capabilities Types
 * Defines supported features and capabilities
 */

import type { ImageFeatureType, VideoFeatureType } from "./ai-provider-feature-types";

/**
 * Provider capabilities definition
 * Describes what features and operations the provider supports
 */
export interface ProviderCapabilities {
  /** Supported image features */
  imageFeatures: readonly ImageFeatureType[];
  /** Supported video features */
  videoFeatures: readonly VideoFeatureType[];
  /** Supports text-to-image generation */
  textToImage: boolean;
  /** Supports text-to-video generation */
  textToVideo: boolean;
  /** Supports image-to-video generation */
  imageToVideo: boolean;
  /** Supports text-to-voice generation */
  textToVoice: boolean;
  /** Supports text-to-text (LLM) generation */
  textToText: boolean;
}
