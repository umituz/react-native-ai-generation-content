/**
 * Unified Prompt Builder
 * Single prompt building logic for ALL generation types (image & video)
 * Uses MultiPersonPromptStructure for photo-based scenarios
 * Uses createPhotorealisticPrompt for text-only scenarios
 */

import { createMultiPersonPrompt } from "../../../../../prompts/domain/entities/MultiPersonPromptStructure";
import { createPhotorealisticPrompt } from "../../../../../prompts/domain/entities/BasePromptStructure";

export interface BuildPromptOptions {
  /** Base scenario prompt (aiPrompt from scenario config) */
  readonly basePrompt: string;
  /** Number of photos/people in generation */
  readonly photoCount: number;
  /** Interaction style from scenario (optional - only if scenario specifies it) */
  readonly interactionStyle?: string;
  /** Skip identity preservation (for custom prompts like genetic blend) */
  readonly skipIdentityPreservation?: boolean;
}

/**
 * Build unified prompt for any generation type
 * - Photo-based: Uses createMultiPersonPrompt with @image1, @image2 references
 * - Text-only: Uses createPhotorealisticPrompt
 * - Custom: Uses basePrompt directly when skipIdentityPreservation is true
 */
export function buildUnifiedPrompt(options: BuildPromptOptions): string {
  const { basePrompt, photoCount, interactionStyle, skipIdentityPreservation } = options;

  // Text-only generation (no photos)
  if (photoCount === 0) {
    return createPhotorealisticPrompt(basePrompt, {
      includeIdentityPreservation: false,
      includePhotoRealism: true,
      includePoseGuidelines: true,
    });
  }

  // Custom prompt handling (app provides complete prompt)
  if (skipIdentityPreservation) {
    return basePrompt;
  }

  // Default: Photo-based generation with identity preservation
  let finalPrompt = createMultiPersonPrompt(basePrompt, photoCount);

  // Add interaction style if specified by scenario (no defaults)
  if (interactionStyle) {
    finalPrompt = `${finalPrompt}\n\nINTERACTION STYLE: ${interactionStyle}`;
  }

  return finalPrompt;
}
