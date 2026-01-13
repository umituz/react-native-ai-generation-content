/**
 * AI Kiss Feature Types
 * Extends dual-image-video types for AI kiss video generation
 */

import type {
  DualImageVideoFeatureConfig,
  DualImageVideoFeatureState,
  DualImageVideoTranslations,
} from "../../../shared/dual-image-video";

export interface AIKissResult {
  success: boolean;
  videoUrl?: string;
  error?: string;
  requestId?: string;
}

export type AIKissFeatureState = DualImageVideoFeatureState;

export type AIKissTranslations = DualImageVideoTranslations;

export type AIKissResultExtractor = (result: unknown) => string | undefined;

export type AIKissFeatureConfig = DualImageVideoFeatureConfig;
