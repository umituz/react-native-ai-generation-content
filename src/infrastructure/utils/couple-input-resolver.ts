/**
 * Couple Input Utilities - Input Resolution
 */

import type { GenerationTargetLike } from "./couple-input-types";

interface CoupleInputResult {
  readonly target: GenerationTargetLike;
  readonly imageUrls: string[];
}

/**
 * Resolves generation target and image URLs based on couple/single mode.
 * Eliminates non-null assertions by narrowing partner2PhotoUri internally.
 */
export function resolveCoupleInput(
  partner1PhotoUri: string,
  partner2PhotoUri: string | null,
  isCoupleMode: boolean,
  singleTarget: GenerationTargetLike,
  coupleTarget: GenerationTargetLike,
): CoupleInputResult {
  const DEV = typeof __DEV__ !== "undefined" && __DEV__;

  if (DEV) {
    console.log("[CoupleUtil] ===== RESOLVE COUPLE INPUT =====");
    console.log("[CoupleUtil] Is couple mode:", isCoupleMode);
    console.log("[CoupleUtil] Has partner 2:", !!partner2PhotoUri);
    console.log("[CoupleUtil] Partner 1 URI:", partner1PhotoUri.substring(0, 60) + "...");
    if (partner2PhotoUri) {
      console.log("[CoupleUtil] Partner 2 URI:", partner2PhotoUri.substring(0, 60) + "...");
    }
    console.log("[CoupleUtil] Single target:", `${singleTarget.model}/${singleTarget.providerId}`);
    console.log("[CoupleUtil] Couple target:", `${coupleTarget.model}/${coupleTarget.providerId}`);
  }

  if (isCoupleMode && partner2PhotoUri) {
    const result = {
      target: coupleTarget,
      imageUrls: [partner1PhotoUri, partner2PhotoUri],
    };

    if (DEV) {
      console.log("[CoupleUtil] ===== COUPLE MODE SELECTED =====");
      console.log("[CoupleUtil] Target model:", result.target.model);
      console.log("[CoupleUtil] Target provider:", result.target.providerId);
      console.log("[CoupleUtil] Image URLs:", result.imageUrls.length);
      console.log("[CoupleUtil] Image 1:", result.imageUrls[0].substring(0, 60) + "...");
      console.log("[CoupleUtil] Image 2:", result.imageUrls[1].substring(0, 60) + "...");
      console.log("[CoupleUtil] ===== RESOLVE COMPLETE =====");
    }

    return result;
  }

  const result = {
    target: singleTarget,
    imageUrls: [partner1PhotoUri],
  };

  if (DEV) {
    console.log("[CoupleUtil] ===== SINGLE MODE SELECTED =====");
    console.log("[CoupleUtil] Target model:", result.target.model);
    console.log("[CoupleUtil] Target provider:", result.target.providerId);
    console.log("[CoupleUtil] Image URLs:", result.imageUrls.length);
    console.log("[CoupleUtil] Image 1:", result.imageUrls[0].substring(0, 60) + "...");
    console.log("[CoupleUtil] ===== RESOLVE COMPLETE =====");
  }

  return result;
}
