/**
 * Couple Input Utilities - Photorealistic Prompt Enhancement
 */

export interface PhotorealisticPromptOptions {
  readonly isCouple?: boolean;
  readonly customInstructions?: string;
}

/**
 * Create a photorealistic prompt from refined input
 * Adds photorealistic enhancements to the base prompt
 */
export function createPhotorealisticPrompt(
  refinedPrompt: string,
  options: PhotorealisticPromptOptions = {}
): string {
  const { isCouple = false, customInstructions } = options;

  // Photorealistic quality keywords
  const photorealisticPrefix = "high quality, photorealistic, detailed, 8k, professional photography";

  // Build the final prompt
  let finalPrompt = refinedPrompt;

  // Add custom instructions if provided
  if (customInstructions) {
    finalPrompt = `${customInstructions}. ${finalPrompt}`;
  }

  // Add photorealistic prefix
  finalPrompt = `${photorealisticPrefix}, ${finalPrompt}`;

  // Add couple-specific enhancements
  if (isCouple) {
    finalPrompt = `${finalPrompt}, romantic couple, natural lighting, candid moment`;
  }

  return finalPrompt;
}
