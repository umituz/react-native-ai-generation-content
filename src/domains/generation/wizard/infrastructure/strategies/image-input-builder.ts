/**
 * Image Generation Strategy - Input Builder
 */

import type { WizardScenarioData } from "../../presentation/hooks/useWizardGeneration";
import type { WizardImageInput } from "./image-generation.types";
import { extractSelection } from "../utils";
import { extractImageData } from "./image-input-extraction";
import { buildImagePrompt } from "./image-input-prompt-builder";

/**
 * Build image input from wizard data and scenario
 */
export async function buildImageInput(
  wizardData: Record<string, unknown>,
  scenario: WizardScenarioData,
): Promise<WizardImageInput | null> {
  const DEV = typeof __DEV__ !== "undefined" && __DEV__;

  if (DEV) {
    console.log("[ImageStrategy] ===== BUILD IMAGE INPUT START =====");
    console.log("[ImageStrategy] Scenario model:", scenario.model);
    console.log("[ImageStrategy] Scenario provider:", scenario.providerId);
  }

  // Extract photos and prompt from wizard data
  const { photoUris, photos, prompt } = await extractImageData(wizardData, scenario);

  // Build final prompt with enhancements
  const finalPrompt = await buildImagePrompt({
    photos,
    photoUris,
    prompt,
    wizardData,
  });

  // Extract style for text-to-image
  const styleValue = extractSelection(wizardData.style);
  const style = typeof styleValue === "string" ? styleValue : undefined;

  let aspectRatio = typeof wizardData.aspect_ratio === "string" ? wizardData.aspect_ratio : undefined;

  if (!aspectRatio && photos.length > 0) {
    aspectRatio = "3:4"; // Wardrobe default
    if (typeof __DEV__ !== "undefined" && __DEV__) {
      console.log("[ImageStrategy] No aspect_ratio in wizardData, using Wardrobe default: 3:4");
    }
  }

  if (typeof __DEV__ !== "undefined" && __DEV__) {
    console.log("[ImageStrategy] ===== STYLE & ASPECT RATIO =====");
    console.log("[ImageStrategy] wizardData.style:", wizardData.style);
    console.log("[ImageStrategy] Extracted styleValue:", styleValue);
    console.log("[ImageStrategy] Final style:", style || "none");
    console.log("[ImageStrategy] wizardData.aspect_ratio:", wizardData.aspect_ratio);
    console.log("[ImageStrategy] Final aspectRatio:", aspectRatio || "default");
    console.log("[ImageStrategy] ===== FINAL OUTPUT =====");
    console.log("[ImageStrategy] Photos count:", photos.length);
    console.log("[ImageStrategy] Prompt length:", finalPrompt.length);
    console.log("[ImageStrategy] Aspect ratio:", aspectRatio || "default");
    console.log("[ImageStrategy] Returning WizardImageInput");
    console.log("[ImageStrategy] ===== STRATEGY COMPLETE =====");
  }

  return { photos, prompt: finalPrompt, style, aspectRatio };
}
