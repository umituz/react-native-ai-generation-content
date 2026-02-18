/**
 * Scenario validation utility
 * Validates that scenario has required fields for wizard generation
 * NOTE: aiPrompt is optional - can come from wizard data (text_input step)
 */

import type { WizardScenarioData } from "../hooks/useWizardGeneration";


/**
 * Validates scenario data for wizard generation
 * aiPrompt is optional - for TEXT_INPUT scenarios, prompt comes from wizard data
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
      outputType: scenario?.outputType,
    });
  }

  if (!scenario || !scenario.id) {
    throw new Error("[validateScenario] Scenario is required");
  }

  // aiPrompt is optional - for TEXT_INPUT scenarios, prompt comes from wizard data
  if (typeof __DEV__ !== "undefined" && __DEV__) {
    console.log("[validateScenario] Validation passed", {
      scenarioId: scenario.id,
      outputType: scenario.outputType,
      hasPrompt: !!scenario.aiPrompt,
    });
  }

  return scenario;
};
