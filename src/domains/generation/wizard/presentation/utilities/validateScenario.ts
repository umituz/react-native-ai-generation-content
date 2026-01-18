/**
 * Scenario validation utility
 * Validates that scenario has required fields for wizard generation
 */

import type { WizardScenarioData } from "../hooks/useWizardGeneration";

export interface ScenarioValidationResult {
  isValid: boolean;
  error?: string;
  scenario?: WizardScenarioData;
}

/**
 * Validates scenario data for wizard generation
 * @throws Error if scenario is invalid
 */
export const validateScenario = (
  scenario: WizardScenarioData | undefined,
): WizardScenarioData => {
  if (typeof __DEV__ !== "undefined" && __DEV__) {
    console.log("[validateScenario] Validating", {
      hasScenario: !!scenario,
      scenarioId: scenario?.id,
      hasAiPrompt: !!scenario?.aiPrompt,
      aiPromptLength: scenario?.aiPrompt?.length,
      hasModel: !!scenario?.model,
      outputType: scenario?.outputType,
    });
  }

  if (!scenario || !scenario.id) {
    throw new Error("[validateScenario] Scenario is required");
  }

  if (!scenario.aiPrompt || scenario.aiPrompt.trim() === "") {
    if (typeof __DEV__ !== "undefined" && __DEV__) {
      console.error("[validateScenario] CRITICAL: Scenario missing aiPrompt!", {
        scenarioId: scenario.id,
        aiPrompt: scenario.aiPrompt,
      });
    }
    throw new Error(`[validateScenario] Scenario "${scenario.id}" must have aiPrompt field`);
  }

  if (typeof __DEV__ !== "undefined" && __DEV__) {
    console.log("[validateScenario] Validation passed", {
      scenarioId: scenario.id,
      model: scenario.model,
      outputType: scenario.outputType,
      promptLength: scenario.aiPrompt.length,
    });
  }

  return scenario;
};
