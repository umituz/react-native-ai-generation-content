/**
 * Couple Image Generation Builder - Input Resolution
 *
 * Handles target resolution and final input building
 */

import {
  resolveCoupleInput,
} from "../../../../infrastructure/utils/couple-input.util";
import { logBuilderStep, logBuilderEnd } from "./utils";
import type {
  CoupleGenerationInputParams,
  CoupleGenerationInput,
} from "./types";

/**
 * Build final couple generation input with resolved target and parameters
 */
export function buildCoupleGenerationResult(
  params: CoupleGenerationInputParams,
  prompt: string,
  prefix: string = "[CoupleBuilder]",
): CoupleGenerationInput {
  const {
    partner1PhotoUri,
    partner2PhotoUri,
    isCoupleMode,
    aspectRatio = "3:4",
    strength,
  } = params;

  // 5. RESOLVE COUPLE INPUT - Doğru target ve image'lar
  logBuilderStep(prefix, "STEP 5: RESOLVE COUPLE INPUT", {
    partner1Uri: partner1PhotoUri,
    partner2Uri: partner2PhotoUri,
    isCoupleMode,
    singleTarget: "p-image-edit/pruna",
    coupleTarget: "p-image-edit/pruna"
  });

  const { target, imageUrls } = resolveCoupleInput(
    partner1PhotoUri,
    partner2PhotoUri,
    isCoupleMode,
    { model: "p-image-edit", providerId: "pruna" }, // Single target
    { model: "p-image-edit", providerId: "pruna" }, // Couple target
  );

  logBuilderStep(prefix, "Target Resolution Result", {
    targetModel: target.model,
    targetProvider: target.providerId,
    imageUrlsCount: imageUrls.length,
    image1: imageUrls[0],
    image2: imageUrls[1],
  });

  // 6. BUILD PARAMS - Wardrobe formatında
  logBuilderStep(prefix, "STEP 6: BUILD PARAMS", {
    prompt,
    imageUrls,
    aspectRatio,
    strength,
  });

  logBuilderEnd(prefix);

  return {
    target,
    prompt,
    params: {
      prompt,
      image_urls: imageUrls,
      aspect_ratio: aspectRatio,
      ...(strength !== undefined && { strength }),
    },
  };
}
