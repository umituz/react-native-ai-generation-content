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
import { buildInteractionStylePrompt, type InteractionStyle } from "../../../../prompts/infrastructure/builders/interaction-style-builder";
import { extractPrompt, extractSelection } from "../utils";

declare const __DEV__: boolean;

// ============================================================================
// Types
// ============================================================================

export interface ImageGenerationInput {
  /** Photos are optional for text-to-image */
  readonly photos: readonly string[];
  readonly prompt: string;
  /** Optional interaction style for multi-person images */
  readonly interactionStyle?: InteractionStyle;
  /** Optional style from wizard selection */
  readonly style?: string;
}

export interface ImageGenerationResult {
  readonly imageUrl: string;
}

// ============================================================================
// Photo Extraction
// ============================================================================

async function extractPhotosFromWizardData(
  wizardData: Record<string, unknown>,
): Promise<string[]> {
  const photoKeys = Object.keys(wizardData)
    .filter((k) => k.includes(PHOTO_KEY_PREFIX))
    .sort();

  if (photoKeys.length === 0) {
    return [];
  }

  const photoUris: string[] = [];
  for (const key of photoKeys) {
    const photo = wizardData[key] as { uri?: string };
    if (photo?.uri) {
      photoUris.push(photo.uri);
    }
  }

  if (photoUris.length === 0) {
    return [];
  }

  const photosBase64 = await Promise.all(photoUris.map((uri) => readFileAsBase64(uri)));
  return photosBase64.filter(Boolean) as string[];
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

    const hasPhotos = input.photos.length > 0;
    const imageUrls = hasPhotos ? input.photos.map(formatBase64) : [];

    let finalPrompt = input.prompt;

    if (hasPhotos) {
      // Photo-based: Build face preservation prompt
      const facePrompt = buildFacePreservationPrompt({
        scenarioPrompt: input.prompt,
        personCount: imageUrls.length,
      });

      const interactionPrompt = buildInteractionStylePrompt({
        style: input.interactionStyle ?? "romantic",
        personCount: imageUrls.length,
      });

      finalPrompt = interactionPrompt
        ? `${facePrompt}\n\n${interactionPrompt}`
        : facePrompt;

      if (typeof __DEV__ !== "undefined" && __DEV__) {
        console.log("[ImageStrategy] Photo-based generation for", imageUrls.length, "person(s)");
      }
    } else {
      // Text-to-image: Use prompt with optional style
      if (input.style && input.style !== DEFAULT_STYLE_VALUE) {
        finalPrompt = `${input.prompt}. Style: ${input.style}`;
      }

      if (typeof __DEV__ !== "undefined" && __DEV__) {
        console.log("[ImageStrategy] Text-to-image generation");
      }
    }

    const modelInput: Record<string, unknown> = {
      prompt: finalPrompt,
      aspect_ratio: MODEL_INPUT_DEFAULTS.aspectRatio,
      output_format: MODEL_INPUT_DEFAULTS.outputFormat,
      num_images: MODEL_INPUT_DEFAULTS.numImages,
      enable_safety_checker: MODEL_INPUT_DEFAULTS.enableSafetyChecker,
    };

    if (hasPhotos) {
      modelInput.image_urls = imageUrls;
    }

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

  // Extract prompt using type-safe extractor with fallback
  const prompt = extractPrompt(wizardData, scenario.aiPrompt);

  if (!prompt) {
    throw new Error("Prompt is required for image generation");
  }

  // For photo-based generation, apply style enhancements
  let finalPrompt = prompt;
  if (photos.length > 0) {
    const styleEnhancements: string[] = [];

    // Extract selections using type-safe extractor
    const romanticMoods = extractSelection(wizardData.selection_romantic_mood);
    if (Array.isArray(romanticMoods) && romanticMoods.length > 0) {
      styleEnhancements.push(`Mood: ${romanticMoods.join(", ")}`);
    }

    const artStyle = extractSelection(wizardData.selection_art_style);
    if (typeof artStyle === "string" && artStyle !== DEFAULT_STYLE_VALUE) {
      styleEnhancements.push(`Art style: ${artStyle}`);
    }

    const artist = extractSelection(wizardData.selection_artist_style);
    if (typeof artist === "string" && artist !== DEFAULT_STYLE_VALUE) {
      styleEnhancements.push(`Artist style: ${artist}`);
    }

    if (styleEnhancements.length > 0) {
      finalPrompt = `${prompt}. ${styleEnhancements.join(", ")}`;
    }
  }

  // Extract style using type-safe extractor (for text-to-image)
  const styleValue = extractSelection(wizardData.style);
  const style = typeof styleValue === "string" ? styleValue : undefined;

  // Get interaction style from scenario (default: romantic for couple apps)
  const interactionStyle = (scenario.interactionStyle as InteractionStyle) ?? "romantic";

  return { photos, prompt: finalPrompt, style, interactionStyle };
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
