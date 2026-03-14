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
  const DEV = typeof __DEV__ !== "undefined" && __DEV__;

  const {
    partner1PhotoUri,
    partner2PhotoUri,
    isCoupleMode,
    basePrompt,
    customInstructions,
    aspectRatio = "3:4", // Standard portrait ratio like Wardrobe
    strength,
  } = params;

  if (DEV) {
    console.log("[CoupleBuilder] ========================================");
    console.log("[CoupleBuilder] ===== BUILD COUPLE GENERATION START =====");
    console.log("[CoupleBuilder] ========================================");
    console.log("[CoupleBuilder] ===== INPUT PARAMS =====");
    console.log("[CoupleBuilder] Is couple mode:", isCoupleMode);
    console.log("[CoupleBuilder] Base prompt length:", basePrompt.length);
    console.log("[CoupleBuilder] Base prompt preview:", basePrompt.substring(0, 200) + "...");
    console.log("[CoupleBuilder] Aspect ratio:", aspectRatio);
    console.log("[CoupleBuilder] Has partner 2:", !!partner2PhotoUri);
    console.log("[CoupleBuilder] Has custom instructions:", !!customInstructions);
    console.log("[CoupleBuilder] Has strength:", strength !== undefined);
    if (strength !== undefined) {
      console.log("[CoupleBuilder] Strength value:", strength);
    }
    console.log("[CoupleBuilder] Partner 1 URI:", partner1PhotoUri.substring(0, 80) + "...");
    if (partner2PhotoUri) {
      console.log("[CoupleBuilder] Partner 2 URI:", partner2PhotoUri.substring(0, 80) + "...");
    }
  }

  // 1. GET PHOTO URIs - Couple mode kontrolü
  const photoUris =
    isCoupleMode && partner2PhotoUri
      ? [partner1PhotoUri, partner2PhotoUri]
      : [partner1PhotoUri];

  if (DEV) {
    console.log("[CoupleBuilder] ===== STEP 1: PHOTO URIs =====");
    console.log("[CoupleBuilder] Photo URIs count:", photoUris.length);
    console.log("[CoupleBuilder] Photo 1:", photoUris[0].substring(0, 60) + "...");
    if (photoUris.length > 1) {
      console.log("[CoupleBuilder] Photo 2:", photoUris[1].substring(0, 60) + "...");
    }
  }

  // 2. ANALYZE APPEARANCE - Wardrobe'daki gibi
  // Fotoğrafları analiz et ve context çıkar
  if (DEV) {
    console.log("[CoupleBuilder] ===== STEP 2: APPEARANCE ANALYSIS =====");
    console.log("[CoupleBuilder] Calling getAppearanceContext with:", {
      photoCount: photoUris.length,
      isCoupleMode
    });
  }

  const appearanceContext = await getAppearanceContext(
    photoUris,
    isCoupleMode,
  );

  if (DEV) {
    console.log("[CoupleBuilder] Appearance context length:", appearanceContext.length);
    if (appearanceContext.length > 0) {
      console.log("[CoupleBuilder] Appearance context preview:", appearanceContext.substring(0, 150) + "...");
    } else {
      console.log("[CoupleBuilder] ℹ️ No appearance context returned (vision disabled)");
    }
  }

  // 3. REFINE FOR COUPLE + PREPEND CONTEXT - Wardrobe mantığı
  // Coupler modu için prompt'u iyileştir ve context'i ekle
  if (DEV) {
    console.log("[CoupleBuilder] ===== STEP 3: REFINE & PREPEND CONTEXT =====");
    console.log("[CoupleBuilder] Calling refinePromptForCouple with:", {
      basePromptLength: basePrompt.length,
      isCoupleMode
    });
  }

  const refinedPrompt = prependContext(
    refinePromptForCouple(basePrompt, isCoupleMode),
    appearanceContext,
  );

  if (DEV) {
    console.log("[CoupleBuilder] After refinePromptForCouple + prependContext:");
    console.log("[CoupleBuilder] Refined prompt length:", refinedPrompt.length);
    console.log("[CoupleBuilder] Refined prompt preview:", refinedPrompt.substring(0, 300) + "...");
  }

  // 4. CREATE FINAL PROMPT - Photorealistic
  if (DEV) {
    console.log("[CoupleBuilder] ===== STEP 4: CREATE PHOTOREALISTIC PROMPT =====");
    console.log("[CoupleBuilder] Calling createPhotorealisticPrompt with:", {
      isCouple: isCoupleMode,
      hasCustomInstructions: !!customInstructions
    });
  }

  const prompt = createPhotorealisticPrompt(refinedPrompt, {
    isCouple: isCoupleMode,
    customInstructions,
  });

  if (DEV) {
    console.log("[CoupleBuilder] Final prompt length:", prompt.length);
    console.log("[CoupleBuilder] Final prompt preview:", prompt.substring(0, 500) + "...");
    console.log("[CoupleBuilder] Has custom instructions:", !!customInstructions);
    if (customInstructions) {
      console.log("[CoupleBuilder] Custom instructions:", customInstructions);
    }
  }

  // 5. RESOLVE COUPLE INPUT - Doğru target ve image'lar
  if (DEV) {
    console.log("[CoupleBuilder] ===== STEP 5: RESOLVE COUPLE INPUT =====");
    console.log("[CoupleBuilder] Calling resolveCoupleInput with:", {
      partner1PhotoUri: partner1PhotoUri.substring(0, 50) + "...",
      partner2PhotoUri: partner2PhotoUri ? partner2PhotoUri.substring(0, 50) + "..." : null,
      isCoupleMode,
      singleTarget: "p-image-edit/pruna",
      coupleTarget: "p-image-edit/pruna"
    });
  }

  const { target, imageUrls } = resolveCoupleInput(
    partner1PhotoUri,
    partner2PhotoUri,
    isCoupleMode,
    { model: "p-image-edit", providerId: "pruna" }, // Single target
    { model: "p-image-edit", providerId: "pruna" }, // Couple target
  );

  if (DEV) {
    console.log("[CoupleBuilder] Target resolution result:");
    console.log("[CoupleBuilder] Target model:", target.model);
    console.log("[CoupleBuilder] Target provider:", target.providerId);
    console.log("[CoupleBuilder] Image URLs count:", imageUrls.length);
    console.log("[CoupleBuilder] Image 1:", imageUrls[0]?.substring(0, 80) + "...");
    if (imageUrls.length > 1) {
      console.log("[CoupleBuilder] Image 2:", imageUrls[1]?.substring(0, 80) + "...");
    }
  }

  // 6. BUILD PARAMS - Wardrobe formatında
  if (DEV) {
    console.log("[CoupleBuilder] ===== STEP 6: BUILD PARAMS =====");
  }

  const genParams: Record<string, unknown> = {
    prompt,
    image_urls: imageUrls,
    aspect_ratio: aspectRatio,
  };

  // Optional strength parameter
  if (strength !== undefined) {
    genParams.strength = strength;
  }

  if (DEV) {
    console.log("[CoupleBuilder] Final params structure:");
    console.log("[CoupleBuilder] Keys:", Object.keys(genParams).join(", "));
    console.log("[CoupleBuilder] 'image_urls' count:", Array.isArray(genParams.image_urls) ? genParams.image_urls.length : "N/A");
    console.log("[CoupleBuilder] 'aspect_ratio':", genParams.aspect_ratio);
    console.log("[CoupleBuilder] 'strength':", genParams.strength ?? "not set");
    console.log("[CoupleBuilder] ========================================");
    console.log("[CoupleBuilder] ===== BUILD COUPLE GENERATION END =====");
    console.log("[CoupleBuilder] ========================================");
    console.log("[CoupleBuilder] Returning: { target, prompt, params }");
    console.log("");
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
  const DEV = typeof __DEV__ !== "undefined" && __DEV__;

  const {
    partner1PhotoUri,
    partner2PhotoUri,
    isCoupleMode,
    scenarioPrompt,
  } = params;

  if (DEV) {
    console.log("[ScenarioBuilder] ========================================");
    console.log("[ScenarioBuilder] ===== BUILD SCENARIO GENERATION START =====");
    console.log("[ScenarioBuilder] ========================================");
    console.log("[ScenarioBuilder] ===== INPUT PARAMS =====");
    console.log("[ScenarioBuilder] Is couple mode:", isCoupleMode);
    console.log("[ScenarioBuilder] Scenario prompt length:", scenarioPrompt.length);
    console.log("[ScenarioBuilder] Scenario prompt preview:", scenarioPrompt.substring(0, 200) + "...");
    console.log("[ScenarioBuilder] Partner 1 URI:", partner1PhotoUri.substring(0, 80) + "...");
    if (partner2PhotoUri) {
      console.log("[ScenarioBuilder] Partner 2 URI:", partner2PhotoUri.substring(0, 80) + "...");
    }
  }

  // 1. GET PHOTO URIs
  const photoUris =
    isCoupleMode && partner2PhotoUri
      ? [partner1PhotoUri, partner2PhotoUri]
      : [partner1PhotoUri];

  if (DEV) {
    console.log("[ScenarioBuilder] ===== STEP 1: PHOTO URIs =====");
    console.log("[ScenarioBuilder] Photo URIs count:", photoUris.length);
  }

  // 2. ANALYZE APPEARANCE
  if (DEV) {
    console.log("[ScenarioBuilder] ===== STEP 2: APPEARANCE ANALYSIS =====");
  }

  const appearanceContext = await getAppearanceContext(
    photoUris,
    isCoupleMode,
  );

  if (DEV) {
    console.log("[ScenarioBuilder] Appearance context length:", appearanceContext.length);
    if (appearanceContext.length > 0) {
      console.log("[ScenarioBuilder] Appearance context preview:", appearanceContext.substring(0, 150) + "...");
    } else {
      console.log("[ScenarioBuilder] ℹ️ No appearance context (vision disabled)");
    }
  }

  // 3. REFINE FOR COUPLE + PREPEND CONTEXT
  // Senaryo prompt'unu (zaten photorealistic) dynamic context ile birleştir
  if (DEV) {
    console.log("[ScenarioBuilder] ===== STEP 3: REFINE & PREPEND CONTEXT =====");
    console.log("[ScenarioBuilder] Calling refinePromptForCouple...");
  }

  const refinedPrompt = refinePromptForCouple(scenarioPrompt, isCoupleMode);
  const finalPrompt = prependContext(refinedPrompt, appearanceContext);

  if (DEV) {
    console.log("[ScenarioBuilder] After refinePromptForCouple length:", refinedPrompt.length);
    console.log("[ScenarioBuilder] After prependContext length:", finalPrompt.length);
    console.log("[ScenarioBuilder] Final prompt preview:", finalPrompt.substring(0, 300) + "...");
  }

  // 4. RESOLVE COUPLE INPUT
  if (DEV) {
    console.log("[ScenarioBuilder] ===== STEP 4: RESOLVE COUPLE INPUT =====");
  }

  const { target, imageUrls } = resolveCoupleInput(
    partner1PhotoUri,
    partner2PhotoUri,
    isCoupleMode,
    { model: "p-image-edit", providerId: "pruna" }, // Single target
    { model: "p-image-edit", providerId: "pruna" }, // Couple target
  );

  if (DEV) {
    console.log("[ScenarioBuilder] Target:", target.model, "/", target.providerId);
    console.log("[ScenarioBuilder] Image URLs count:", imageUrls.length);
  }

  // 5. BUILD PARAMS - Scenario formatında
  if (DEV) {
    console.log("[ScenarioBuilder] ===== STEP 5: BUILD PARAMS =====");
    console.log("[ScenarioBuilder] Aspect ratio: 3:4");
    console.log("[ScenarioBuilder] ========================================");
    console.log("[ScenarioBuilder] ===== BUILD SCENARIO GENERATION END =====");
    console.log("[ScenarioBuilder] ========================================");
    console.log("");
  }

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
