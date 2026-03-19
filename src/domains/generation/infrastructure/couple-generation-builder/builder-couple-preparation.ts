/**
 * Couple Image Generation Builder - Preparation Phase
 *
 * Handles photo URI extraction and appearance analysis
 */

import { getAppearanceContext } from "../appearance-analysis";
import { logBuilderStep } from "./utils";
import type { CoupleGenerationInputParams } from "./types";

export interface CouplePreparationResult {
  photoUris: string[];
  appearanceContext: string;
}

/**
 * Prepare photo URIs and analyze appearance
 */
export async function prepareCoupleGeneration(
  params: CoupleGenerationInputParams,
  prefix: string = "[CoupleBuilder]",
): Promise<CouplePreparationResult> {
  const {
    partner1PhotoUri,
    partner2PhotoUri,
    isCoupleMode,
  } = params;

  // 1. GET PHOTO URIs - Couple mode kontrolü
  const photoUris =
    isCoupleMode && partner2PhotoUri
      ? [partner1PhotoUri, partner2PhotoUri]
      : [partner1PhotoUri];

  logBuilderStep(prefix, "STEP 1: PHOTO URIs", {
    photoUrisCount: photoUris.length,
    photo1: photoUris[0],
    photo2: photoUris[1],
  });

  // 2. ANALYZE APPEARANCE - Wardrobe'daki gibi
  logBuilderStep(prefix, "STEP 2: APPEARANCE ANALYSIS", {
    photoCount: photoUris.length,
    isCoupleMode
  });

  const appearanceContext = await getAppearanceContext(
    photoUris,
    isCoupleMode,
  );

  logBuilderStep(prefix, "Appearance Analysis Result", {
    contextLength: appearanceContext.length,
    contextPreview: appearanceContext.substring(0, 150),
  });

  return { photoUris, appearanceContext };
}
