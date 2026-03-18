/**
 * Video Generation Strategy
 * Handles video-specific generation logic (execution only)
 * Uses direct provider calls for generation models (text-to-video, image-to-video)
 */

import type { WizardStrategy } from "./wizard-strategy.types";
import type { CreateVideoStrategyOptions } from "./video-generation.types";
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

