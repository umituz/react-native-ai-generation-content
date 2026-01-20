/**
 * Dynamic Step Builder
 * Builds flow-compatible steps from wizard configurations
 * Works with ANY feature - completely generic!
 */

import { StepType } from "../../../../../domain/entities/flow-config.types";
import type { StepDefinition } from "../../../../../domain/entities/flow-config.types";
import type {
  WizardFeatureConfig,
  WizardStepConfig,
  ScenarioBasedConfig,
} from "../../domain/entities/wizard-config.types";

/**
 * Convert wizard step config to flow step definition
 */
const convertToFlowStep = (wizardStep: WizardStepConfig): StepDefinition => {
  // Map wizard step types to flow step types
  const typeMap: Record<string, StepType> = {
    photo_upload: StepType.PARTNER_UPLOAD,
    text_input: StepType.TEXT_INPUT,
    selection: StepType.FEATURE_SELECTION,
    preview: StepType.SCENARIO_PREVIEW,
  };

  return {
    id: wizardStep.id,
    type: typeMap[wizardStep.type] || StepType.CUSTOM,
    required: wizardStep.required ?? true,
    config: wizardStep, // Pass entire wizard config as config
  };
};

/**
 * Build flow steps from wizard feature config
 * This is the ONLY function needed to convert any feature config to flow steps!
 */
export const buildFlowStepsFromWizard = (
  featureConfig: WizardFeatureConfig,
  options?: {
    includePreview?: boolean;
    includeGenerating?: boolean;
    includeResult?: boolean;
  },
): StepDefinition[] => {
  const steps: StepDefinition[] = [];

  // Add scenario preview if requested
  if (options?.includePreview) {
    steps.push({
      id: "SCENARIO_PREVIEW",
      type: StepType.SCENARIO_PREVIEW,
      required: true,
    });
  }

  // Convert all wizard steps to flow steps
  featureConfig.steps.forEach((wizardStep) => {
    if (wizardStep.enabled !== false) {
      steps.push(convertToFlowStep(wizardStep));
    }
  });

  // Add generating step if requested
  if (options?.includeGenerating) {
    steps.push({
      id: "GENERATING",
      type: StepType.GENERATING,
      required: true,
    });

    // Add result preview after generating (unless explicitly disabled)
    if (options?.includeResult !== false) {
      steps.push({
        id: "RESULT_PREVIEW",
        type: StepType.RESULT_PREVIEW,
        required: true,
      });
    }
  }

  return steps;
};

/**
 * Get photo upload count from wizard config
 */
export const getPhotoUploadCount = (config: WizardFeatureConfig): number => {
  return config.steps.filter((s) => s.type === "photo_upload").length;
};

/**
 * Get step config by ID
 */
export const getStepConfig = (
  config: WizardFeatureConfig,
  stepId: string,
): WizardStepConfig | undefined => {
  return config.steps.find((s) => s.id === stepId);
};

/**
 * Quick builder for common patterns
 */
export const quickBuildWizard = (
  featureId: string,
  scenarioConfig: ScenarioBasedConfig,
): StepDefinition[] => {
  const { buildWizardConfigFromScenario } = require("../../domain/entities/wizard-config.types");
  const wizardConfig = buildWizardConfigFromScenario(featureId, scenarioConfig);
  return buildFlowStepsFromWizard(wizardConfig, {
    includePreview: true,
    includeGenerating: true,
  });
};
