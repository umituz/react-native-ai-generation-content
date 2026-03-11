/**
 * Wizard Strategy Factory
 * Routes to correct strategy based on output type
 * Single Responsibility: Only dispatches, doesn't contain business logic
 */

import type { WizardScenarioData } from "../../presentation/hooks/useWizardGeneration";
import type { WizardStrategy } from "./wizard-strategy.types";
import type { VideoModelConfig } from "../../../../../domain/interfaces/video-model-config.types";
import { createImageStrategy, buildImageInput } from "./image-generation.strategy";
import { createVideoStrategy, buildVideoInput } from "./video-generation.strategy";
import { createAudioStrategy, buildAudioInput } from "./audio-generation.strategy";

// ============================================================================
// Types
// ============================================================================

interface CreateWizardStrategyOptions {
  readonly scenario: WizardScenarioData;
  /** Model configuration - encapsulates all model-specific behavior */
  readonly modelConfig?: VideoModelConfig;
  readonly collectionName?: string;
  /** Credit cost for this generation - REQUIRED, determined by the app */
  readonly creditCost: number;
}

// ============================================================================
// Strategy Factory
// ============================================================================

export function createWizardStrategy(options: CreateWizardStrategyOptions): WizardStrategy {
  const { scenario, modelConfig, collectionName, creditCost } = options;

  if (scenario.outputType === "image") {
    return createImageStrategy({ scenario, collectionName, creditCost });
  }

  if (scenario.outputType === "audio") {
    return createAudioStrategy({ scenario, collectionName, creditCost });
  }

  // Default to video strategy for video outputType or undefined
  return createVideoStrategy({ scenario, modelConfig, collectionName, creditCost });
}

// ============================================================================
// Input Builder
// ============================================================================

export async function buildWizardInput(
  wizardData: Record<string, unknown>,
  scenario: WizardScenarioData,
): Promise<unknown> {
  if (scenario.outputType === "image") {
    const input = await buildImageInput(wizardData, scenario);
    if (!input) {
      throw new Error("Failed to build image input");
    }
    return input;
  }

  if (scenario.outputType === "audio") {
    return buildAudioInput(wizardData, scenario);
  }

  // Default to video input for video outputType or undefined
  const input = await buildVideoInput(wizardData, scenario);
  if (!input) {
    throw new Error("Failed to build video input");
  }
  return input;
}
