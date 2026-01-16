/**
 * Wizard Strategy Factory
 * Creates generation strategies for wizard-based scenarios
 * Centralized strategy creation for all wizard flows
 */

import { readFileAsBase64 } from "@umituz/react-native-design-system";
import type { GenerationStrategy } from "../../../../../presentation/hooks/generation/types";
import type { VideoFeatureType } from "../../../../../domain/interfaces";
import { executeVideoFeature } from "../../../../../infrastructure/services/video-feature-executor.service";
import { createCreationsRepository } from "../../../../creations/infrastructure/adapters";
import type { WizardScenarioData } from "../../presentation/hooks/useWizardGeneration";

declare const __DEV__: boolean;

// ============================================================================
// Types
// ============================================================================

interface ImageGenerationInput {
  readonly partnerABase64: string;
  readonly partnerBBase64: string;
  readonly prompt: string;
}

interface VideoGenerationInput {
  readonly sourceImageBase64: string;
  readonly targetImageBase64: string;
  readonly prompt: string;
}

type WizardGenerationInput = ImageGenerationInput | VideoGenerationInput;
type WizardGenerationResult = { imageUrl: string } | { videoUrl: string };

// ============================================================================
// Image Generation Executor
// ============================================================================

async function executeImageGeneration(
  input: ImageGenerationInput,
  model: string,
  onProgress?: (progress: number) => void,
): Promise<{ success: boolean; imageUrl?: string; error?: string }> {
  if (typeof __DEV__ !== "undefined" && __DEV__) {
    console.log("[WizardStrategy] executeImageGeneration ENTRY", {
      receivedModel: model,
      hasPartnerA: !!input.partnerABase64,
      hasPartnerB: !!input.partnerBBase64,
      promptLength: input.prompt.length,
    });
  }

  const { providerRegistry } = await import("../../../../../infrastructure/services/provider-registry.service");

  const provider = providerRegistry.getActiveProvider();
  if (!provider || !provider.isInitialized()) {
    return { success: false, error: "AI provider not initialized" };
  }

  try {
    onProgress?.(5);

    const formatBase64 = (base64: string): string => {
      return base64.startsWith("data:") ? base64 : `data:image/jpeg;base64,${base64}`;
    };

    const imageUrls = [input.partnerABase64, input.partnerBBase64]
      .filter(Boolean)
      .map(formatBase64);

    if (imageUrls.length < 2) {
      return { success: false, error: "Two images required" };
    }

    onProgress?.(10);

    const enhancedPrompt = `Create a photorealistic image featuring the exact two people from the provided photos. Use the person from @image1 and the person from @image2 exactly as they appear in the reference images - maintain their facial features, expressions, and identity. ${input.prompt}. Professional photography, high quality, detailed, natural lighting, photorealistic rendering.`;

    const modelInput = {
      image_urls: imageUrls,
      prompt: enhancedPrompt,
      aspect_ratio: "1:1",
      output_format: "jpeg",
      num_images: 1,
      enable_safety_checker: false,
    };

    if (typeof __DEV__ !== "undefined" && __DEV__) {
      console.log("[WizardStrategy] ABOUT TO CALL provider.subscribe", {
        model,
        modelType: typeof model,
        modelLength: model?.length,
        imageUrlsCount: imageUrls.length,
      });
    }

    let lastStatus = "";
    const result = await provider.subscribe(model, modelInput, {
      timeoutMs: 120000,
      onQueueUpdate: (status) => {
        if (status.status === lastStatus) return;
        lastStatus = status.status;
        if (status.status === "IN_QUEUE") onProgress?.(20);
        else if (status.status === "IN_PROGRESS") onProgress?.(50);
      },
    });

    onProgress?.(90);

    const rawResult = result as Record<string, unknown>;
    const data = (rawResult?.data ?? rawResult) as { images?: Array<{ url: string }> };
    const imageUrl = data?.images?.[0]?.url;

    onProgress?.(100);

    if (!imageUrl) {
      return { success: false, error: "No image generated" };
    }

    return { success: true, imageUrl };
  } catch (error) {
    const message = error instanceof Error ? error.message : "Generation failed";
    return { success: false, error: message };
  }
}

