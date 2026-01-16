/**
 * Dynamic Step Builder
 * Builds step definitions from configuration
 */

import { StepType } from "../../../../domain/entities/flow-config.types";
import type {
  ScenarioStepConfig,
  DynamicStepDefinition,
  PhotoUploadStepConfig,
} from "../../../../domain/entities/step-config.types";

/**
 * Build steps from scenario configuration
 * Automatically creates photo upload steps, text input, etc. based on config
 */
export const buildStepsFromScenario = (
  scenarioId: string,
  config: ScenarioStepConfig,
): DynamicStepDefinition[] => {
  const steps: DynamicStepDefinition[] = [];

  // Add photo upload steps (dynamic count)
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
        type: StepType.PARTNER_UPLOAD, // Reuse existing type
        config: photoConfig,
        required: true,
      });
    }
  }

  // Add text input step
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

  // Add style selection step
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

  // Add duration selection step
  if (config.durationSelection?.enabled) {
    steps.push({
      id: "DURATION_SELECTION",
      type: StepType.FEATURE_SELECTION,
      config: {
        id: "DURATION_SELECTION",
        durations: config.durationSelection.durations ?? [5, 10, 15],
        required: config.durationSelection.required ?? false,
      },
      required: config.durationSelection.required ?? false,
    });
  }

  return steps;
};

/**
 * Build steps with conditional navigation
 * Allows data-driven next step decisions
 */
export const buildStepsWithNavigation = (
  baseSteps: DynamicStepDefinition[],
): DynamicStepDefinition[] => {
  return baseSteps.map((step, index) => {
    // Auto-link to next step if not specified
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

  // If nextStep is a function, call it
  if (typeof currentStep.nextStep === "function") {
    return currentStep.nextStep({
      values: context.values,
      currentStepId,
      completedSteps: context.completedSteps,
    });
  }

  // If nextStep is a string, return it
  if (typeof currentStep.nextStep === "string") {
    return currentStep.nextStep;
  }

  // Default: next step in array
  const currentIndex = steps.findIndex((s) => s.id === currentStepId);
  if (currentIndex >= 0 && currentIndex < steps.length - 1) {
    return steps[currentIndex + 1].id;
  }

  return null;
};

/**
 * Example scenario configurations
 */
export const SCENARIO_CONFIGS: Record<string, ScenarioStepConfig> = {
  // Couple/Partner scenarios (2 photos)
  "romantic-kiss": {
    photoUploads: {
      count: 2,
      labels: ["First Partner", "Second Partner"],
      showFaceDetection: true,
      showNameInput: false,
    },
  },
  "couple-hug": {
    photoUploads: {
      count: 2,
      labels: ["Partner A", "Partner B"],
      showFaceDetection: true,
    },
  },

  // Single photo scenarios
  "image-to-video": {
    photoUploads: {
      count: 1,
      labels: ["Your Photo"],
      showFaceDetection: false,
    },
    styleSelection: {
      enabled: true,
      required: true,
    },
    durationSelection: {
      enabled: true,
      required: true,
    },
  },

  // Text-only scenarios
  "text-to-video": {
    textInput: {
      enabled: true,
      required: true,
      minLength: 10,
      maxLength: 500,
    },
    styleSelection: {
      enabled: true,
      required: true,
    },
    durationSelection: {
      enabled: true,
      required: true,
    },
  },

  // Complex scenario with optional steps
  "advanced-generation": {
    photoUploads: {
      count: 1,
      labels: ["Base Image"],
    },
    textInput: {
      enabled: true,
      required: false, // Optional
    },
    styleSelection: {
      enabled: true,
      required: true,
    },
  },
};
