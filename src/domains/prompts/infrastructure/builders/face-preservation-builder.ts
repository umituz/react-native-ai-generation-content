/**
 * Face Preservation Prompt Builder
 * Dynamic prompt builder for AI image generation with strict face identity preservation
 * Supports any number of people (1, 2, 3, N)
 *
 * SINGLE RESPONSIBILITY: Face identity preservation ONLY
 * - Face identity lock techniques
 * - @imageN reference anchors
 * - Explicit preservation and negative constraints
 *
 * For interaction/positioning rules, use interaction-style-builder.ts
 */

// =============================================================================
// Types
// =============================================================================

export interface FacePreservationOptions {
  /** The scenario/scene description */
  scenarioPrompt: string;
  /** Number of people in the generation */
  personCount: number;
  /** Optional custom preservation rules from main app */
  customRules?: string[];
  /** Optional custom forbidden actions from main app */
  customForbidden?: string[];
}

// =============================================================================
// Constants
// =============================================================================

const FACE_LOCK_RULES = [
  "Face identity locked - exact facial structure must be preserved",
  "Same jawline, eye shape, eye color, nose, lips, skin tone",
  "No facial morphing, no face swap, no face modification",
  "Identity consistency enabled - high facial similarity required",
] as const;

const FORBIDDEN_ACTIONS = [
  "Do NOT generate a new face",
  "Do NOT modify facial structure or proportions",
  "Do NOT alter skin tone, texture, or natural marks",
  "Do NOT smooth skin or remove natural features",
  "Do NOT change eye color or shape",
] as const;

// =============================================================================
// Builder Functions
// =============================================================================

/**
 * Generate person reference instructions for N people
 */
function buildPersonReferences(count: number): string {
  if (count === 1) {
    return "Use @image1 as the ONLY reference. The face must remain 100% identical to this image.";
  }

  const refs = Array.from({ length: count }, (_, i) => {
    const num = i + 1;
    return `Person ${num}: Use @image${num} - preserve 100% identical facial appearance`;
  });

  return refs.join("\n");
}

/**
 * Build face preservation prompt dynamically
 * Supports any number of people (1, 2, 3, N)
 */
export function buildFacePreservationPrompt(options: FacePreservationOptions): string {
  const { scenarioPrompt, personCount, customRules, customForbidden } = options;

  const rules = [...FACE_LOCK_RULES, ...(customRules ?? [])];
  const forbidden = [...FORBIDDEN_ACTIONS, ...(customForbidden ?? [])];

  const personRefs = buildPersonReferences(personCount);
  const personWord = personCount === 1 ? "person" : "people";

  return `CRITICAL FACE PRESERVATION: Create a photorealistic image of EXACTLY the ${personCount} ${personWord} from the provided reference photo${personCount > 1 ? "s" : ""}.

REFERENCE IMAGES:
${personRefs}

FACE LOCK RULES:
${rules.map((r) => `- ${r}`).join("\n")}

FORBIDDEN:
${forbidden.map((f) => `- ${f}`).join("\n")}

SCENARIO:
${scenarioPrompt}

OUTPUT REQUIREMENTS:
- Photorealistic photograph quality (professional DSLR)
- Natural expressions and poses
- High resolution, detailed textures
- Each person's face must be 100% identical to their reference photo

FINAL VERIFICATION: Before output, confirm all faces match reference images exactly.`;
}

/**
 * Build a minimal face preservation prompt (for API character limits)
 */
export function buildMinimalFacePreservationPrompt(options: FacePreservationOptions): string {
  const { scenarioPrompt, personCount } = options;
  const personRefs = buildPersonReferences(personCount);

  return `FACE IDENTITY LOCK: ${personCount} person(s) from reference photos.
${personRefs}
RULES: Preserve 100% facial identity, no modifications.
SCENARIO: ${scenarioPrompt}
OUTPUT: Photorealistic, faces identical to references.`;
}
