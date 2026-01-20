/**
 * Unified Prompt Builder
 * Single prompt building logic for ALL generation types (image & video)
 * Uses MultiPersonPromptStructure for photo-based scenarios
 * Uses createEnhancedPrompt for text-only scenarios
 */

import { createMultiPersonPrompt } from "../../../../../prompts/domain/entities/MultiPersonPromptStructure";
import { createEnhancedPrompt } from "../../../../../prompts/domain/entities/BasePromptStructure";

export interface BuildPromptOptions {
  /** Base scenario prompt (aiPrompt from scenario config) */
  readonly basePrompt: string;
  /** Number of photos/people in generation */
  readonly photoCount: number;
  /** Interaction style from scenario (optional - only if scenario specifies it) */
  readonly interactionStyle?: string;
}

/**
 * Build unified prompt for any generation type
 * - Photo-based: Uses createMultiPersonPrompt with @image1, @image2 references
 * - Text-only: Uses createEnhancedPrompt with identity preservation
 */
export function buildUnifiedPrompt(options: BuildPromptOptions): string {
  const { basePrompt, photoCount, interactionStyle } = options;

  // Text-only generation (no photos)
  if (photoCount === 0) {
    return createEnhancedPrompt(basePrompt, {
      includeIdentityPreservation: false,
      includePhotoRealism: true,
      includePoseGuidelines: true,
    });
  }

  // Photo-based generation - use multi-person prompt with @imageN references
  let finalPrompt = createMultiPersonPrompt(basePrompt, photoCount);

  // Add interaction style if specified by scenario (no defaults)
  if (interactionStyle) {
    finalPrompt = `${finalPrompt}\n\nINTERACTION STYLE: ${interactionStyle}`;
  }

  return finalPrompt;
}
