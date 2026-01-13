/**
 * AI Hug Feature Types
 * Extends dual-image-video types for AI hug video generation
 */

import type {
  DualImageVideoFeatureConfig,
  DualImageVideoFeatureState,
  DualImageVideoTranslations,
} from "../../../shared/dual-image-video";

export interface AIHugResult {
  success: boolean;
  videoUrl?: string;
  error?: string;
  requestId?: string;
}

export type AIHugFeatureState = DualImageVideoFeatureState;

export type AIHugTranslations = DualImageVideoTranslations;

export type AIHugResultExtractor = (result: unknown) => string | undefined;

export type AIHugFeatureConfig = DualImageVideoFeatureConfig;
