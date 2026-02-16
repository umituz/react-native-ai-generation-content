/**
 * Image Generation Strategy
 * Handles image-specific generation logic (execution only)
 */

import type { WizardScenarioData } from "../../presentation/hooks/useWizardGeneration";
import type { WizardStrategy } from "./wizard-strategy.types";
import { DEFAULT_STYLE_VALUE, IMAGE_PROCESSING_PROMPTS } from "./wizard-strategy.constants";
import type { InteractionStyle } from "../../../../prompts/infrastructure/builders/interaction-style-builder";
import { extractPrompt, extractSelection } from "../utils";
import { extractPhotosAsBase64 } from "./shared/photo-extraction.utils";
import { executeImageGeneration } from "./image-generation.executor";
import type { WizardImageInput, CreateImageStrategyOptions } from "./image-generation.types";

// Re-export types for external use
export type { WizardImageInput, WizardImageResult, CreateImageStrategyOptions } from "./image-generation.types";

// ============================================================================
// Input Builder
// ============================================================================

export async function buildImageInput(
  wizardData: Record<string, unknown>,
  scenario: WizardScenarioData,
): Promise<WizardImageInput | null> {
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
  }

  // Extract style for text-to-image
  const styleValue = extractSelection(wizardData.style);
  const style = typeof styleValue === "string" ? styleValue : undefined;
  const interactionStyle = scenario.interactionStyle as InteractionStyle | undefined;
  const promptType = scenario.promptType;

  return { photos, prompt: finalPrompt, style, interactionStyle, promptType };
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
  const { scenario, creditCost } = options;

  // Validate model early - fail fast
  if (!scenario.model) {
    throw new Error("Model is required for image generation");
  }

  const model = scenario.model;

  return {
    execute: async (input: unknown) => {
      const imageInput = input as WizardImageInput;
      const result = await executeImageGeneration(imageInput, model);

      if (!result.success || !result.imageUrl) {
        throw new Error(result.error || "Image generation failed");
      }

      return { imageUrl: result.imageUrl };
    },
  };
}
