/**
 * Generation Domain Types
 * Generic types for all AI generation features
 */

// ============================================================================
// Generation Options
// ============================================================================

export interface GenerationOptions {
  timeoutMs?: number;
  onProgress?: (progress: number) => void;
}

// ============================================================================
// Generation Result (re-exported from canonical source)
// ============================================================================

import type { GenerationResult as _GenerationResult } from "../../../domain/entities/generation.types";
export type { GenerationResult } from "../../../domain/entities/generation.types";

// ============================================================================
// Input Types (by generation type)
// ============================================================================

export interface ImageGenerationInput {
  imageUrls?: string[];
  prompt: string;
  aspectRatio?: string;
  outputFormat?: "jpeg" | "png" | "webp";
}

export interface TextToImageInput {
  prompt: string;
  negativePrompt?: string;
  aspectRatio?: string;
  size?: string;
  numImages?: number;
  guidanceScale?: number;
  style?: string;
  outputFormat?: "jpeg" | "png" | "webp";
}

export interface TextToImageOutput {
  imageUrl: string;
  imageUrls: string[];
}

export interface VideoGenerationInput {
  sourceImageBase64: string;
  targetImageBase64?: string;
  prompt?: string;
}

export interface MemeGenerationInput {
  text: string;
  template?: string;
}

// ============================================================================
// Output Types (by generation type)
// ============================================================================

export interface ImageGenerationOutput {
  imageUrl: string;
}

export interface VideoGenerationOutput {
  videoUrl: string;
}

export interface MemeGenerationOutput {
  imageUrl: string;
  caption?: string;
}

// ============================================================================
// Generic Executor Interface
// ============================================================================

export interface GenerationExecutor<TInput, TOutput> {
  generate(
    model: string,
    input: TInput,
    options?: GenerationOptions,
  ): Promise<_GenerationResult<TOutput>>;
}
