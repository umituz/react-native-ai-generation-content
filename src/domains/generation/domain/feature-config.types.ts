/**
 * Feature Configuration Types
 * Defines how apps configure AI features
 */

// ============================================================================
// Feature Type Enums
// ============================================================================

export type GenerationType =
  | "image"
  | "video"
  | "text-to-image"
  | "text-to-video"
  | "image-to-video"
  | "meme";

export type InputType =
  | "single-photo"
  | "two-photos"
  | "text-only"
  | "text"
  | "photo-text"
  | "photo-photo-text";

export type OutputType = "image" | "video";

// ============================================================================
// Feature Configuration
// ============================================================================

export interface FeatureConfig {
  /** Unique feature identifier (e.g., 'solo-fantasy', 'image-to-video') */
  readonly id: string;

  /** Generation type (determines which executor to use) */
  readonly type: GenerationType;

  /** Model ID (from app's GENERATION_MODELS config) */
  readonly model: string;

  /** Credit cost for this feature */
  readonly creditCost: number;

  /** Input type (determines wizard steps) */
  readonly inputType: InputType;

  /** Output type (determines result preview) */
  readonly outputType: OutputType;

  /** Optional: Custom prompt template */
  readonly promptTemplate?: string;

  /** Optional: Feature-specific metadata */
  readonly metadata?: Record<string, unknown>;
}

// ============================================================================
// Feature Registration
// ============================================================================

export interface FeatureRegistration {
  register(featureId: string, config: FeatureConfig): void;
  get(featureId: string): FeatureConfig;
  getAll(): FeatureConfig[];
  has(featureId: string): boolean;
  unregister(featureId: string): void;
}

/**
 * Visual style modifiers for generation
 */
export interface VisualStyleConfig {
  readonly [key: string]: string;
}
