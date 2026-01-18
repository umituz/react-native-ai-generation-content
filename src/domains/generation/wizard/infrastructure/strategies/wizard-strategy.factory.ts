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
import {
  GENERATION_TIMEOUT_MS,
  BASE64_IMAGE_PREFIX,
  PHOTO_KEY_PREFIX,
  DEFAULT_STYLE_VALUE,
  MODEL_INPUT_DEFAULTS,
  VIDEO_FEATURE_PATTERNS,
} from "./wizard-strategy.constants";

declare const __DEV__: boolean;

// ============================================================================
// Types
// ============================================================================

interface ImageGenerationInput {
  readonly photos: readonly string[]; // Dynamic array - supports 1, 2, 3... N photos
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
      photoCount: input.photos.length,
      promptLength: input.prompt.length,
    });
  }

  const { providerRegistry } = await import("../../../../../infrastructure/services/provider-registry.service");

  const provider = providerRegistry.getActiveProvider();
  if (!provider || !provider.isInitialized()) {
    return { success: false, error: "AI provider not initialized" };
  }

  try {
    const formatBase64 = (base64: string): string => {
      return base64.startsWith("data:") ? base64 : `${BASE64_IMAGE_PREFIX}${base64}`;
    };

    const imageUrls = input.photos.map(formatBase64);

    if (imageUrls.length === 0) {
      return { success: false, error: "At least one image required" };
    }

    const enhancedPrompt = `Create a photorealistic image featuring the exact two people from the provided photos. Use the person from @image1 and the person from @image2 exactly as they appear in the reference images - maintain their facial features, expressions, and identity. ${input.prompt}. Professional photography, high quality, detailed, natural lighting, photorealistic rendering.`;

    const modelInput = {
      image_urls: imageUrls,
      prompt: enhancedPrompt,
      aspect_ratio: MODEL_INPUT_DEFAULTS.aspectRatio,
      output_format: MODEL_INPUT_DEFAULTS.outputFormat,
      num_images: MODEL_INPUT_DEFAULTS.numImages,
      enable_safety_checker: MODEL_INPUT_DEFAULTS.enableSafetyChecker,
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
      timeoutMs: GENERATION_TIMEOUT_MS,
      onQueueUpdate: (status) => {
        if (status.status === lastStatus) return;
        lastStatus = status.status;
      },
    });

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
// Photo Extraction (Generic - used by both image and video)
// ============================================================================

async function extractPhotosFromWizardData(
  wizardData: Record<string, unknown>,
): Promise<string[] | null> {
  // Find ALL photo keys dynamically (photo_1, photo_2, photo_3, ...)
  const photoKeys = Object.keys(wizardData)
    .filter((k) => k.includes(PHOTO_KEY_PREFIX))
    .sort(); // Sort to maintain order (photo_1, photo_2, ...)

  if (photoKeys.length === 0) {
    if (typeof __DEV__ !== "undefined" && __DEV__) {
      console.error("[WizardStrategy] No photos found in wizard data", {
        keys: Object.keys(wizardData),
      });
    }
    return null;
  }

  // Extract photo URIs
  const photoUris: string[] = [];
  for (const key of photoKeys) {
    const photo = wizardData[key] as { uri?: string; base64?: string };
    if (!photo?.uri) {
      if (typeof __DEV__ !== "undefined" && __DEV__) {
        console.error("[WizardStrategy] Photo missing URI", { key });
      }
      return null;
    }
    photoUris.push(photo.uri);
  }

  // Convert all images to base64 in parallel
  const photosBase64 = await Promise.all(
    photoUris.map((uri) => readFileAsBase64(uri)),
  );

  // Filter out nulls/undefined
  const validPhotos = photosBase64.filter(Boolean) as string[];

  if (validPhotos.length === 0) {
    if (typeof __DEV__ !== "undefined" && __DEV__) {
      console.error("[WizardStrategy] Failed to convert any images to base64");
    }
    return null;
  }

  if (typeof __DEV__ !== "undefined" && __DEV__) {
    console.log("[WizardStrategy] Photos extracted", {
      photoCount: validPhotos.length,
      photoKeys,
    });
  }

  return validPhotos;
}

