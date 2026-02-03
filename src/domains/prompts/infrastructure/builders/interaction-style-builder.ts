/**
 * Interaction Style Prompt Builder
 * Dynamic prompt builder for AI image generation with interaction/positioning rules
 * Supports any number of people (1, 2, 3, N) and interaction styles
 *
 * Separate from face preservation - this handles:
 * - Body positioning and proximity
 * - Emotional expressions
 * - Body language and poses
 * - Interaction rules between people
 */

// =============================================================================
// Types
// =============================================================================

/** Interaction style between people in the image */
export type InteractionStyle = "friendly" | "professional" | "neutral";

export interface InteractionStyleOptions {
  /** Interaction style between people */
  style: InteractionStyle;
  /** Number of people in the generation */
  personCount: number;
  /** Optional custom rules from main app */
  customRules?: string[];
  /** Optional custom forbidden actions from main app */
  customForbidden?: string[];
}

// =============================================================================
// Constants
// =============================================================================

/** Interaction style rules - what TO DO for each style */
const INTERACTION_RULES: Record<InteractionStyle, readonly string[]> = {
  friendly: [
    "Casual comfortable proximity",
    "Genuine friendly smiles",
    "Relaxed natural poses",
    "Warm friendly body language",
    "Standing or sitting close to each other comfortably",
  ],
  professional: [
    "Appropriate professional distance",
    "Confident pleasant expressions",
    "Professional posture and positioning",
    "Formal but friendly body language",
  ],
  neutral: [],
};

/** Interaction style forbidden - what NOT to do for each style */
const INTERACTION_FORBIDDEN: Record<InteractionStyle, readonly string[]> = {
  friendly: [
    "Do NOT use cold or unfriendly expressions",
    "Do NOT create awkward distancing",
    "Do NOT make poses stiff or formal",
  ],
  professional: [
    "Do NOT use overly casual positioning",
    "Do NOT use sloppy or unprofessional poses",
  ],
  neutral: [],
};

// =============================================================================
// Builder Functions
// =============================================================================

/**
 * Get interaction rules for a given style
 */
export function getInteractionRules(
  style: InteractionStyle,
): readonly string[] {
  return INTERACTION_RULES[style];
}

/**
 * Get forbidden actions for a given style
 */
export function getInteractionForbidden(
  style: InteractionStyle,
): readonly string[] {
  return INTERACTION_FORBIDDEN[style];
}

/**
 * Build interaction style prompt section
 * Can be appended to any prompt (face preservation, scenario, etc.)
 */
export function buildInteractionStylePrompt(
  options: InteractionStyleOptions,
): string {
  const { style, personCount, customRules, customForbidden } = options;

  // No rules for neutral or single person
  if (style === "neutral" || personCount < 2) {
    return "";
  }

  const rules = [...INTERACTION_RULES[style], ...(customRules ?? [])];
  const forbidden = [...INTERACTION_FORBIDDEN[style], ...(customForbidden ?? [])];

  if (rules.length === 0 && forbidden.length === 0) {
    return "";
  }

  const sections: string[] = [];

  sections.push(`INTERACTION STYLE: ${style.toUpperCase()}`);

  if (rules.length > 0) {
    sections.push(`POSITIONING RULES:\n${rules.map((r) => `- ${r}`).join("\n")}`);
  }

  if (forbidden.length > 0) {
    sections.push(
      `POSITIONING FORBIDDEN:\n${forbidden.map((f) => `- ${f}`).join("\n")}`,
    );
  }

  return sections.join("\n\n");
}

/**
 * Build a minimal interaction style prompt (for API character limits)
 */
export function buildMinimalInteractionStylePrompt(
  options: InteractionStyleOptions,
): string {
  const { style, personCount } = options;

  if (style === "neutral" || personCount < 2) {
    return "";
  }

  const styleDescriptions: Record<InteractionStyle, string> = {
    friendly: "casual proximity, friendly smiles, relaxed poses",
    professional: "appropriate distance, confident expressions",
    neutral: "",
  };

  return `STYLE: ${style} - ${styleDescriptions[style]}`;
}
