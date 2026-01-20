/**
 * Video Generation Utilities
 * Video-specific utility functions
 */

import type { VideoFeatureType } from "../../../../../domain/interfaces";
import { VIDEO_FEATURE_PATTERNS } from "./wizard-strategy.constants";

declare const __DEV__: boolean;

/**
 * Determines the video feature type based on scenario ID
 */
export function getVideoFeatureType(scenarioId: string): VideoFeatureType {
  const id = scenarioId.toLowerCase();

  for (const [pattern, featureType] of Object.entries(VIDEO_FEATURE_PATTERNS)) {
    if (id.includes(pattern)) {
      return featureType;
    }
  }

  // Default to image-to-video for content scenarios
  if (typeof __DEV__ !== "undefined" && __DEV__) {
    console.log("[VideoUtils] Defaulting to image-to-video", { scenarioId });
  }
  return "image-to-video";
}
