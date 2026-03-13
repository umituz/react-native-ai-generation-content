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
 * Refines a prompt for couple mode by replacing singular terms with plural ones.
 * Primarily used to fix "baked" prompts that were generated with singular defaults.
 */
export function refinePromptForCouple(prompt: string, isCouple: boolean): string {
  if (!isCouple) return prompt;

  return prompt
    .replace(/The person must be/g, "Both people must be")
    .replace(/the person is/gi, "both people are")
    .replace(/Keep every facial feature/g, "Keep every facial feature for both people")
    .replace(/the person/gi, "both people")
    .replace(/facial feature/gi, "facial features")
    .replace(/identical/g, "identical for both individuals")
    .replace(/instantly recognizable/g, "instantly recognizable as themselves");
}

