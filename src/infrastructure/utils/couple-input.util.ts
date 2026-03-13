/** Target for generation: which model on which provider */
interface GenerationTargetLike {
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
  if (isCoupleMode && partner2PhotoUri) {
    return {
      target: coupleTarget,
      imageUrls: [partner1PhotoUri, partner2PhotoUri],
    };
  }
  return {
    target: singleTarget,
    imageUrls: [partner1PhotoUri],
  };
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

    // If it doesn't already have couple-hints, add them at the start
    if (!/\b(couple|both|matching|dual|two people)\b/i.test(refined)) {
      refined = `A photo of a couple, ${refined}`;
    }
    return refined;
  } else {
    // Solo mode: AGGRESSIVELY remove plural references to prevent "ghost" people
    return prompt
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
  }
}