// ============================================================================
// Image Generation Input Builder
// ============================================================================

async function buildImageGenerationInput(
  wizardData: Record<string, unknown>,
  scenario: WizardScenarioData,
): Promise<ImageGenerationInput | null> {
  // Extract photos
  const photos = await extractPhotosFromWizardData(wizardData);
  if (!photos) return null;

  // Validate scenario prompt
  if (!scenario.aiPrompt || scenario.aiPrompt.trim() === "") {
    if (typeof __DEV__ !== "undefined" && __DEV__) {
      console.error("[WizardStrategy] scenario.aiPrompt missing", {
        scenarioId: scenario.id,
      });
    }
    throw new Error(`Scenario "${scenario.id}" must have aiPrompt field`);
  }

  let prompt = scenario.aiPrompt;

  // Enhance prompt with style selections (image-specific)
  const styleEnhancements: string[] = [];

  // Romantic mood (multi-select array)
  const romanticMoods = wizardData.selection_romantic_mood as string[] | undefined;
  if (romanticMoods && romanticMoods.length > 0) {
    styleEnhancements.push(`Mood: ${romanticMoods.join(", ")}`);
  }

  // Art style (single select)
  const artStyle = wizardData.selection_art_style as string | undefined;
  if (artStyle && artStyle !== DEFAULT_STYLE_VALUE) {
    styleEnhancements.push(`Art style: ${artStyle}`);
  }

  // Artist style (single select)
  const artist = wizardData.selection_artist_style as string | undefined;
  if (artist && artist !== DEFAULT_STYLE_VALUE) {
    styleEnhancements.push(`Artist style: ${artist}`);
  }

  // Enhance prompt with selected styles
  if (styleEnhancements.length > 0) {
    prompt = `${prompt}. ${styleEnhancements.join(", ")}`;
  }

  return {
    photos, // Dynamic array - supports 1, 2, 3... N photos
    prompt,
  };
}

// ============================================================================
// Video Generation Input Builder
// ============================================================================

async function buildVideoGenerationInput(
  wizardData: Record<string, unknown>,
  scenario: WizardScenarioData,
): Promise<VideoGenerationInput | null> {
  // Extract photos
  const photos = await extractPhotosFromWizardData(wizardData);
  if (!photos) return null;

  // Video requires at least 1 photo (can duplicate if only 1)
  if (photos.length < 1) {
    if (typeof __DEV__ !== "undefined" && __DEV__) {
      console.error("[WizardStrategy] Video generation needs at least 1 photo");
    }
    return null;
  }

  // Validate scenario prompt
  if (!scenario.aiPrompt || scenario.aiPrompt.trim() === "") {
    if (typeof __DEV__ !== "undefined" && __DEV__) {
      console.error("[WizardStrategy] scenario.aiPrompt missing", {
        scenarioId: scenario.id,
      });
    }
    throw new Error(`Scenario "${scenario.id}" must have aiPrompt field`);
  }

  return {
    sourceImageBase64: photos[0],
    targetImageBase64: photos[1] || photos[0], // Use first photo if only 1 provided
    prompt: scenario.aiPrompt,
  };
}

// ============================================================================
// Input Builder Dispatcher (Routes to correct builder)
// ============================================================================

async function buildGenerationInput(
  wizardData: Record<string, unknown>,
  scenario: WizardScenarioData,
): Promise<WizardGenerationInput | null> {
  const outputType = scenario.outputType || "video";

  if (outputType === "image") {
    return buildImageGenerationInput(wizardData, scenario);
  } else {
    return buildVideoGenerationInput(wizardData, scenario);
  }
}

// ============================================================================
// Video Feature Type Detection
// ============================================================================

function getVideoFeatureType(scenarioId: string): VideoFeatureType {
  const id = scenarioId.toLowerCase();

  for (const [pattern, featureType] of Object.entries(VIDEO_FEATURE_PATTERNS)) {
    if (id.includes(pattern)) {
      return featureType;
    }
  }

  throw new Error(`Unknown video feature type for scenario "${scenarioId}". Add pattern to VIDEO_FEATURE_PATTERNS.`);
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
