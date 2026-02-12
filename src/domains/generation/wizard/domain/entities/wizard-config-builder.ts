/**
 * Wizard Config Builder
 * Domain Service: Builds wizard configuration from scenario
 */

import type { WizardStepConfig } from "./wizard-step.types";
import type { WizardFeatureConfig, ScenarioBasedConfig } from "./wizard-feature-config.types";

/**
 * Build wizard config from scenario shorthand
 */
export function buildWizardConfigFromScenario(
  scenarioId: string,
  config: ScenarioBasedConfig
): WizardFeatureConfig {
  const steps: WizardStepConfig[] = [];

  if (config.photoCount && config.photoCount > 0) {
    const maxPhotos = Math.min(config.photoCount, 2);
    for (let i = 0; i < maxPhotos; i++) {
      steps.push({
        id: `photo_${i + 1}`,
        type: "photo_upload",
        label: config.photoLabels?.[i] || `Photo ${i + 1}`,
        showFaceDetection: true,
        showPhotoTips: true,
        required: true,
      });
    }
  }

  if (config.requireText) {
    steps.push({
      id: "text_input",
      type: "text_input",
      required: true,
      minLength: 10,
      maxLength: 500,
    });
  }

  if (config.requireStyleSelection) {
    steps.push({
      id: "style_selection",
      type: "selection",
      selectionType: "style",
      options: [],
      required: true,
    });
  }

  if (config.requireDurationSelection) {
    steps.push({
      id: "duration_selection",
      type: "selection",
      selectionType: "duration",
      options: [
        { id: "5s", label: "5 seconds", value: 5 },
        { id: "10s", label: "10 seconds", value: 10 },
        { id: "15s", label: "15 seconds", value: 15 },
      ],
      required: true,
    });
  }

  if (config.customSteps) {
    steps.push(...config.customSteps);
  }

  return {
    id: scenarioId,
    name: scenarioId,
    steps,
  };
}
