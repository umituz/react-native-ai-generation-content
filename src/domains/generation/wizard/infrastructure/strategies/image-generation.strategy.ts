/**
 * Image Generation Strategy
 * Handles image-specific generation logic (execution only)
 */

import type { WizardScenarioData } from "../../presentation/hooks/useWizardGeneration";
import type { WizardStrategy } from "./wizard-strategy.types";
import { DEFAULT_STYLE_VALUE, IMAGE_PROCESSING_PROMPTS } from "./wizard-strategy.constants";
import { extractPrompt, extractSelection } from "../utils";
import { extractPhotosAsBase64, extractPhotoUris } from "./shared/photo-extraction.utils";
import { executeImageGeneration } from "./image-generation.executor";
import type { WizardImageInput, CreateImageStrategyOptions } from "./image-generation.types";
import { enhancePromptWithAnalysis } from "../../../infrastructure/appearance-analysis";
import { createPhotorealisticPrompt } from "../../../../prompts/domain/base/creators";


// ============================================================================
// Input Builder
// ============================================================================

export async function buildImageInput(
  wizardData: Record<string, unknown>,
  scenario: WizardScenarioData,
): Promise<WizardImageInput | null> {
  const DEV = typeof __DEV__ !== "undefined" && __DEV__;

  if (DEV) {
    console.log("[ImageStrategy] ===== BUILD IMAGE INPUT START =====");
    console.log("[ImageStrategy] Scenario ID:", scenario.id);
    console.log("[ImageStrategy] Scenario model:", scenario.model);
    console.log("[ImageStrategy] Scenario provider:", scenario.providerId);
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

  // Apply style enhancements for photo-based generation
  let finalPrompt = prompt;
  if (photos.length > 0) {
    const isCoupleMode = photos.length >= 2;
    const styleEnhanced = applyStyleEnhancements(prompt, wizardData);

    if (typeof __DEV__ !== "undefined" && __DEV__) {
      console.log("[ImageStrategy] ===== STRATEGY START =====");
      console.log("[ImageStrategy] Scenario:", scenario.id);
      console.log("[ImageStrategy] Model:", scenario.model);
      console.log("[ImageStrategy] Provider:", scenario.providerId);
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

    finalPrompt = createPhotorealisticPrompt(refinedPrompt, {
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
  }

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

/**
 * Applies style enhancements to the prompt
 */
function applyStyleEnhancements(prompt: string, wizardData: Record<string, unknown>): string {
  const enhancements: string[] = [];

  const moodSelections = extractSelection(wizardData.selection_mood);
  if (Array.isArray(moodSelections) && moodSelections.length > 0) {
    enhancements.push(`Mood: ${moodSelections.join(", ")}`);
  }

  const artStyle = extractSelection(wizardData.selection_art_style);
  if (typeof artStyle === "string" && artStyle !== DEFAULT_STYLE_VALUE) {
    enhancements.push(`Art style: ${artStyle}`);
  }

  const artist = extractSelection(wizardData.selection_artist_style);
  if (typeof artist === "string" && artist !== DEFAULT_STYLE_VALUE) {
    enhancements.push(`Artist style: ${artist}`);
  }

  return enhancements.length > 0 ? `${prompt}. ${enhancements.join(", ")}` : prompt;
}

// ============================================================================
// Strategy Factory
// ============================================================================

export function createImageStrategy(options: CreateImageStrategyOptions): WizardStrategy {
  const { scenario } = options;

  // Validate model early - fail fast
  if (!scenario.model) {
    throw new Error("Model is required for image generation");
  }

  const model = scenario.model;
  const providerId = scenario.providerId;

  return {
    execute: async (input: unknown) => {
      if (!input || typeof input !== "object") {
        throw new Error("Invalid input: expected WizardImageInput object");
      }
      const imageInput = input as WizardImageInput;
      const result = await executeImageGeneration(imageInput, model, undefined, providerId);

      if (!result.success || !result.imageUrl) {
        const error = new Error(result.error || "Image generation failed");
        (error as Error & { logSessionId?: string }).logSessionId = result.logSessionId;
        throw error;
      }

      return { imageUrl: result.imageUrl, logSessionId: result.logSessionId };
    },
  };
}
