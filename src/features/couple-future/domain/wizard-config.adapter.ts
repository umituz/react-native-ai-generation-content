/**
 * Wizard Configuration Adapter
 * Adapts old wizard config to new dynamic step system
 */

import { buildStepsFromScenario, buildStepsWithNavigation, SCENARIO_CONFIGS } from "../../../infrastructure/flow/step-builder";
import type { DynamicStepDefinition } from "../../../domain/entities/step-config.types";
import type { WizardScenarioData } from "../presentation/types";
import { StepType } from "../../../domain/entities/flow-config.types";

/**
 * Build steps for a scenario
 * Returns dynamically generated step definitions based on scenario type
 */
export const buildStepsForScenario = (scenario: WizardScenarioData | undefined): DynamicStepDefinition[] => {
  if (!scenario) {
    // No scenario selected - only show scenario selection
    return [
      {
        id: "SCENARIO_SELECTION",
        type: StepType.SCENARIO_SELECTION,
        required: true,
      },
    ];
  }

  const steps: DynamicStepDefinition[] = [];

  // Always start with scenario preview if scenario is selected
  steps.push({
    id: "SCENARIO_PREVIEW",
    type: StepType.SCENARIO_PREVIEW,
    required: true,
  });

  // Get scenario-specific config
  const scenarioConfig = SCENARIO_CONFIGS[scenario.category || ""] || SCENARIO_CONFIGS["romantic-kiss"];

  // Build dynamic steps from config
  const dynamicSteps = buildStepsFromScenario(scenario.id, scenarioConfig);
  steps.push(...dynamicSteps);

  // Add generating step
  steps.push({
    id: "GENERATING",
    type: StepType.GENERATING,
    required: true,
  });

  // Link steps together
  return buildStepsWithNavigation(steps);
};

/**
 * Get photo upload count for a scenario
 * Used to determine how many partner images are needed
 */
export const getPhotoUploadCount = (scenario: WizardScenarioData | undefined): number => {
  if (!scenario) return 0;

  const scenarioConfig = SCENARIO_CONFIGS[scenario.category || ""] || SCENARIO_CONFIGS["romantic-kiss"];
  return scenarioConfig.photoUploads?.count ?? 0;
};

/**
 * Get photo upload label for a specific index
 */
export const getPhotoUploadLabel = (
  scenario: WizardScenarioData | undefined,
  index: number,
): string => {
  if (!scenario) return `Photo ${index + 1}`;

  const scenarioConfig = SCENARIO_CONFIGS[scenario.category || ""] || SCENARIO_CONFIGS["romantic-kiss"];
  return scenarioConfig.photoUploads?.labels?.[index] || `Photo ${index + 1}`;
};
