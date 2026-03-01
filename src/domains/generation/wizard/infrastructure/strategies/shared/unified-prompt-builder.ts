/**
 * Unified Prompt Builder
 * Single prompt building logic for ALL generation types (image & video)
 *
 * For photo-based scenarios: the app's scenario already uses createPhotorealisticPrompt()
 * to build a structured prompt. This builder only injects the MULTI-PERSON block
 * into that existing structure — it does NOT re-wrap.
 *
 * For text-only scenarios: uses createPhotorealisticPrompt for wrapping.
 */

import { IDENTITY_PRESERVATION_CORE } from "../../../../../prompts/domain/base/constants";
import {
  createMultiPersonBlock,
  createMultiPersonPrompt,
} from "../../../../../prompts/domain/entities/MultiPersonPromptStructure";
import { createPhotorealisticPrompt } from "../../../../../prompts/domain/base/creators";

interface BuildPromptOptions {
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
 * - Photo-based (already structured): Injects MULTI-PERSON block into existing prompt
 * - Photo-based (raw text): Full wrapping with createMultiPersonPrompt
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

  // Photo-based: check if prompt is already structured by createPhotorealisticPrompt
  const isAlreadyStructured = basePrompt.includes(IDENTITY_PRESERVATION_CORE);

  let finalPrompt: string;

  if (isAlreadyStructured) {
    // Prompt already has IDENTITY + PHOTOREALISTIC + POSE from createPhotorealisticPrompt.
    // Only inject the MULTI-PERSON block after IDENTITY_PRESERVATION_CORE.
    const multiPersonBlock = createMultiPersonBlock(photoCount);
    const insertPos = basePrompt.indexOf(IDENTITY_PRESERVATION_CORE) + IDENTITY_PRESERVATION_CORE.length;
    finalPrompt = basePrompt.slice(0, insertPos) + "\n\n" + multiPersonBlock + basePrompt.slice(insertPos);
  } else {
    // Raw text prompt — apply full wrapping
    finalPrompt = createMultiPersonPrompt(basePrompt, photoCount);
  }

  // Add interaction style if specified by scenario (no defaults)
  if (interactionStyle) {
    finalPrompt = `${finalPrompt}\n\nINTERACTION STYLE: ${interactionStyle}`;
  }

  return finalPrompt;
}
