/**
 * Image Generation Strategy - Prompt Building
 *
 * Handles prompt enhancement and photorealistic prompt creation
 */

import { enhancePromptWithAnalysis } from "../../../infrastructure/appearance-analysis";
import { createPhotorealisticPrompt } from "../../../../prompts/domain/base/creators";
import { applyStyleEnhancements } from "./image-input-style-enhancements";

export interface PromptBuildContext {
  photos: string[];
  photoUris: string[];
  prompt: string;
  wizardData: Record<string, unknown>;
}

/**
 * Build final prompt with enhancements and photorealistic styling
 */
export async function buildImagePrompt(
  context: PromptBuildContext,
): Promise<string> {
  const { photos, photoUris, prompt, wizardData } = context;
  const DEV = typeof __DEV__ !== "undefined" && __DEV__;

  // Apply style enhancements for photo-based generation
  if (photos.length === 0) {
    return prompt;
  }

  const isCoupleMode = photos.length >= 2;
  const styleEnhanced = applyStyleEnhancements(prompt, wizardData);

  if (typeof __DEV__ !== "undefined" && __DEV__) {
    console.log("[ImageStrategy] ===== STRATEGY START =====");
    console.log("[ImageStrategy] ===== PROMPT FLOW =====");
    console.log("[ImageStrategy] [1/5] Original scenario prompt:");
    console.log("[ImageStrategy]   Length:", prompt.length);
    console.log("[ImageStrategy]   Preview:", prompt.substring(0, 150) + "...");
    console.log("[ImageStrategy] [2/5] Style enhancements applied:", styleEnhanced !== prompt);
    if (styleEnhanced !== prompt) {
      console.log("[ImageStrategy]   Enhanced preview:", styleEnhanced.substring(0, 150) + "...");
    }
    console.log("[ImageStrategy] [3/5] Couple mode:", isCoupleMode);
    console.log("[ImageStrategy]   Photo count:", photos.length);
    console.log("[ImageStrategy] [4/5] Calling enhancePromptWithAnalysis...");
  }

  const refinedPrompt = await enhancePromptWithAnalysis(styleEnhanced, photoUris, isCoupleMode);

  if (typeof __DEV__ !== "undefined" && __DEV__) {
    console.log("[ImageStrategy] After enhancePromptWithAnalysis:");
    console.log("[ImageStrategy]   Length:", refinedPrompt.length);
    console.log("[ImageStrategy]   Preview:", refinedPrompt.substring(0, 200) + "...");
    console.log("[ImageStrategy] [5/5] Calling createPhotorealisticPrompt (Wardrobe style)...");
  }

  const finalPrompt = createPhotorealisticPrompt(refinedPrompt, {
    isCouple: isCoupleMode,
    customInstructions: undefined,
  });

  if (typeof __DEV__ !== "undefined" && __DEV__) {
    console.log("[ImageStrategy] ===== STRATEGY END =====");
    console.log("[ImageStrategy] Final prompt length:", finalPrompt.length);
    console.log("[ImageStrategy] Final prompt preview:");
    console.log(finalPrompt.substring(0, 600) + "...");
    console.log("[ImageStrategy] ===== OUTPUT =====");
    console.log("[ImageStrategy] Photo count:", photos.length);
    console.log("[ImageStrategy] Photo sizes:", photos.map((p, i) => `Photo ${i + 1}: ${(p.length / 1024).toFixed(2)}KB`));
  }

  return finalPrompt;
}
