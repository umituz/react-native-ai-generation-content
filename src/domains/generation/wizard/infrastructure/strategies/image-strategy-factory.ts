/**
 * Image Generation Strategy - Strategy Factory
 */

import type { WizardScenarioData } from "../../presentation/hooks/useWizardGeneration";
import type { WizardStrategy } from "./wizard-strategy.types";
import type { CreateImageStrategyOptions } from "./image-generation.types";
import { executeImageGeneration } from "./image-generation.executor";
import type { WizardImageInput } from "./image-generation.types";

/**
 * Create image generation strategy
 */
export function createImageStrategy(options: CreateImageStrategyOptions): WizardStrategy {
  const { scenario } = options;

  // Validate model early - fail fast
  if (!scenario.model) {
    throw new Error("Model is required for image generation");
  }

  const model = scenario.model;
  const providerId = scenario.providerId;

  return {
    execute: async (input: unknown) => {
      if (!input || typeof input !== "object") {
        throw new Error("Invalid input: expected WizardImageInput object");
      }
      const imageInput = input as WizardImageInput;
      const result = await executeImageGeneration(imageInput, model, undefined, providerId);

      if (!result.success || !result.imageUrl) {
        const error = new Error(result.error || "Image generation failed");
        (error as Error & { logSessionId?: string }).logSessionId = result.logSessionId;
        throw error;
      }

      return { imageUrl: result.imageUrl, logSessionId: result.logSessionId };
    },
  };
}
