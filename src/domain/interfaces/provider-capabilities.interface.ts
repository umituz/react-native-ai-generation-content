/**
 * Provider Capabilities Interface
 * Single Responsibility: Provider capability querying
 */

import type {
  ProviderCapabilities,
  ImageFeatureType,
  VideoFeatureType,
} from "./ai-provider.interface";

export interface IAIProviderCapabilities {
  /**
   * Get all capabilities supported by this provider
   */
  getCapabilities(): ProviderCapabilities;

  /**
   * Check if a specific feature is supported
   */
  isFeatureSupported(feature: ImageFeatureType | VideoFeatureType): boolean;
}
