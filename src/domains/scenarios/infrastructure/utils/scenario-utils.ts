/**
 * Scenario Data Utils
 * Helper functions for scenario creation
 */

/**
 * Photorealistic prompt constants for high-quality AI image generation
 * These ensure consistent, realistic output across all scenarios
 */
export const PHOTOREALISTIC_BASE = {
  quality: "photorealistic",
  lighting: "cinematic lighting",
} as const;

/**
 * Creative prompt constants for non-realistic AI generation
 * Used for meme, cartoon, or stylized content generation
 */
export const CREATIVE_BASE = {
  lighting: "vibrant creative lighting",
} as const;

/**
 * Creates a photorealistic AI prompt by combining scene description with quality modifiers
 * Used for realistic image/video generation (future us, video apps)
 * @param scene - The scene-specific description (what's happening, who, where)
 * @param lightingOverride - Optional custom lighting description
 * @returns Complete photorealistic prompt
 */
export const createPhotorealisticPrompt = (
  scene: string,
  lightingOverride?: string,
): string => {
  const lighting = lightingOverride ?? PHOTOREALISTIC_BASE.lighting;
  return `${PHOTOREALISTIC_BASE.quality}, ${scene}, ${lighting}`;
};

/**
 * Creates a creative AI prompt without photorealistic constraints
 * Used for meme apps or creative/stylized content
 * @param scene - The scene-specific description (what's happening, who, where)
 * @param lightingOverride - Optional custom lighting description
 * @returns Creative prompt without photorealistic prefix
 */
export const createCreativePrompt = (
  scene: string,
  lightingOverride?: string,
): string => {
  const lighting = lightingOverride ?? CREATIVE_BASE.lighting;
  return `${scene}, ${lighting}`;
};

export const createStoryTemplate = (
  scenarioContext: string,
  futureDescription: string,
): string => {
  return `In {{year}}, {{partnerA}} and {{partnerB}} ${scenarioContext}. ${futureDescription}`;
};
