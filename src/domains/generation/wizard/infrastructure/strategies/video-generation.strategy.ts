/**
 * Video Generation Strategy
 * Handles video-specific generation logic (execution only)
 * Uses direct provider calls for generation models (text-to-video, image-to-video)
 */

import type { WizardScenarioData } from "../../presentation/hooks/useWizardGeneration";
import type { WizardStrategy } from "./wizard-strategy.types";
import { VIDEO_PROCESSING_PROMPTS } from "./wizard-strategy.constants";
import { extractPrompt, extractDuration, extractAspectRatio, extractResolution } from "../utils";
import { extractPhotosAsBase64 } from "./shared/photo-extraction.utils";
import type { WizardVideoInput, CreateVideoStrategyOptions } from "./video-generation.types";
import { validatePhotoCount, validateWizardVideoInput } from "./video-generation.types";
import { executeVideoGeneration, submitVideoGenerationToQueue } from "./video-generation.executor";

declare const __DEV__: boolean;

export type { WizardVideoInput, WizardVideoResult, CreateVideoStrategyOptions } from "./video-generation.types";

export async function buildVideoInput(
  wizardData: Record<string, unknown>,
  scenario: WizardScenarioData,
): Promise<WizardVideoInput | null> {
  if (typeof __DEV__ !== "undefined" && __DEV__) {
    console.log("[VideoStrategy] Building input", { scenarioId: scenario.id });
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

  // For video generation, use clean prompt directly
  // Modern models handle context natively
  if (typeof __DEV__ !== "undefined" && __DEV__) {
    console.log("[VideoStrategy] Using clean prompt for video generation", {
      promptLength: finalPrompt.length,
      photoCount: photos.length,
    });
  }

  return {
    sourceImageBase64: photos[0],
    targetImageBase64: photos[1] || photos[0],
    prompt: finalPrompt,
    duration: extractDuration(wizardData),
    aspectRatio: extractAspectRatio(wizardData),
    resolution: extractResolution(wizardData),
  };
}

export function createVideoStrategy(options: CreateVideoStrategyOptions): WizardStrategy {
  const { scenario, modelConfig } = options;

  // Validate model early - fail fast
  if (!scenario.model) {
    throw new Error("Model is required for video generation");
  }

  const model = scenario.model;

  return {
    execute: async (input: unknown) => {
      const videoInput = validateWizardVideoInput(input);

      const result = await executeVideoGeneration(videoInput, model, undefined, modelConfig);

      if (!result.success || !result.videoUrl) {
        throw new Error(result.error || "Video generation failed");
      }

      return { videoUrl: result.videoUrl };
    },

    submitToQueue: async (input: unknown) => {
      const videoInput = validateWizardVideoInput(input);

      const result = await submitVideoGenerationToQueue(videoInput, model, modelConfig);

      return {
        success: result.success,
        requestId: result.requestId,
        model: result.model,
        error: result.error,
      };
    },
  };
}