// ============================================================================
// Input Builder
// ============================================================================

async function buildGenerationInput(
  wizardData: Record<string, unknown>,
  scenario: WizardScenarioData,
): Promise<WizardGenerationInput | null> {
  const photo1Key = Object.keys(wizardData).find((k) => k.includes("photo_1"));
  const photo2Key = Object.keys(wizardData).find((k) => k.includes("photo_2"));

  if (!photo1Key || !photo2Key) {
    if (typeof __DEV__ !== "undefined" && __DEV__) {
      console.error("[WizardStrategy] Missing photos in wizard data", {
        keys: Object.keys(wizardData),
        hasPhoto1: !!photo1Key,
        hasPhoto2: !!photo2Key,
      });
    }
    return null;
  }

  const photo1 = wizardData[photo1Key] as { uri?: string; base64?: string };
  const photo2 = wizardData[photo2Key] as { uri?: string; base64?: string };

  if (!photo1?.uri || !photo2?.uri) {
    if (typeof __DEV__ !== "undefined" && __DEV__) {
      console.error("[WizardStrategy] Photos missing URI", {
        photo1HasUri: !!photo1?.uri,
        photo2HasUri: !!photo2?.uri,
      });
    }
    return null;
  }

  // Convert images to base64
  const [photo1Base64, photo2Base64] = await Promise.all([
    readFileAsBase64(photo1.uri),
    readFileAsBase64(photo2.uri),
  ]);

  if (!photo1Base64 || !photo2Base64) {
    if (typeof __DEV__ !== "undefined" && __DEV__) {
      console.error("[WizardStrategy] Failed to convert images to base64");
    }
    return null;
  }

  let prompt = scenario.aiPrompt || `Generate ${scenario.id} scene`;
  const outputType = scenario.outputType || "video";

  // For image generation, enhance prompt with style selections
  if (outputType === "image") {
    const styleEnhancements: string[] = [];

    // Romantic mood (multi-select array)
    const romanticMoods = wizardData.selection_romantic_mood as string[] | undefined;
    if (romanticMoods && romanticMoods.length > 0) {
      styleEnhancements.push(`Mood: ${romanticMoods.join(", ")}`);
    }

    // Art style (single select)
    const artStyle = wizardData.selection_art_style as string | undefined;
    if (artStyle && artStyle !== "original") {
      styleEnhancements.push(`Art style: ${artStyle}`);
    }

    // Artist style (single select)
    const artist = wizardData.selection_artist_style as string | undefined;
    if (artist && artist !== "original") {
      styleEnhancements.push(`Artist style: ${artist}`);
    }

    // Enhance prompt with selected styles
    if (styleEnhancements.length > 0) {
      prompt = `${prompt}. ${styleEnhancements.join(", ")}`;
    }

    return {
      partnerABase64: photo1Base64,
      partnerBBase64: photo2Base64,
      prompt,
    } as ImageGenerationInput;
  } else {
    return {
      sourceImageBase64: photo1Base64,
      targetImageBase64: photo2Base64,
      prompt,
    } as VideoGenerationInput;
  }
}

// ============================================================================
// Video Feature Type Detection
// ============================================================================

function getVideoFeatureType(scenarioId: string): VideoFeatureType {
  const id = scenarioId.toLowerCase();

  if (id.includes("kiss")) return "ai-kiss";
  if (id.includes("hug")) return "ai-hug";

  if (typeof __DEV__ !== "undefined" && __DEV__) {
    console.warn(`[WizardStrategy] Unknown scenario type "${scenarioId}", defaulting to ai-hug`);
  }
  return "ai-hug";
}

// ============================================================================
// Strategy Factory
// ============================================================================

export interface CreateWizardStrategyOptions {
  readonly scenario: WizardScenarioData;
  readonly wizardData: Record<string, unknown>;
  readonly collectionName?: string;
}

