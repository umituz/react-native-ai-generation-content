/**
 * Face Preservation Types
 * Enhanced face detection with preservation strategies
 */

export type FacePreservationMode = "strict" | "balanced" | "minimal" | "none";

export interface FaceMetadata {
  readonly hasFace: boolean;
  readonly confidence: number;
  readonly position?: {
    readonly x: number;
    readonly y: number;
    readonly width: number;
    readonly height: number;
  };
  readonly features?: {
    readonly eyes: boolean;
    readonly nose: boolean;
    readonly mouth: boolean;
  };
  readonly quality?: "high" | "medium" | "low";
}

export interface FacePreservationConfig {
  readonly mode: FacePreservationMode;
  readonly minConfidence: number;
  readonly requireFullFace?: boolean;
  readonly allowMultipleFaces?: boolean;
}

export interface FacePreservationPrompt {
  readonly basePrompt: string;
  readonly faceGuidance: string;
  readonly preservationWeight: number;
}

export const DEFAULT_PRESERVATION_CONFIG: FacePreservationConfig = {
  mode: "balanced",
  minConfidence: 0.5,
  requireFullFace: false,
  allowMultipleFaces: true,
};

export const PRESERVATION_MODE_WEIGHTS: Record<FacePreservationMode, number> = {
  strict: 1.0,
  balanced: 0.7,
  minimal: 0.4,
  none: 0.0,
};
