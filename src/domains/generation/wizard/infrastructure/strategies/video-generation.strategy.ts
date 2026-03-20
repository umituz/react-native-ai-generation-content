/**
 * Video Generation Strategy
 * Handles video-specific generation logic (execution only)
 * Uses direct provider calls for generation models (text-to-video, image-to-video)
 */

import type { WizardStrategy } from "./wizard-strategy.types";
import type { CreateVideoStrategyOptions, WizardVideoInput } from "./video-generation.types";
import type { WizardScenarioData } from "../../presentation/hooks/useWizardGeneration";
import { validateWizardVideoInput } from "./video-generation.validation";
import { executeVideoGeneration, submitVideoGenerationToQueue } from "./video-generation.executor";

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

/**
 * Build video input from wizard data and scenario
 */
export async function buildVideoInput(
  wizardData: Record<string, unknown>,
  scenario: WizardScenarioData
): Promise<WizardVideoInput> {
  const prompt = (wizardData.prompt as string | undefined) || scenario.prompt || "";
  const input: WizardVideoInput = {
    prompt,
    sourceImageBase64: wizardData.sourceImageBase64 as string | undefined,
    targetImageBase64: wizardData.targetImageBase64 as string | undefined,
    duration: wizardData.duration as number | undefined,
    aspectRatio: wizardData.aspectRatio as string | undefined,
    resolution: wizardData.resolution as string | undefined,
    audioUrl: wizardData.audioUrl as string | undefined,
    qualityMode: wizardData.qualityMode as "draft" | "normal" | undefined,
  };

  return input;
}

