/**
 * Video Generation Strategy
 * Handles video-specific generation logic (execution only)
 * Uses direct provider calls for generation models (text-to-video, image-to-video)
 */

import type { WizardScenarioData } from "../../presentation/hooks/useWizardGeneration";
import type { WizardStrategy } from "./wizard-strategy.types";
import { VIDEO_PROCESSING_PROMPTS } from "./wizard-strategy.constants";
import { extractPrompt, extractDuration, extractAspectRatio, extractResolution, extractQualityMode } from "../utils";
import { extractPhotosAsBase64 } from "./shared/photo-extraction.utils";
import type { WizardVideoInput, CreateVideoStrategyOptions } from "./video-generation.types";
import { validatePhotoCount, validateWizardVideoInput } from "./video-generation.types";
import { executeVideoGeneration, submitVideoGenerationToQueue } from "./video-generation.executor";
import { readFileAsBase64 } from "@umituz/react-native-design-system/filesystem";



/**
 * Extract audio from wizardData and read as base64.
 * Audio step stores data as { uri: "file:///..." }.
 */
async function extractAudioAsBase64(wizardData: Record<string, unknown>): Promise<string | undefined> {
  const audioData = wizardData.background_audio as { uri?: string } | undefined;
  if (!audioData?.uri) return undefined;

  try {
    const base64 = await readFileAsBase64(audioData.uri);
    if (!base64) return undefined;
    if (typeof __DEV__ !== "undefined" && __DEV__) {
      console.log("[VideoStrategy] Audio extracted as base64", { length: base64.length });
    }
    return base64;
  } catch (error) {
    console.warn("[VideoStrategy] Failed to read audio file:", error);
    return undefined;
  }
}

export async function buildVideoInput(
  wizardData: Record<string, unknown>,
  scenario: WizardScenarioData,
): Promise<WizardVideoInput | null> {
  if (typeof __DEV__ !== "undefined" && __DEV__) {
    console.log("[VideoStrategy] Building input", { scenarioId: scenario.id });
  }

  // Extract audio (shared by all code paths)
  const audioUrl = await extractAudioAsBase64(wizardData);

  // If a pre-generated image URL exists (e.g., two-step solo video),
  // use it directly instead of extracting photos from wizard data
  if (scenario.preGeneratedImageUrl) {
    if (typeof __DEV__ !== "undefined" && __DEV__) {
      console.log("[VideoStrategy] Using pre-generated image URL", {
        url: scenario.preGeneratedImageUrl.slice(0, 80),
        hasAudio: !!audioUrl,
      });
    }
    const finalPrompt = extractPrompt(wizardData, scenario.aiPrompt) || scenario.aiPrompt || "";
    const qualityMode = extractQualityMode(wizardData);

    return {
      sourceImageBase64: scenario.preGeneratedImageUrl,
      prompt: finalPrompt,
      duration: extractDuration(wizardData),
      aspectRatio: extractAspectRatio(wizardData),
      resolution: extractResolution(wizardData),
      audioUrl,
      qualityMode,
    };
  }

  const photos = await extractPhotosAsBase64(wizardData, true);

  const validation = validatePhotoCount(photos.length, scenario.inputType);
  if (!validation.isValid) {
    throw new Error(validation.errorKey ?? "error.generation.invalidInput");
  }

  let finalPrompt = extractPrompt(wizardData, scenario.aiPrompt);

  if (!finalPrompt) {
    const defaultPrompt = VIDEO_PROCESSING_PROMPTS[scenario.id];
    if (defaultPrompt) {
      finalPrompt = defaultPrompt;
    } else {
      if (typeof __DEV__ !== "undefined" && __DEV__) {
        console.error("[VideoStrategy] No prompt found for scenario:", scenario.id);
        console.error("[VideoStrategy] Available defaults:", Object.keys(VIDEO_PROCESSING_PROMPTS));
      }
      throw new Error("error.generation.promptRequired");
    }
  }

  if (typeof __DEV__ !== "undefined" && __DEV__) {
    console.log("[VideoStrategy] Using clean prompt for video generation", {
      promptLength: finalPrompt.length,
      photoCount: photos.length,
      hasAudio: !!audioUrl,
    });
  }

  const qualityMode = extractQualityMode(wizardData);

  return {
    sourceImageBase64: photos[0] || undefined,
    targetImageBase64: photos[1] || photos[0] || undefined,
    prompt: finalPrompt,
    duration: extractDuration(wizardData),
    aspectRatio: extractAspectRatio(wizardData),
    resolution: extractResolution(wizardData),
    audioUrl,
    qualityMode,
  };
}

export function createVideoStrategy(options: CreateVideoStrategyOptions): WizardStrategy {
  const { scenario, modelConfig } = options;

  // Validate model early - fail fast
  if (!scenario.model) {
    throw new Error("Model is required for video generation");
  }

  const model = scenario.model;
  const providerId = scenario.providerId;

  return {
    execute: async (input: unknown) => {
      const videoInput = validateWizardVideoInput(input);

      const result = await executeVideoGeneration(videoInput, model, undefined, modelConfig, providerId);

      if (!result.success || !result.videoUrl) {
        throw new Error(result.error || "Video generation failed");
      }

      return { videoUrl: result.videoUrl };
    },

    submitToQueue: async (input: unknown) => {
      const videoInput = validateWizardVideoInput(input);

      const result = await submitVideoGenerationToQueue(videoInput, model, modelConfig, providerId);

      return {
        success: result.success,
        requestId: result.requestId,
        model: result.model,
        error: result.error,
      };
    },
  };
}
