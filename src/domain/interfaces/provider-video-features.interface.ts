/**
 * Provider Video Features Interface
 * Single Responsibility: Video feature model mapping and input building
 */

import type {
  VideoFeatureType,
  VideoFeatureInputData,
} from "./ai-provider.interface";

export interface IAIProviderVideoFeatures {
  /**
   * Get model ID for specific video feature
   */
  getVideoFeatureModel(feature: VideoFeatureType): string;

  /**
   * Build provider-specific input for video feature
   */
  buildVideoFeatureInput(
    feature: VideoFeatureType,
    data: VideoFeatureInputData,
  ): Record<string, unknown>;
}
