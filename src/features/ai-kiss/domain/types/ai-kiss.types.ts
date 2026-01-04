/**
 * AI Kiss Feature Types
 * Request, Result, Config types for AI kiss video generation
 */

import type {
  DualImageVideoFeatureConfig,
  DualImageVideoFeatureState,
  DualImageVideoTranslations,
} from "../../../shared/dual-image-video";

export interface AIKissOptions {
  style?: "romantic" | "cheek" | "forehead";
  preserveFaces?: boolean;
}

export interface AIKissRequest {
  sourceImageUri: string;
  targetImageUri: string;
  sourceImageBase64?: string;
  targetImageBase64?: string;
  userId: string;
  prompt?: string;
  options?: AIKissOptions;
}

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
