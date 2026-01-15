/**
 * AI Feature Registry
 * Static configuration for all AI features
 */

import type { AIFeatureConfig, AIFeatureId } from "./types";

/**
 * Feature configurations registry
 */
export const AI_FEATURE_CONFIGS: Record<AIFeatureId, AIFeatureConfig> = {
  // Single image features
  "anime-selfie": {
    id: "anime-selfie",
    mode: "single",
    outputType: "image",
    creditType: "image",
    translationPrefix: "anime-selfie",
  },
  "remove-background": {
    id: "remove-background",
    mode: "single",
    outputType: "image",
    creditType: "image",
    translationPrefix: "remove-background",
    extraConfig: { featureType: "remove-background" },
  },
  "hd-touch-up": {
    id: "hd-touch-up",
    mode: "single",
    outputType: "image",
    creditType: "image",
    translationPrefix: "hd-touch-up",
    extraConfig: { featureType: "hd-touch-up" },
  },

  // Comparison result features
  upscale: {
    id: "upscale",
    mode: "single",
    outputType: "image",
    creditType: "image",
    translationPrefix: "upscale",
    hasComparisonResult: true,
    extraConfig: { featureType: "upscale", defaultScaleFactor: 2 },
  },
  "photo-restore": {
    id: "photo-restore",
    mode: "single",
    outputType: "image",
    creditType: "image",
    translationPrefix: "photo-restore",
    hasComparisonResult: true,
  },

  // Prompt features
  "remove-object": {
    id: "remove-object",
    mode: "single-with-prompt",
    outputType: "image",
    creditType: "image",
    translationPrefix: "remove-object",
  },
  "replace-background": {
    id: "replace-background",
    mode: "single-with-prompt",
    outputType: "image",
    creditType: "image",
    translationPrefix: "replace-background",
    extraConfig: { featureType: "replace-background" },
  },

  // Text-input features (no image upload)
  "meme-generator": {
    id: "meme-generator",
    mode: "text-input",
    outputType: "image",
    creditType: "image",
    translationPrefix: "meme-generator",
  },

  // Dual image features
  "face-swap": {
    id: "face-swap",
    mode: "dual",
    outputType: "image",
    creditType: "image",
    translationPrefix: "face-swap",
    extraConfig: { featureType: "face-swap" },
  },

  // Dual image video features
  "ai-hug": {
    id: "ai-hug",
    mode: "dual-video",
    outputType: "video",
    creditType: "image",
    translationPrefix: "ai-hug",
  },
  "ai-kiss": {
    id: "ai-kiss",
    mode: "dual-video",
    outputType: "video",
    creditType: "image",
    translationPrefix: "ai-kiss",
  },
  
  // Generic Video Features
  "image-to-video": {
    id: "image-to-video",
    mode: "single-with-prompt",
    outputType: "video",
    creditType: "video",
    translationPrefix: "image-to-video",
  },
  "text-to-video": {
    id: "text-to-video",
    mode: "text-input",
    outputType: "video",
    creditType: "video",
    translationPrefix: "text-to-video",
  },
};

/**
 * Get feature config by ID
 */
export function getAIFeatureConfig(featureId: AIFeatureId): AIFeatureConfig {
  const config = AI_FEATURE_CONFIGS[featureId];
  if (!config) {
    throw new Error(`Unknown AI feature: ${featureId}`);
  }
  return config;
}

/**
 * Check if feature exists
 */
export function hasAIFeature(featureId: string): featureId is AIFeatureId {
  return featureId in AI_FEATURE_CONFIGS;
}

/**
 * Get all feature IDs
 */
export function getAllAIFeatureIds(): AIFeatureId[] {
  return Object.keys(AI_FEATURE_CONFIGS) as AIFeatureId[];
}

/**
 * Get features by mode
 */
export function getAIFeaturesByMode(mode: AIFeatureConfig["mode"]): AIFeatureConfig[] {
  return Object.values(AI_FEATURE_CONFIGS).filter((config) => config.mode === mode);
}