export const createWizardStrategy = (
  options: CreateWizardStrategyOptions,
): GenerationStrategy<WizardGenerationInput, WizardGenerationResult> => {
  const { scenario, collectionName = "creations" } = options;
  const repository = createCreationsRepository(collectionName);
  const outputType = scenario.outputType || "video";
  const videoFeatureType = getVideoFeatureType(scenario.id);

  if (typeof __DEV__ !== "undefined" && __DEV__) {
    console.log("[WizardStrategy] createWizardStrategy called", {
      scenarioId: scenario.id,
      scenarioModel: scenario.model,
      outputType,
      hasModel: !!scenario.model,
    });
  }

  let lastInputRef: WizardGenerationInput | null = null;

  return {
    execute: async (input, onProgress) => {
      if (typeof __DEV__ !== "undefined" && __DEV__) {
        console.log("[WizardStrategy] execute() called", {
          scenarioId: scenario.id,
          outputType,
          scenarioModel: scenario.model,
          hasModel: !!scenario.model,
        });
      }

      lastInputRef = input;

      // Execute based on output type
      if (outputType === "image") {
        // Validate model is provided by app
        if (!scenario.model) {
          throw new Error("Model is required for image generation. Please configure model in app generation.config.ts");
        }

        if (typeof __DEV__ !== "undefined" && __DEV__) {
          console.log("[WizardStrategy] About to call executeImageGeneration", {
            model: scenario.model,
            scenarioId: scenario.id,
          });
        }

        const imageInput = input as ImageGenerationInput;
        const result = await executeImageGeneration(imageInput, scenario.model, onProgress);

        if (!result.success || !result.imageUrl) {
          throw new Error(result.error || "Image generation failed");
        }

        return { imageUrl: result.imageUrl };
      } else {
        const videoInput = input as VideoGenerationInput;
        const result = await executeVideoFeature(
          videoFeatureType,
          {
            sourceImageBase64: videoInput.sourceImageBase64,
            targetImageBase64: videoInput.targetImageBase64,
            prompt: videoInput.prompt,
          },
          { onProgress },
        );

        if (!result.success || !result.videoUrl) {
          throw new Error(result.error || "Video generation failed");
        }

        return { videoUrl: result.videoUrl };
      }
    },

    getCreditCost: () => 1,

    save: async (result, uid) => {
      const input = lastInputRef;
      if (!input) return;

      // Validate scenario
      if (!scenario || !scenario.id) {
        if (typeof __DEV__ !== "undefined" && __DEV__) {
          console.error("[WizardStrategy] Cannot save: scenario.id is undefined");
        }
        throw new Error("Scenario ID is required for saving creation");
      }

      // Extract prompt
      const prompt = 'prompt' in input ? input.prompt : '';

      // Extract URLs based on output type
      let mainUri = '';
      let imageUrl: string | undefined;
      let videoUrl: string | undefined;

      if (outputType === "image") {
        const imageResult = result as { imageUrl?: string };
        imageUrl = imageResult.imageUrl;
        mainUri = imageUrl || '';
      } else {
        const videoResult = result as { videoUrl?: string };
        videoUrl = videoResult.videoUrl;
        mainUri = videoUrl || '';
      }

      // Create unique ID
      const creationId = `${scenario.id}_${Date.now()}`;

      // Build creation object
      const creation = {
        id: creationId,
        uri: mainUri,
        type: scenario.id,
        prompt,
        createdAt: new Date(),
        isShared: false,
        isFavorite: false,
        metadata: {
          scenarioId: scenario.id,
          scenarioTitle: scenario.title || scenario.id,
        },
        output: outputType === "image"
          ? { imageUrl }
          : { videoUrl },
      };

      if (typeof __DEV__ !== "undefined" && __DEV__) {
        console.log("[WizardStrategy] Saving creation", {
          creationId,
          scenarioId: scenario.id,
          outputType,
        });
      }

      await repository.create(uid, creation);

      if (typeof __DEV__ !== "undefined" && __DEV__) {
        console.log("[WizardStrategy] Creation saved successfully");
      }
    },
  };
};

// ============================================================================
// Input Builder Helper (Public API)
// ============================================================================

export const buildWizardInput = buildGenerationInput;
