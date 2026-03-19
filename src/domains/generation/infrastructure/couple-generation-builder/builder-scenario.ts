/**
 * Couple Image Generation Builder - Scenario Generation
 *
 * Scenario generation için özel wrapper
 */

import {
  resolveCoupleInput,
  refinePromptForCouple,
  prependContext,
} from "../../../../infrastructure/utils/couple-input.util";
import { getAppearanceContext } from "../appearance-analysis";
import type {
  ScenarioGenerationInputParams,
  CoupleGenerationInput,
} from "./types";
import { logBuilderStart, logBuilderStep, logBuilderEnd } from "./utils";

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
  } = params;

  logBuilderStart("[ScenarioBuilder]", {
    isCoupleMode,
    scenarioPromptLength: scenarioPrompt.length,
    scenarioPromptPreview: scenarioPrompt.substring(0, 200),
    partner1Uri: partner1PhotoUri,
    partner2Uri: partner2PhotoUri,
  });

  // 1. GET PHOTO URIs
  const photoUris =
    isCoupleMode && partner2PhotoUri
      ? [partner1PhotoUri, partner2PhotoUri]
      : [partner1PhotoUri];

  logBuilderStep("[ScenarioBuilder]", "STEP 1: PHOTO URIs", {
    photoUrisCount: photoUris.length,
  });

  // 2. ANALYZE APPEARANCE
  logBuilderStep("[ScenarioBuilder]", "STEP 2: APPEARANCE ANALYSIS");

  const appearanceContext = await getAppearanceContext(
    photoUris,
    isCoupleMode,
  );

  logBuilderStep("[ScenarioBuilder]", "Appearance Analysis Result", {
    contextLength: appearanceContext.length,
    contextPreview: appearanceContext.length > 0 ? appearanceContext.substring(0, 150) : "No context (vision disabled)",
  });

  // 3. REFINE FOR COUPLE + PREPEND CONTEXT
  logBuilderStep("[ScenarioBuilder]", "STEP 3: REFINE & PREPEND CONTEXT");

  const refinedPrompt = refinePromptForCouple(scenarioPrompt, isCoupleMode);
  const finalPrompt = prependContext(refinedPrompt, appearanceContext);

  logBuilderStep("[ScenarioBuilder]", "Refined Prompt Result", {
    refinedPromptLength: refinedPrompt.length,
    finalPromptLength: finalPrompt.length,
    finalPromptPreview: finalPrompt.substring(0, 300),
  });

  // 4. RESOLVE COUPLE INPUT
  logBuilderStep("[ScenarioBuilder]", "STEP 4: RESOLVE COUPLE INPUT");

  const { target, imageUrls } = resolveCoupleInput(
    partner1PhotoUri,
    partner2PhotoUri,
    isCoupleMode,
    { model: "p-image-edit", providerId: "pruna" }, // Single target
    { model: "p-image-edit", providerId: "pruna" }, // Couple target
  );

  logBuilderStep("[ScenarioBuilder]", "Target Resolution Result", {
    targetModel: target.model,
    targetProvider: target.providerId,
    imageUrlsCount: imageUrls.length,
  });

  // 5. BUILD PARAMS - Scenario formatında
  logBuilderStep("[ScenarioBuilder]", "STEP 5: BUILD PARAMS", {
    aspectRatio: "3:4"
  });

  logBuilderEnd("[ScenarioBuilder]");

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
