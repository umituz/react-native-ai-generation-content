/**
 * Video Generation Utilities
 * Video-specific utility functions
 */

import type { VideoFeatureType } from "../../../../../domain/interfaces";
import type { WizardScenarioData } from "../../presentation/hooks/wizard-generation.types";
import { VIDEO_FEATURE_PATTERNS } from "./wizard-strategy.constants";

declare const __DEV__: boolean;

/**
 * Determines the video feature type from scenario
 * Priority: featureType (app-controlled) > pattern matching > default
 */
export function getVideoFeatureType(scenario: WizardScenarioData): VideoFeatureType {
  const { id, featureType } = scenario;

  // Primary: Use featureType from main app (package-driven design)
  if (featureType) {
    if (typeof __DEV__ !== "undefined" && __DEV__) {
      console.log("[VideoUtils] Using featureType from app", { id, featureType });
    }
    return featureType;
  }

  // Fallback: Pattern matching for legacy scenarios
  const lowerId = id.toLowerCase();
  for (const [pattern, type] of Object.entries(VIDEO_FEATURE_PATTERNS)) {
    if (lowerId.includes(pattern)) {
      if (typeof __DEV__ !== "undefined" && __DEV__) {
        console.log("[VideoUtils] Pattern match", { id, pattern, type });
      }
      return type;
    }
  }

  // Default: text-to-video
  if (typeof __DEV__ !== "undefined" && __DEV__) {
    console.log("[VideoUtils] Default to text-to-video", { id });
  }
  return "text-to-video";
}
