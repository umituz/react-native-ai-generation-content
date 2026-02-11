/**
 * Face Preservation Prompt Builder
 * Builds prompts that preserve facial features in image generation
 */

import type {
  FacePreservationMode,
  FacePreservationPrompt,
  FaceMetadata,
} from "../../domain/types/face-preservation.types";
import { PRESERVATION_MODE_WEIGHTS } from "../../domain/types/face-preservation.types";

const PRESERVATION_PROMPTS: Record<FacePreservationMode, string> = {
  strict: "Preserve the exact facial features, expressions, and details from the original image. Maintain face structure, skin tone, eyes, nose, and mouth precisely.",
  balanced: "Keep the main facial features recognizable while allowing natural variations. Preserve overall face structure and key characteristics.",
  minimal: "Maintain basic facial proportions and general appearance while allowing creative interpretation.",
  none: "",
};

export interface BuildPreservationPromptOptions {
  readonly mode: FacePreservationMode;
  readonly basePrompt: string;
  readonly faceMetadata?: FaceMetadata;
  readonly customGuidance?: string;
}

export function buildFacePreservationPrompt(
  options: BuildPreservationPromptOptions,
): FacePreservationPrompt {
  const { mode, basePrompt, faceMetadata, customGuidance } = options;

  if (mode === "none" || !faceMetadata?.hasFace) {
    return {
      basePrompt,
      faceGuidance: "",
      preservationWeight: 0,
    };
  }

  const faceGuidance = customGuidance || PRESERVATION_PROMPTS[mode];
  const preservationWeight = PRESERVATION_MODE_WEIGHTS[mode];

  const qualityNote = faceMetadata?.quality === "high"
    ? " High quality facial details detected."
    : "";

  const enhancedGuidance = `${faceGuidance}${qualityNote}`;

  return {
    basePrompt,
    faceGuidance: enhancedGuidance,
    preservationWeight,
  };
}

export function combineFacePreservationPrompt(prompt: FacePreservationPrompt): string {
  if (!prompt.faceGuidance) {
    return prompt.basePrompt;
  }

  return `${prompt.basePrompt}\n\nFace Preservation: ${prompt.faceGuidance}`;
}

export function getFacePreservationWeight(mode: FacePreservationMode): number {
  return PRESERVATION_MODE_WEIGHTS[mode];
}
