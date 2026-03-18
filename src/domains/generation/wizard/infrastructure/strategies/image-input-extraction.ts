/**
 * Image Generation Strategy - Data Extraction
 *
 * Handles photo and prompt extraction from wizard data
 */

import type { WizardScenarioData } from "../../presentation/hooks/useWizardGeneration";
import { IMAGE_PROCESSING_PROMPTS } from "./wizard-strategy.constants";
import { extractPrompt } from "../utils";
import { extractPhotosAsBase64, extractPhotoUris } from "./shared/photo-extraction.utils";

export interface ImageExtractionResult {
  photoUris: string[];
  photos: string[];
  prompt: string;
}

/**
 * Extract photos and prompt from wizard data
 */
export async function extractImageData(
  wizardData: Record<string, unknown>,
  scenario: WizardScenarioData,
): Promise<ImageExtractionResult> {
  const DEV = typeof __DEV__ !== "undefined" && __DEV__;

  if (DEV) {
    console.log("[ImageStrategy] ===== EXTRACTION START =====");
    console.log("[ImageStrategy] Scenario ID:", scenario.id);
    console.log("[ImageStrategy] ===== WIZARD DATA KEYS =====");
    const wizardKeys = Object.keys(wizardData);
    console.log("[ImageStrategy] Total keys:", wizardKeys.length);
    console.log("[ImageStrategy] Keys:", wizardKeys.slice(0, 20).join(", ") + (wizardKeys.length > 20 ? "..." : ""));

    // Log photo-related keys
    const photoKeys = wizardKeys.filter(k => k.includes("photo"));
    if (photoKeys.length > 0) {
      console.log("[ImageStrategy] Photo-related keys:", photoKeys.join(", "));
    }

    // Log selection/style keys
    const selectionKeys = wizardKeys.filter(k => k.includes("selection") || k.includes("style"));
    if (selectionKeys.length > 0) {
      console.log("[ImageStrategy] Selection/style keys:", selectionKeys.join(", "));
    }
  }

  // Extract photo URIs first (for couple refinement)
  const photoUris = extractPhotoUris(wizardData);
  const photos = await extractPhotosAsBase64(wizardData, DEV);

  if (DEV) {
    console.log("[ImageStrategy] ===== EXTRACTION COMPLETE =====");
    console.log("[ImageStrategy] Photo URIs count:", photoUris.length);
    console.log("[ImageStrategy] Base64 photos count:", photos.length);
  }

  // Extract prompt with fallback to default
  let prompt = extractPrompt(wizardData, scenario.aiPrompt);

  if (DEV) {
    console.log("[ImageStrategy] ===== PROMPT EXTRACTION =====");
    console.log("[ImageStrategy] Scenario aiPrompt type:", typeof scenario.aiPrompt);
    console.log("[ImageStrategy] Scenario aiPrompt length:", typeof scenario.aiPrompt === "string" ? scenario.aiPrompt.length : "N/A");
    if (typeof scenario.aiPrompt === "string") {
      console.log("[ImageStrategy] Scenario aiPrompt preview:", scenario.aiPrompt.substring(0, 200) + "...");
    }
    console.log("[ImageStrategy] Extracted prompt type:", typeof prompt);
    console.log("[ImageStrategy] Extracted prompt length:", prompt?.length ?? 0);
    if (prompt) {
      console.log("[ImageStrategy] Extracted prompt preview:", prompt.substring(0, 200) + "...");
    }
  }

  if (!prompt) {
    const defaultPrompt = IMAGE_PROCESSING_PROMPTS[scenario.id];
    if (defaultPrompt) {
      prompt = defaultPrompt;
      if (DEV) {
        console.log("[ImageStrategy] Using default prompt for scenario:", scenario.id);
      }
    } else {
      throw new Error("Prompt is required for image generation");
    }
  }

  return { photoUris, photos, prompt };
}
