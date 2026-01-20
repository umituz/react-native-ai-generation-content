/**
 * Image Generation Strategy
 * Handles image-specific generation logic
 */

import { createCreationsRepository } from "../../../../creations/infrastructure/adapters";
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
  const interactionStyle = (scenario.interactionStyle as InteractionStyle) ?? "romantic";

  return { photos, prompt: finalPrompt, style, interactionStyle };
}

/**
 * Applies style enhancements to the prompt
 */
function applyStyleEnhancements(prompt: string, wizardData: Record<string, unknown>): string {
  const enhancements: string[] = [];

  const romanticMoods = extractSelection(wizardData.selection_romantic_mood);
  if (Array.isArray(romanticMoods) && romanticMoods.length > 0) {
    enhancements.push(`Mood: ${romanticMoods.join(", ")}`);
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

declare const __DEV__: boolean;

export function createImageStrategy(options: CreateImageStrategyOptions): WizardStrategy {
  const { scenario, collectionName = "creations" } = options;
  const repository = createCreationsRepository(collectionName);

  let lastInputRef: WizardImageInput | null = null;
  let processingCreationId: string | null = null;

  return {
    execute: async (input: unknown) => {
      const imageInput = input as WizardImageInput;
      if (!scenario.model) {
        throw new Error("Model is required for image generation");
      }

      lastInputRef = imageInput;

      const result = await executeImageGeneration(imageInput, scenario.model);

      if (!result.success || !result.imageUrl) {
        throw new Error(result.error || "Image generation failed");
      }

      return { imageUrl: result.imageUrl };
    },

    getCreditCost: () => 1,

    saveAsProcessing: async (uid: string, input: unknown) => {
      const imageInput = input as WizardImageInput;
      const creationId = `${scenario.id}_${Date.now()}`;
      processingCreationId = creationId;

      await repository.create(uid, {
        id: creationId,
        uri: "",
        type: scenario.id,
        prompt: imageInput.prompt,
        status: "processing" as const,
        createdAt: new Date(),
        isShared: false,
        isFavorite: false,
        metadata: { scenarioId: scenario.id, scenarioTitle: scenario.title },
      });

      if (typeof __DEV__ !== "undefined" && __DEV__) {
        console.log("[ImageStrategy] Saved as processing", { creationId });
      }

      return creationId;
    },

    save: async (result: unknown, uid: string, creationId?: string) => {
      const input = lastInputRef;
      const imageResult = result as { imageUrl?: string };
      if (!input || !scenario?.id || !imageResult.imageUrl) return;

      const idToUpdate = creationId || processingCreationId;

      if (idToUpdate) {
        // Update existing processing creation to completed
        await repository.update(uid, idToUpdate, {
          uri: imageResult.imageUrl,
          status: "completed" as const,
          output: { imageUrl: imageResult.imageUrl },
        });

        if (typeof __DEV__ !== "undefined" && __DEV__) {
          console.log("[ImageStrategy] Updated to completed", { creationId: idToUpdate });
        }
      } else {
        // Fallback: create new (shouldn't happen normally)
        await repository.create(uid, {
          id: `${scenario.id}_${Date.now()}`,
          uri: imageResult.imageUrl,
          type: scenario.id,
          prompt: input.prompt,
          status: "completed" as const,
          createdAt: new Date(),
          isShared: false,
          isFavorite: false,
          metadata: { scenarioId: scenario.id, scenarioTitle: scenario.title },
          output: { imageUrl: imageResult.imageUrl },
        });
      }
    },
  };
}
