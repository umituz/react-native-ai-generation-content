import { IDENTITY_PRESERVATION_CORE, NATURAL_POSE_GUIDELINES, PHOTOREALISTIC_RENDERING } from "../base/constants";

/**
 * Multi-person identity preservation rules
 * Ensures all people maintain their identities with strict rules
 */
export interface MultiPersonPreservationRules {
  requirement: string;
  perPersonRule: string;
  forbidden: string[];
  positioning: string;
}

export const MULTI_PERSON_PRESERVATION_RULES: MultiPersonPreservationRules = {
  requirement: "ALL individuals must have 100% identical facial appearance to their reference photos",
  perPersonRule: "Use EXACTLY the person from @imageN - preserve 100% identical facial features",
  forbidden: [
    "Do NOT swap, mix, or blend facial features between people",
    "Do NOT idealize or beautify any face",
    "Do NOT alter facial proportions or characteristics",
  ],
  positioning: "Natural positioning, all looking at camera with natural expressions",
};

/**
 * Creates ONLY the multi-person identity block (no full wrapping).
 * Used to inject into an already-structured prompt.
 */
export const createMultiPersonBlock = (personCount: number): string => {
  const personRefs = Array.from({ length: personCount }, (_, i) =>
    `Person ${i + 1}: @image${i + 1} - preserve 100% facial identity`
  ).join("\n  ");

  return `MULTI-PERSON IDENTITY PRESERVATION (${personCount} people):
{
  "requirement": "${MULTI_PERSON_PRESERVATION_RULES.requirement}",
  "references": [
    ${personRefs}
  ],
  "forbidden": ${JSON.stringify(MULTI_PERSON_PRESERVATION_RULES.forbidden)},
  "positioning": "${MULTI_PERSON_PRESERVATION_RULES.positioning}"
}`;
};

/**
 * Creates a multi-person prompt dynamically
 * Used as fallback when basePrompt is raw text (not already structured).
 *
 * @param scenarioPrompt - The scenario description
 * @param personCount - Number of people (1, 2, 3, N)
 * @returns Complete prompt with identity preservation for all people
 */
export const createMultiPersonPrompt = (
  scenarioPrompt: string,
  personCount: number,
): string => {
  return `${IDENTITY_PRESERVATION_CORE}

${createMultiPersonBlock(personCount)}

${PHOTOREALISTIC_RENDERING}

${NATURAL_POSE_GUIDELINES}

SCENARIO DESCRIPTION:
${scenarioPrompt}`;
};
