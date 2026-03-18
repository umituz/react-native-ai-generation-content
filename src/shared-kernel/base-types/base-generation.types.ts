/**
 * Base types for AI generation operations
 * Shared across all generation domains (text-to-image, text-to-video, image-to-video, etc.)
 */

/**
 * Common aspect ratios used across all generation types
 */
export type AspectRatio = '16:9' | '9:16' | '1:1' | '4:3' | '3:4';

/**
 * Base generation options that are common to most generation types
 */
export interface BaseGenerationOptions {
  /** Output aspect ratio */
  aspectRatio?: AspectRatio;
  /** Number of steps/inference iterations */
  steps?: number;
  /** Guidance scale for generation (0-20 typically) */
  guidanceScale?: number;
  /** Random seed for reproducible results */
  seed?: number;
  /** Number of outputs to generate */
  numOutputs?: number;
}

/**
 * Common generation request metadata
 */
export interface BaseRequestMeta {
  /** Unique identifier for this request */
  requestId: string;
  /** User ID making the request */
  userId: string;
  /** Timestamp when request was created */
  timestamp: number;
  /** Request priority for queue management */
  priority?: 'low' | 'normal' | 'high';
}

/**
 * Standard generation result structure
 */
export interface BaseGenerationResult<T = string> {
  /** Whether the generation was successful */
  success: boolean;
  /** Generated content URL or data */
  data?: T;
  /** Error message if generation failed */
  error?: string;
  /** Request identifier */
  requestId: string;
  /** Time taken to complete generation (ms) */
  duration?: number;
  /** Additional metadata */
  metadata?: Record<string, unknown>;
}

/**
 * Generation progress information
 */
export interface GenerationProgress {
  /** Current progress (0-1) */
  progress: number;
  /** Current status message */
  status?: string;
  /** Estimated time remaining (ms) */
  eta?: number;
}
