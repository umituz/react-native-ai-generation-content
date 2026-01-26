import { IDENTITY_PRESERVATION_CORE, NATURAL_POSE_GUIDELINES, PHOTOREALISTIC_RENDERING } from "./BasePromptStructure";

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
 * Genetic blend rules for child prediction scenarios
 * Creates a new face by blending features from parent photos
 */
export const GENETIC_BLEND_RULES = {
  requirement: "Create a NEW child face by intelligently blending genetic features from both parents",
  blendingRules: [
    "Analyze facial features from @image1 (parent 1) and @image2 (parent 2)",
    "Create a realistic genetic combination - mix eye shape, nose, lips, face structure",
    "The child should look like a natural offspring of both parents",
    "Use realistic child proportions appropriate for the specified age",
  ],
  forbidden: [
    "Do NOT copy either parent's face directly",
    "Do NOT create an adult face - maintain child proportions",
    "Do NOT ignore either parent's features - blend from both",
  ],
};

/**
 * Creates a multi-person prompt dynamically
 *
 * @param scenarioPrompt - The scenario description
 * @param personCount - Number of people (1, 2, 3, N)
 * @returns Complete prompt with identity preservation for all people
 */
export const createMultiPersonPrompt = (
  scenarioPrompt: string,
  personCount: number,
): string => {
  const personRefs = Array.from({ length: personCount }, (_, i) =>
    `Person ${i + 1}: @image${i + 1} - preserve 100% facial identity`
  ).join("\n  ");

  return `${IDENTITY_PRESERVATION_CORE}

MULTI-PERSON IDENTITY PRESERVATION (${personCount} people):
{
  "requirement": "${MULTI_PERSON_PRESERVATION_RULES.requirement}",
  "references": [
    ${personRefs}
  ],
  "forbidden": ${JSON.stringify(MULTI_PERSON_PRESERVATION_RULES.forbidden)},
  "positioning": "${MULTI_PERSON_PRESERVATION_RULES.positioning}"
}

${PHOTOREALISTIC_RENDERING}

${NATURAL_POSE_GUIDELINES}

SCENARIO DESCRIPTION:
${scenarioPrompt}`;
};

/**
 * Creates a genetic blend prompt for child prediction scenarios
 * Instead of preserving identities, it blends parent features to create a child
 *
 * @param scenarioPrompt - The scenario description
 * @returns Complete prompt with genetic blending instructions
 */
export const createGeneticBlendPrompt = (scenarioPrompt: string): string => {
  return `GENETIC BLEND CHILD PREDICTION (HIGHEST PRIORITY):
{
  "policy": "CREATE NEW CHILD FACE FROM PARENT GENETICS",
  "requirement": "${GENETIC_BLEND_RULES.requirement}",
  "blending_rules": ${JSON.stringify(GENETIC_BLEND_RULES.blendingRules)},
  "parent_references": {
    "parent_1": "@image1 - extract genetic features (eye color, face shape, skin tone)",
    "parent_2": "@image2 - extract genetic features (eye color, face shape, skin tone)"
  },
  "forbidden": ${JSON.stringify(GENETIC_BLEND_RULES.forbidden)},
  "output": "A realistic child that is a natural genetic combination of both parents"
}

${PHOTOREALISTIC_RENDERING}

SCENARIO DESCRIPTION:
${scenarioPrompt}`;
};
