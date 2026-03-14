/**
 * Couple Image Generation Builder
 *
 * Wardrobe'da kusursuz çalışan mantığı tüm couple generation için paylaştırır.
 * Bu utility'yi tüm çift görüntü oluşturma işlemleri kullanır.
 *
 * Kullanım alanları:
 * - Senaryo generation (Home couple images)
 * - Wardrobe generation
 * - Background generation
 * - Art style generation
 * - Mood filter generation
 */

import type { GenerationTarget } from "../../../exports/presentation";
import {
  resolveCoupleInput,
  prependContext,
  refinePromptForCouple,
} from "../../../infrastructure/utils/couple-input.util";
import type { GenerationTargetLike } from "../../../infrastructure/utils/couple-input.util";
import { createPhotorealisticPrompt } from "../../prompts";
import { getAppearanceContext } from "./appearance-analysis";

/**
 * Couple generation input parameters
 */
export interface CoupleGenerationInputParams {
  // Required params
  partner1PhotoUri: string;
  partner2PhotoUri: string | null;
  isCoupleMode: boolean;
  basePrompt: string; // Scenario prompt, wardrobe prompt, background prompt, etc.

  // Optional params
  customInstructions?: string;
  aspectRatio?: string; // Default: "3:4"
  strength?: number; // Optional strength for some operations
}

/**
 * Couple generation result
 */
export interface CoupleGenerationInput {
  target: GenerationTargetLike;
  prompt: string;
  params: Record<string, unknown>;
}

/**
 * Scenario generation input parameters
 */
export interface ScenarioGenerationInputParams {
  partner1PhotoUri: string;
  partner2PhotoUri: string | null;
  isCoupleMode: boolean;
  scenarioPrompt: string; // Senaryo prompt'u (aiPrompt)
  customInstructions?: string;
}

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
  const {
    partner1PhotoUri,
    partner2PhotoUri,
    isCoupleMode,
    basePrompt,
    customInstructions,
    aspectRatio = "3:4", // Standard portrait ratio like Wardrobe
    strength,
  } = params;

  // 1. GET PHOTO URIs - Couple mode kontrolü
  const photoUris =
    isCoupleMode && partner2PhotoUri
      ? [partner1PhotoUri, partner2PhotoUri]
      : [partner1PhotoUri];

  // 2. ANALYZE APPEARANCE - Wardrobe'daki gibi
  // Fotoğrafları analiz et ve context çıkar
  const appearanceContext = await getAppearanceContext(
    photoUris,
    isCoupleMode,
  );

  // 3. REFINE FOR COUPLE + PREPEND CONTEXT - Wardrobe mantığı
  // Coupler modu için prompt'u iyileştir ve context'i ekle
  const refinedPrompt = prependContext(
    refinePromptForCouple(basePrompt, isCoupleMode),
    appearanceContext,
  );

  // 4. CREATE FINAL PROMPT - Photorealistic
  const prompt = createPhotorealisticPrompt(refinedPrompt, {
    isCouple: isCoupleMode,
    customInstructions,
  });

  // 5. RESOLVE COUPLE INPUT - Doğru target ve image'lar
  const { target, imageUrls } = resolveCoupleInput(
    partner1PhotoUri,
    partner2PhotoUri,
    isCoupleMode,
    { model: "p-image-edit", providerId: "pruna" }, // Single target
    { model: "p-image-edit", providerId: "pruna" }, // Couple target
  );

  // 6. BUILD PARAMS - Wardrobe formatında
  const genParams: Record<string, unknown> = {
    prompt,
    image_urls: imageUrls,
    aspect_ratio: aspectRatio,
  };

  // Optional strength parameter
  if (strength !== undefined) {
    genParams.strength = strength;
  }

  return {
    target,
    prompt,
    params: genParams,
  };
}

/**
 * Scenario generation için özel wrapper
 *
 * Senaryo aiPrompt'larını (zaten createPhotorealisticPrompt ile oluşturulmuş)
 * Wardrobe mantığı ile birleştirir.
 */
export async function buildScenarioGenerationInput(
  params: ScenarioGenerationInputParams,
): Promise<CoupleGenerationInput> {
  const {
    partner1PhotoUri,
    partner2PhotoUri,
    isCoupleMode,
    scenarioPrompt,
    customInstructions,
  } = params;

  // 1. GET PHOTO URIs
  const photoUris =
    isCoupleMode && partner2PhotoUri
      ? [partner1PhotoUri, partner2PhotoUri]
      : [partner1PhotoUri];

  // 2. ANALYZE APPEARANCE
  const appearanceContext = await getAppearanceContext(
    photoUris,
    isCoupleMode,
  );

  // 3. REFINE FOR COUPLE + PREPEND CONTEXT
  // Senaryo prompt'unu (zaten photorealistic) dynamic context ile birleştir
  const finalPrompt = prependContext(
    refinePromptForCouple(scenarioPrompt, isCoupleMode),
    appearanceContext,
  );

  // 4. RESOLVE COUPLE INPUT
  const { target, imageUrls } = resolveCoupleInput(
    partner1PhotoUri,
    partner2PhotoUri,
    isCoupleMode,
    { model: "p-image-edit", providerId: "pruna" }, // Single target
    { model: "p-image-edit", providerId: "pruna" }, // Couple target
  );

  // 5. BUILD PARAMS - Scenario formatında
  return {
    target,
    prompt: finalPrompt,
    params: {
      prompt: finalPrompt,
      image_urls: imageUrls,
      aspect_ratio: "3:4",
    },
  };
}
