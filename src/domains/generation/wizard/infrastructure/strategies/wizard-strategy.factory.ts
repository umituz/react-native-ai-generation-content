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

// ============================================================================
// Types
// ============================================================================

export type { WizardStrategy } from "./wizard-strategy.types";

export interface CreateWizardStrategyOptions {
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
    return buildImageInput(wizardData, scenario);
  }

  // Default to video input for video outputType or undefined
  return buildVideoInput(wizardData, scenario);
}
