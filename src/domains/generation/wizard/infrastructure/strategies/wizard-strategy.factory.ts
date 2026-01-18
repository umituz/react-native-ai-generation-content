/**
 * Wizard Strategy Factory
 * Routes to correct strategy based on output type
 * Single Responsibility: Only dispatches, doesn't contain business logic
 */

import type { WizardScenarioData } from "../../presentation/hooks/useWizardGeneration";
import type { WizardStrategy } from "./wizard-strategy.types";
import { createImageStrategy, buildImageInput } from "./image-generation.strategy";
import { createVideoStrategy, buildVideoInput } from "./video-generation.strategy";

// ============================================================================
// Types
// ============================================================================

export type { WizardStrategy } from "./wizard-strategy.types";

export interface CreateWizardStrategyOptions {
  readonly scenario: WizardScenarioData;
  readonly wizardData: Record<string, unknown>;
  readonly collectionName?: string;
}

// ============================================================================
// Strategy Factory
// ============================================================================

export function createWizardStrategy(options: CreateWizardStrategyOptions): WizardStrategy {
  const { scenario, collectionName } = options;
  const outputType = scenario.outputType || "video";

  if (outputType === "image") {
    return createImageStrategy({ scenario, collectionName });
  }

  return createVideoStrategy({ scenario, collectionName });
}

// ============================================================================
// Input Builder
// ============================================================================

export async function buildWizardInput(
  wizardData: Record<string, unknown>,
  scenario: WizardScenarioData,
): Promise<unknown> {
  const outputType = scenario.outputType || "video";

  if (outputType === "image") {
    return buildImageInput(wizardData, scenario);
  }

  return buildVideoInput(wizardData, scenario);
}
