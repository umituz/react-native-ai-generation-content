/**
 * Couple Image Generation Builder - Couple Generation
 *
 * Merkezi couple generation input builder
 */

import type {
  CoupleGenerationInputParams,
  CoupleGenerationInput,
} from "./types";
import { logBuilderStart } from "./utils";
import { prepareCoupleGeneration } from "./builder-couple-preparation";
import { processCouplePrompt } from "./builder-couple-prompt";
import { buildCoupleGenerationResult } from "./builder-couple-resolution";

/**
 * Merkezi couple generation input builder
 *
 * Wardrobe mantığını tüm couple generation için paylaştırır:
 * 1. Appearance analysis (fotoğrafları analiz et)
 * 2. Couple refinement (çift modu için iyileştir)
 * 3. Context prepending (context'i prompt'a ekle)
 * 4. Photorealistic prompt creation
 * 5. Couple input resolution (doğru target ve image'lar)
 *
 * @param params - Generation parameters
 * @returns Generation input with target, prompt, and params
 */
export async function buildCoupleGenerationInput(
  params: CoupleGenerationInputParams,
): Promise<CoupleGenerationInput> {
  const prefix = "[CoupleBuilder]";

  logBuilderStart(prefix, {
    isCoupleMode: params.isCoupleMode,
    basePromptLength: params.basePrompt.length,
    aspectRatio: params.aspectRatio,
    hasPartner2: !!params.partner2PhotoUri,
    hasCustomInstructions: !!params.customInstructions,
    hasStrength: params.strength !== undefined,
    strength: params.strength,
    partner1Uri: params.partner1PhotoUri,
    partner2Uri: params.partner2PhotoUri,
  });

  // Phase 1: Prepare photo URIs and analyze appearance
  const { photoUris, appearanceContext } = await prepareCoupleGeneration(params, prefix);

  // Phase 2: Process and refine prompt
  const { prompt } = processCouplePrompt(params, appearanceContext, prefix);

  // Phase 3: Build final result with resolved target
  return buildCoupleGenerationResult(params, prompt, prefix);
}
