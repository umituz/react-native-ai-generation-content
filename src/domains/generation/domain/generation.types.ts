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
// Generation Result
// ============================================================================

export interface GenerationResult<T> {
  success: boolean;
  data?: T;
  error?: string;
}

// ============================================================================
// Input Types (by generation type)
// ============================================================================

export interface ImageGenerationInput {
  imageUrls?: string[];
  prompt: string;
  aspectRatio?: string;
  outputFormat?: "jpeg" | "png" | "webp";
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
  ): Promise<GenerationResult<TOutput>>;
}
