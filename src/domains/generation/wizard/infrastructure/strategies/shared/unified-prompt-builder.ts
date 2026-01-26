/**
 * Unified Prompt Builder
 * Single prompt building logic for ALL generation types (image & video)
 * Uses MultiPersonPromptStructure for photo-based scenarios
 * Uses createPhotorealisticPrompt for text-only scenarios
 */

import {
  createMultiPersonPrompt,
  createGeneticBlendPrompt,
} from "../../../../../prompts/domain/entities/MultiPersonPromptStructure";
import { createPhotorealisticPrompt } from "../../../../../prompts/domain/entities/BasePromptStructure";
import type { ScenarioPromptType } from "../../../../../scenarios/domain/Scenario";

export interface BuildPromptOptions {
  /** Base scenario prompt (aiPrompt from scenario config) */
  readonly basePrompt: string;
  /** Number of photos/people in generation */
  readonly photoCount: number;
  /** Interaction style from scenario (optional - only if scenario specifies it) */
  readonly interactionStyle?: string;
  /** Prompt type - identity preservation or genetic blend */
  readonly promptType?: ScenarioPromptType;
}

/**
 * Build unified prompt for any generation type
 * - Photo-based identity: Uses createMultiPersonPrompt with @image1, @image2 references
 * - Photo-based genetic_blend: Uses createGeneticBlendPrompt for child prediction
 * - Text-only: Uses createPhotorealisticPrompt with identity preservation
 */
export function buildUnifiedPrompt(options: BuildPromptOptions): string {
  const { basePrompt, photoCount, interactionStyle, promptType } = options;

  // Text-only generation (no photos)
  if (photoCount === 0) {
    return createPhotorealisticPrompt(basePrompt, {
      includeIdentityPreservation: false,
      includePhotoRealism: true,
      includePoseGuidelines: true,
    });
  }

  // Genetic blend for child prediction scenarios
  if (promptType === "genetic_blend") {
    return createGeneticBlendPrompt(basePrompt);
  }

  // Default: Photo-based generation with identity preservation
  let finalPrompt = createMultiPersonPrompt(basePrompt, photoCount);

  // Add interaction style if specified by scenario (no defaults)
  if (interactionStyle) {
    finalPrompt = `${finalPrompt}\n\nINTERACTION STYLE: ${interactionStyle}`;
  }

  return finalPrompt;
}
