/**
 * AI Hug Feature Types
 * Request, Result, Config types for AI hug video generation
 */

import type {
  DualImageVideoFeatureConfig,
  DualImageVideoFeatureState,
  DualImageVideoTranslations,
} from "../../../shared/dual-image-video";

export interface AIHugOptions {
  intensity?: "gentle" | "warm" | "tight";
  preserveFaces?: boolean;
}

export interface AIHugRequest {
  sourceImageUri: string;
  targetImageUri: string;
  sourceImageBase64?: string;
  targetImageBase64?: string;
  userId: string;
  prompt?: string;
  options?: AIHugOptions;
}

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
