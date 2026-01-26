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
 * Optimized for FAL AI / Nano Banana Edit semantic understanding
 */
export const GENETIC_BLEND_RULES = {
  requirement: "Create a COMPLETELY NEW child face by intelligently blending genetic features from both parents",
  blendingRules: [
    "Extract and analyze facial genetics from parent 1 (eye color, face shape, skin tone, hair color)",
    "Extract and analyze facial genetics from parent 2 (eye color, face shape, skin tone, hair color)",
    "Generate a NEW child face that naturally combines inherited traits from BOTH parents",
    "The child must look like a realistic biological offspring - not a copy of either parent",
    "Apply realistic child facial proportions (larger eyes, rounder cheeks, smaller nose)",
  ],
  forbidden: [
    "NEVER show or copy either parent's face in the output",
    "NEVER use parent photos directly - only extract genetic features for blending",
    "Do NOT create an adult face - maintain child proportions",
    "Do NOT favor one parent over the other - blend features equally",
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
 * Optimized for FAL AI Nano Banana Edit's semantic understanding
 *
 * @param scenarioPrompt - The scenario description
 * @returns Complete prompt with genetic blending instructions
 */
export const createGeneticBlendPrompt = (scenarioPrompt: string): string => {
  return `GENETIC CHILD PREDICTION - CRITICAL INSTRUCTIONS:

You are creating a PREDICTION of what a child would look like based on two parent reference images.

IMPORTANT: This is NOT a face swap or identity preservation task.
- The parent photos are ONLY for extracting genetic traits (eye color, face shape, skin tone, hair)
- You must CREATE a completely NEW child face that combines features from BOTH parents
- The output should show ONLY the child - never show or copy the parent faces

GENETIC EXTRACTION FROM REFERENCE IMAGES:
- From reference image 1: Extract eye color, face shape, skin tone, hair color/texture
- From reference image 2: Extract eye color, face shape, skin tone, hair color/texture

CHILD GENERATION RULES:
${GENETIC_BLEND_RULES.blendingRules.map(rule => `- ${rule}`).join("\n")}

STRICTLY FORBIDDEN:
${GENETIC_BLEND_RULES.forbidden.map(rule => `- ${rule}`).join("\n")}

${PHOTOREALISTIC_RENDERING}

SCENARIO TO GENERATE:
${scenarioPrompt}`;
};
