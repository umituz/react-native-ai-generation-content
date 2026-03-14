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


// ============================================================================
// Input Builder
// ============================================================================

export async function buildImageInput(
  wizardData: Record<string, unknown>,
  scenario: WizardScenarioData,
): Promise<WizardImageInput | null> {
  // Extract photo URIs first (for couple refinement)
  const photoUris = extractPhotoUris(wizardData);
  const photos = await extractPhotosAsBase64(wizardData);

  // Extract prompt with fallback to default
  let prompt = extractPrompt(wizardData, scenario.aiPrompt);

  if (!prompt) {
    const defaultPrompt = IMAGE_PROCESSING_PROMPTS[scenario.id];
    if (defaultPrompt) {
      prompt = defaultPrompt;
    } else {
      throw new Error("Prompt is required for image generation");
    }
  }

  // Apply style enhancements for photo-based generation
  let finalPrompt = prompt;
  if (photos.length > 0) {
    finalPrompt = applyStyleEnhancements(prompt, wizardData);

    // ✅ Apply couple refinement (same logic as Wardrobe)
    // This ensures consistency across all couple generation scenarios
    const isCoupleMode = photos.length >= 2;
    finalPrompt = await enhancePromptWithAnalysis(finalPrompt, photoUris, isCoupleMode);

    if (typeof __DEV__ !== "undefined" && __DEV__) {
      console.log("[ImageStrategy] Prompt enhanced with couple refinement", {
        photoCount: photos.length,
        isCoupleMode,
        originalPromptLength: prompt.length,
        finalPromptLength: finalPrompt.length,
      });
    }
  }

  // Extract style for text-to-image
  const styleValue = extractSelection(wizardData.style);
  const style = typeof styleValue === "string" ? styleValue : undefined;

  // Extract aspect ratio from wizard data
  const aspectRatio = typeof wizardData.aspect_ratio === "string" ? wizardData.aspect_ratio : undefined;

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
