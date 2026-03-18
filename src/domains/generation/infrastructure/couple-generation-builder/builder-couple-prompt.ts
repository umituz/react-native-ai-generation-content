/**
 * Couple Image Generation Builder - Prompt Processing
 *
 * Handles prompt refinement and final prompt creation
 */

import {
  prependContext,
  refinePromptForCouple,
} from "../../../infrastructure/utils/couple-input.util";
import { createPhotorealisticPrompt } from "../../prompts";
import { logBuilderStep } from "./utils";
import type { CoupleGenerationInputParams } from "./types";

export interface CouplePromptResult {
  prompt: string;
  refinedPrompt: string;
}

/**
 * Process and refine prompt for couple generation
 */
export function processCouplePrompt(
  params: CoupleGenerationInputParams,
  appearanceContext: string,
  prefix: string = "[CoupleBuilder]",
): CouplePromptResult {
  const {
    basePrompt,
    customInstructions,
    isCoupleMode,
  } = params;

  // 3. REFINE FOR COUPLE + PREPEND CONTEXT - Wardrobe mantığı
  logBuilderStep(prefix, "STEP 3: REFINE & PREPEND CONTEXT", {
    basePromptLength: basePrompt.length,
    isCoupleMode
  });

  const refinedPrompt = prependContext(
    refinePromptForCouple(basePrompt, isCoupleMode),
    appearanceContext,
  );

  logBuilderStep(prefix, "Refined Prompt Result", {
    refinedPromptLength: refinedPrompt.length,
    refinedPromptPreview: refinedPrompt.substring(0, 300),
  });

  // 4. CREATE FINAL PROMPT - Photorealistic
  logBuilderStep(prefix, "STEP 4: CREATE PHOTOREALISTIC PROMPT", {
    isCouple: isCoupleMode,
    hasCustomInstructions: !!customInstructions
  });

  const prompt = createPhotorealisticPrompt(refinedPrompt, {
    isCouple: isCoupleMode,
    customInstructions,
  });

  logBuilderStep(prefix, "Final Prompt Result", {
    promptLength: prompt.length,
    promptPreview: prompt.substring(0, 500),
    hasCustomInstructions: !!customInstructions,
    customInstructions,
  });

  return { prompt, refinedPrompt };
}
