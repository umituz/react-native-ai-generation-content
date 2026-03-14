/** Target for generation: which model on which provider */
export interface GenerationTargetLike {
  readonly model: string;
  readonly providerId: string;
}

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

/**
 * Prepends optional context (e.g. appearance analysis) to a base prompt.
 */
export function prependContext(
  basePrompt: string,
  context: string | undefined | null,
): string {
  return context ? `${context}\n\n${basePrompt}` : basePrompt;
}

/**
 * Refines a prompt for couple or solo mode by adjusting plurals and keywords.
 * Primarily used to fix "baked" prompts that were generated with a specific mode in mind.
 */
export function refinePromptForCouple(prompt: string, isCouple: boolean): string {
  if (typeof __DEV__ !== "undefined" && __DEV__) {
    console.log("[CoupleUtil] ===== REFINE PROMPT START =====");
    console.log("[CoupleUtil] Is couple mode:", isCouple);
    console.log("[CoupleUtil] Original prompt length:", prompt.length);
    console.log("[CoupleUtil] Original prompt preview:", prompt.substring(0, 200) + "...");
  }

  if (isCouple) {
    // Ensure couple context is present
    let refined = prompt
      .replace(/\bthe person must be\b/gi, "both people must be")
      .replace(/\bthe person is\b/gi, "both people are")
      .replace(/\bkeep every facial feature\b/gi, "keep every facial feature for both people")
      .replace(/\bthe person\b/gi, "both people")
      .replace(/\bfacial feature\b/gi, "facial features")
      .replace(/\bidentical\b/gi, "identical for both individuals")
      .replace(/\binstantly recognizable\b/gi, "instantly recognizable as themselves");

    // Special mapping for common couple scenarios: map "dress/gown" to person 1 and "suit/tuxedo" to person 2
    // this helps the AI map reference images correctly to the scene roles
    if (/\b(dress|gown)\b/i.test(refined) && /\b(suit|tuxedo|linen trousers)\b/i.test(refined)) {
      refined = refined
        .replace(/\b(dress|gown)\b/gi, "$1 (worn by Person 1)")
        .replace(/\b(suit|tuxedo|linen trousers)\b/gi, "$1 (worn by Person 2)");

      // Also add explicit mapping to the top if not already there
      if (!refined.includes("DIRECTIVE: MAP PHOTO 1 TO PERSON 1")) {
        refined = `DIRECTIVE: MAP PHOTO 1 TO PERSON 1, MAP PHOTO 2 TO PERSON 2\n\n${refined}`;
      }

      if (typeof __DEV__ !== "undefined" && __DEV__) {
        console.log("[CoupleUtil] ✅ Clothing mapping applied!");
        console.log("[CoupleUtil] ✅ Directive added for photo mapping");
      }
    }

    // If it doesn't already have couple-hints, add them at the start
    if (!/\b(couple|both|matching|dual|two people)\b/i.test(refined) && !refined.includes("DIRECTIVE:")) {
      refined = `A photo of a couple, ${refined}`;
      if (typeof __DEV__ !== "undefined" && __DEV__) {
        console.log("[CoupleUtil] ✅ Added 'A photo of a couple' prefix");
      }
    }

    if (typeof __DEV__ !== "undefined" && __DEV__) {
      console.log("[CoupleUtil] Refined prompt length:", refined.length);
      console.log("[CoupleUtil] Refined prompt preview:", refined.substring(0, 300) + "...");
      console.log("[CoupleUtil] ===== REFINE PROMPT END =====");
    }
    return refined;
  } else {
    // Solo mode: AGGRESSIVELY remove plural references to prevent "ghost" people
    const soloRefined = prompt
      // Instead of removing the clothing descriptions, just remove the gender labels
      // so the AI can apply the relevant clothing to the single person it sees.
      .replace(/\sfor women\b/gi, "")
      .replace(/\sfor men\b/gi, "")
      // Remove collective adjectives
      .replace(/\bmatching\b/gi, "")
      .replace(/\bcoordinated\b/gi, "")
      .replace(/\bcomplementary\b/gi, "")
      .replace(/\bcoordinating\b/gi, "")
      .replace(/\bcouple\b/gi, "person")
      .replace(/\bduo\b/gi, "person")
      .replace(/\bpair\b/gi, "person")
      .replace(/\bdoubles\b/gi, "")
      .replace(/\bboth\b/gi, "the person")
      .replace(/\bthey are\b/gi, "the person is")
      .replace(/\btheir\b/gi, "the person's")
      // Force singular clothing
      .replace(/\bjackets\b/gi, "jacket")
      .replace(/\boutfits\b/gi, "outfit")
      .replace(/\bsuits\b/gi, "suit")
      .replace(/\btuxedos\b/gi, "tuxedo")
      .replace(/\bgowns\b/gi, "gown")
      .replace(/\bdresses\b/gi, "dress")
      .replace(/\bsweaters\b/gi, "sweater")
      .replace(/\bhoodies\b/gi, "hoodie")
      .replace(/\bcoats\b/gi, "coat")
      .replace(/\bshirts\b/gi, "shirt")
      .replace(/\bhats\b/gi, "hat")
      .replace(/\baccessories\b/gi, "accessory")
      .replace(/\s+/g, ' ').trim();

    if (typeof __DEV__ !== "undefined" && __DEV__) {
      console.log("[CoupleUtil] ✅ Solo mode - removed all plural references");
      console.log("[CoupleUtil] Solo refined prompt length:", soloRefined.length);
      console.log("[CoupleUtil] ===== REFINE PROMPT END =====");
    }
    return soloRefined;
  }
}

