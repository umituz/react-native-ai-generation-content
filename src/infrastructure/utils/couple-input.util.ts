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
