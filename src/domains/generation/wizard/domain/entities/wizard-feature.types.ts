/**
 * Wizard Feature Configuration Types
 * Feature-level configs and builder utilities
 */

import type { WizardStepConfig } from "./wizard-step.types";

/**
 * Feature Flow Configuration
 */
export interface WizardFeatureConfig {
  readonly id: string;
  readonly name: string;
  readonly steps: readonly WizardStepConfig[];
  readonly translations?: {
    readonly [key: string]: string | Record<string, string>;
  };
}

/**
 * Scenario-based Configuration Builder
 */
export interface ScenarioBasedConfig {
  readonly photoCount?: number;
  readonly photoLabels?: readonly string[];
  readonly requireText?: boolean;
  readonly requireStyleSelection?: boolean;
  readonly requireDurationSelection?: boolean;
  readonly customSteps?: readonly WizardStepConfig[];
}

/**
 * Build wizard config from scenario shorthand
 */
export const buildWizardConfigFromScenario = (
  scenarioId: string,
  config: ScenarioBasedConfig,
): WizardFeatureConfig => {
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
};

/**
 * Pre-configured scenarios for common use cases
 */
export const WIZARD_PRESETS = {
  TWO_PHOTOS: {
    photoCount: 2,
  },
  SINGLE_PHOTO: {
    photoCount: 1,
    requireStyleSelection: true,
    requireDurationSelection: true,
  },
  TEXT_ONLY: {
    photoCount: 0,
    requireText: true,
    requireStyleSelection: true,
    requireDurationSelection: true,
  },
} as const;
