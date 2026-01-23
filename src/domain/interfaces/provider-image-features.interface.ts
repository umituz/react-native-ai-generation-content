/**
 * Provider Image Features Interface
 * Single Responsibility: Image feature model mapping and input building
 */

import type {
  ImageFeatureType,
  ImageFeatureInputData,
} from "./ai-provider.interface";

export interface IAIProviderImageFeatures {
  /**
   * Get model ID for specific image feature
   */
  getImageFeatureModel(feature: ImageFeatureType): string;

  /**
   * Build provider-specific input for image feature
   */
  buildImageFeatureInput(
    feature: ImageFeatureType,
    data: ImageFeatureInputData,
  ): Record<string, unknown>;
}
