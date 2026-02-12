/**
 * Video Generation Strategy
 * Handles video-specific generation logic (execution only)
 * Uses clean prompts for Sora 2 - no complex identity preservation text
 */

import {
  executeVideoFeature,
  submitVideoFeatureToQueue,
} from "../../../../../infrastructure/services/video-feature-executor.service";
import type { WizardScenarioData } from "../../presentation/hooks/useWizardGeneration";
import type { WizardStrategy } from "./wizard-strategy.types";
import { VIDEO_PROCESSING_PROMPTS } from "./wizard-strategy.constants";
import { extractPrompt, extractDuration, extractAspectRatio, extractResolution } from "../utils";
import { extractPhotosAsBase64 } from "./shared/photo-extraction.utils";
import { getVideoFeatureType } from "./video-generation.utils";
import type { WizardVideoInput, CreateVideoStrategyOptions } from "./video-generation.types";
import { validatePhotoCount, validateWizardVideoInput } from "./video-generation.types";

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

  // For video generation with Sora 2, use clean prompt directly
  // No need for complex identity preservation text - Sora 2 handles this natively
  if (typeof __DEV__ !== "undefined" && __DEV__) {
    console.log("[VideoStrategy] Using clean prompt for Sora 2", {
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
  const { scenario, creditCost } = options;
  const videoFeatureType = getVideoFeatureType(scenario);

  return {
    execute: async (input: unknown) => {
      // Runtime validation with descriptive errors
      const videoInput = validateWizardVideoInput(input);

      const result = await executeVideoFeature(videoFeatureType, {
        sourceImageBase64: videoInput.sourceImageBase64,
        targetImageBase64: videoInput.targetImageBase64,
        prompt: videoInput.prompt,
        options: {
          duration: videoInput.duration,
          aspect_ratio: videoInput.aspectRatio,
          resolution: videoInput.resolution,
        },
      });

      if (!result.success || !result.videoUrl) {
        throw new Error(result.error || "Video generation failed");
      }

      return { videoUrl: result.videoUrl };
    },

    submitToQueue: async (input: unknown) => {
      // Runtime validation with descriptive errors
      const videoInput = validateWizardVideoInput(input);

      const result = await submitVideoFeatureToQueue(videoFeatureType, {
        sourceImageBase64: videoInput.sourceImageBase64,
        targetImageBase64: videoInput.targetImageBase64,
        prompt: videoInput.prompt,
        options: {
          duration: videoInput.duration,
          aspect_ratio: videoInput.aspectRatio,
          resolution: videoInput.resolution,
        },
      });

      return {
        success: result.success,
        requestId: result.requestId,
        model: result.model,
        error: result.error,
      };
    },

    getCreditCost: () => creditCost,
  };
}
