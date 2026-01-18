/**
 * Scenario Data Utils
 * Helper functions for scenario creation
 */

/**
 * Photorealistic prompt constants for high-quality AI image generation
 * These ensure consistent, realistic output across all scenarios
 */
export const PHOTOREALISTIC_BASE = {
  quality: "ultra-realistic photograph, photorealistic, RAW photo quality, 8K UHD resolution",
  skin: "natural skin with subtle texture, visible pores, authentic subtle imperfections, realistic human features",
  camera: "shot on professional DSLR camera with 85mm f/1.4 lens, shallow depth of field, soft bokeh background",
  lighting: "natural volumetric lighting, cinematic color grading",
} as const;

/**
 * Creates a photorealistic AI prompt by combining scene description with quality modifiers
 * @param scene - The scene-specific description (what's happening, who, where)
 * @param lightingOverride - Optional custom lighting description
 * @returns Complete photorealistic prompt
 */
export const createPhotorealisticPrompt = (
  scene: string,
  lightingOverride?: string,
): string => {
  const lighting = lightingOverride ?? PHOTOREALISTIC_BASE.lighting;
  return `${PHOTOREALISTIC_BASE.quality}, ${scene}, ${PHOTOREALISTIC_BASE.skin}, ${lighting}, ${PHOTOREALISTIC_BASE.camera}`;
};

export const createStoryTemplate = (
  scenarioContext: string,
  futureDescription: string,
): string => {
  return `In {{year}}, {{partnerA}} and {{partnerB}} ${scenarioContext}. ${futureDescription}`;
};
