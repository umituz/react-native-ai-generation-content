/**
 * Image Generation Strategy
 * Handles image-specific generation logic
 */

import { readFileAsBase64 } from "@umituz/react-native-design-system";
import { createCreationsRepository } from "../../../../creations/infrastructure/adapters";
import type { WizardScenarioData } from "../../presentation/hooks/useWizardGeneration";
import type { WizardStrategy } from "./wizard-strategy.types";
import {
  GENERATION_TIMEOUT_MS,
  BASE64_IMAGE_PREFIX,
  PHOTO_KEY_PREFIX,
  DEFAULT_STYLE_VALUE,
  MODEL_INPUT_DEFAULTS,
} from "./wizard-strategy.constants";
import { buildFacePreservationPrompt } from "../../../../prompts/infrastructure/builders/face-preservation-builder";

declare const __DEV__: boolean;

// ============================================================================
// Types
// ============================================================================

export interface ImageGenerationInput {
  readonly photos: readonly string[];
  readonly prompt: string;
}

export interface ImageGenerationResult {
  readonly imageUrl: string;
}

// ============================================================================
// Photo Extraction
// ============================================================================

async function extractPhotosFromWizardData(
  wizardData: Record<string, unknown>,
): Promise<string[] | null> {
  const photoKeys = Object.keys(wizardData)
    .filter((k) => k.includes(PHOTO_KEY_PREFIX))
    .sort();

  if (photoKeys.length === 0) {
    if (typeof __DEV__ !== "undefined" && __DEV__) {
      console.error("[ImageStrategy] No photos found", { keys: Object.keys(wizardData) });
    }
    return null;
  }

  const photoUris: string[] = [];
  for (const key of photoKeys) {
    const photo = wizardData[key] as { uri?: string };
    if (!photo?.uri) return null;
    photoUris.push(photo.uri);
  }

  const photosBase64 = await Promise.all(photoUris.map((uri) => readFileAsBase64(uri)));
  const validPhotos = photosBase64.filter(Boolean) as string[];

  return validPhotos.length > 0 ? validPhotos : null;
}

// ============================================================================
// Image Generation Executor
// ============================================================================

async function executeImageGeneration(
  input: ImageGenerationInput,
  model: string,
  onProgress?: (progress: number) => void,
): Promise<{ success: boolean; imageUrl?: string; error?: string }> {
  const { providerRegistry } = await import("../../../../../infrastructure/services/provider-registry.service");

  const provider = providerRegistry.getActiveProvider();
  if (!provider?.isInitialized()) {
    return { success: false, error: "AI provider not initialized" };
  }

  try {
    const formatBase64 = (base64: string): string =>
      base64.startsWith("data:") ? base64 : `${BASE64_IMAGE_PREFIX}${base64}`;

    const imageUrls = input.photos.map(formatBase64);
    if (imageUrls.length === 0) {
      return { success: false, error: "At least one image required" };
    }

    // Build face preservation prompt dynamically based on number of people
    const enhancedPrompt = buildFacePreservationPrompt({
      scenarioPrompt: input.prompt,
      personCount: imageUrls.length,
    });

    if (typeof __DEV__ !== "undefined" && __DEV__) {
      console.log("[ImageStrategy] Face preservation prompt for", imageUrls.length, "person(s)");
    }

    const modelInput = {
      image_urls: imageUrls,
      prompt: enhancedPrompt,
      aspect_ratio: MODEL_INPUT_DEFAULTS.aspectRatio,
      output_format: MODEL_INPUT_DEFAULTS.outputFormat,
      num_images: MODEL_INPUT_DEFAULTS.numImages,
      enable_safety_checker: MODEL_INPUT_DEFAULTS.enableSafetyChecker,
    };

    let lastStatus = "";
    const result = await provider.subscribe(model, modelInput, {
      timeoutMs: GENERATION_TIMEOUT_MS,
      onQueueUpdate: (status) => {
        if (status.status !== lastStatus) lastStatus = status.status;
      },
    });

    const rawResult = result as Record<string, unknown>;
    const data = (rawResult?.data ?? rawResult) as { images?: Array<{ url: string }> };
    const imageUrl = data?.images?.[0]?.url;

    onProgress?.(100);

    return imageUrl ? { success: true, imageUrl } : { success: false, error: "No image generated" };
  } catch (error) {
    return { success: false, error: error instanceof Error ? error.message : "Generation failed" };
  }
}

// ============================================================================
// Input Builder
// ============================================================================

export async function buildImageInput(
  wizardData: Record<string, unknown>,
  scenario: WizardScenarioData,
): Promise<ImageGenerationInput | null> {
  const photos = await extractPhotosFromWizardData(wizardData);
  if (!photos) return null;

  if (!scenario.aiPrompt?.trim()) {
    throw new Error(`Scenario "${scenario.id}" must have aiPrompt field`);
  }

  let prompt = scenario.aiPrompt;

  const styleEnhancements: string[] = [];

  const romanticMoods = wizardData.selection_romantic_mood as string[] | undefined;
  if (romanticMoods?.length) {
    styleEnhancements.push(`Mood: ${romanticMoods.join(", ")}`);
  }

  const artStyle = wizardData.selection_art_style as string | undefined;
  if (artStyle && artStyle !== DEFAULT_STYLE_VALUE) {
    styleEnhancements.push(`Art style: ${artStyle}`);
  }

  const artist = wizardData.selection_artist_style as string | undefined;
  if (artist && artist !== DEFAULT_STYLE_VALUE) {
    styleEnhancements.push(`Artist style: ${artist}`);
  }

  if (styleEnhancements.length > 0) {
    prompt = `${prompt}. ${styleEnhancements.join(", ")}`;
  }

  return { photos, prompt };
}

// ============================================================================
// Strategy Factory
// ============================================================================

export interface CreateImageStrategyOptions {
  readonly scenario: WizardScenarioData;
  readonly collectionName?: string;
}

export function createImageStrategy(options: CreateImageStrategyOptions): WizardStrategy {
  const { scenario, collectionName = "creations" } = options;
  const repository = createCreationsRepository(collectionName);

  let lastInputRef: ImageGenerationInput | null = null;

  return {
    execute: async (input: unknown, onProgress) => {
      const imageInput = input as ImageGenerationInput;
      if (!scenario.model) {
        throw new Error("Model is required for image generation");
      }

      lastInputRef = imageInput;

      const result = await executeImageGeneration(imageInput, scenario.model, onProgress);

      if (!result.success || !result.imageUrl) {
        throw new Error(result.error || "Image generation failed");
      }

      return { imageUrl: result.imageUrl };
    },

    getCreditCost: () => 1,

    save: async (result: unknown, uid) => {
      const input = lastInputRef;
      const imageResult = result as { imageUrl?: string };
      if (!input || !scenario?.id || !imageResult.imageUrl) return;

      const creation = {
        id: `${scenario.id}_${Date.now()}`,
        uri: imageResult.imageUrl,
        type: scenario.id,
        prompt: input.prompt,
        createdAt: new Date(),
        isShared: false,
        isFavorite: false,
        metadata: {
          scenarioId: scenario.id,
          scenarioTitle: scenario.title || scenario.id,
        },
        output: { imageUrl: imageResult.imageUrl },
      };

      await repository.create(uid, creation);
    },
  };
}
