/**
 * Step Builders
 * Functions for building step definitions from configuration
 */

import { StepType } from "../../../../domain/entities/flow-config.types";
import type {
  ScenarioStepConfig,
  DynamicStepDefinition,
  PhotoUploadStepConfig,
} from "../../../../domain/entities/step-config.types";

/**
 * Build steps from scenario configuration
 */
export const buildStepsFromScenario = (
  config: ScenarioStepConfig,
): DynamicStepDefinition[] => {
  const steps: DynamicStepDefinition[] = [];

  if (config.photoUploads && config.photoUploads.count > 0) {
    for (let i = 0; i < config.photoUploads.count; i++) {
      const photoConfig: PhotoUploadStepConfig = {
        id: `PHOTO_UPLOAD_${i}`,
        label: config.photoUploads.labels?.[i] || `Photo ${i + 1}`,
        showFaceDetection: config.photoUploads.showFaceDetection ?? false,
        showNameInput: config.photoUploads.showNameInput ?? false,
        showPhotoTips: true,
        required: true,
      };

      steps.push({
        id: `PHOTO_UPLOAD_${i}`,
        type: StepType.PARTNER_UPLOAD,
        config: photoConfig,
        required: true,
      });
    }
  }

  if (config.textInput?.enabled) {
    steps.push({
      id: "TEXT_INPUT",
      type: StepType.TEXT_INPUT,
      config: {
        id: "TEXT_INPUT",
        minLength: config.textInput.minLength ?? 0,
        maxLength: config.textInput.maxLength ?? 500,
        required: config.textInput.required ?? false,
      },
      required: config.textInput.required ?? false,
    });
  }

  if (config.styleSelection?.enabled) {
    steps.push({
      id: "STYLE_SELECTION",
      type: StepType.FEATURE_SELECTION,
      config: {
        id: "STYLE_SELECTION",
        styles: config.styleSelection.styles ?? [],
        required: config.styleSelection.required ?? false,
      },
      required: config.styleSelection.required ?? false,
    });
  }

  if (config.durationSelection?.enabled) {
    steps.push({
      id: "DURATION_SELECTION",
      type: StepType.FEATURE_SELECTION,
      config: {
        id: "DURATION_SELECTION",
        durations: config.durationSelection.durations ?? [4, 8, 12],
        required: config.durationSelection.required ?? false,
      },
      required: config.durationSelection.required ?? false,
    });
  }

  return steps;
};

/**
 * Build steps with conditional navigation
 */
export const buildStepsWithNavigation = (
  baseSteps: DynamicStepDefinition[],
): DynamicStepDefinition[] => {
  return baseSteps.map((step, index) => {
    if (!step.nextStep && index < baseSteps.length - 1) {
      return {
        ...step,
        nextStep: baseSteps[index + 1].id,
      };
    }
    return step;
  });
};

/**
 * Get next step ID based on configuration and state
 */
export const resolveNextStep = (
  currentStepId: string,
  steps: readonly DynamicStepDefinition[],
  context: {
    readonly values: Record<string, unknown>;
    readonly completedSteps: readonly string[];
  },
): string | null => {
  const currentStep = steps.find((s) => s.id === currentStepId);
  if (!currentStep) return null;

  if (typeof currentStep.nextStep === "function") {
    return currentStep.nextStep({
      values: context.values,
      currentStepId,
      completedSteps: context.completedSteps,
    });
  }

  if (typeof currentStep.nextStep === "string") {
    return currentStep.nextStep;
  }

  const currentIndex = steps.findIndex((s) => s.id === currentStepId);
  if (currentIndex >= 0 && currentIndex < steps.length - 1) {
    return steps[currentIndex + 1].id;
  }

  return null;
};
