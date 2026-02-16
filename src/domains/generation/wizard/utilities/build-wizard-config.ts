/**
 * Build Wizard Config from VideoModelConfig
 * Generates wizard step configuration from model capabilities.
 * No hardcoded model-specific values - everything comes from config.
 */

import type { VideoModelConfig } from "../../../../domain/interfaces/video-model-config.types";
import type { WizardFeatureConfig } from "../domain/entities/wizard-feature-config.types";
import type { WizardStepConfig } from "../domain/entities/wizard-step.types";

/**
 * Builds a WizardFeatureConfig from a VideoModelConfig + input steps.
 * Input steps (photo upload, text input) come from the caller.
 * Resolution/duration/aspectRatio steps are auto-generated from model capabilities.
 */
export function buildWizardConfigFromModelConfig(
  modelConfig: VideoModelConfig,
  inputSteps: readonly WizardStepConfig[],
): WizardFeatureConfig {
  const steps: WizardStepConfig[] = [...inputSteps];

  if (modelConfig.capabilities.resolutions.length > 0) {
    steps.push({
      id: "resolution",
      type: "selection" as const,
      titleKey: "generation.resolution.title",
      selectionType: "resolution" as const,
      options: modelConfig.capabilities.resolutions.map((r) => ({
        id: r.id,
        label: r.label,
        value: r.value,
      })),
      required: true,
      defaultValue: modelConfig.capabilities.defaults.resolution,
    });
  }

  if (modelConfig.capabilities.aspectRatios && modelConfig.capabilities.aspectRatios.length > 0) {
    steps.push({
      id: "aspect_ratio",
      type: "selection" as const,
      titleKey: "generation.aspectRatio.title",
      selectionType: "aspect_ratio" as const,
      options: modelConfig.capabilities.aspectRatios.map((a) => ({
        id: a.id,
        label: a.label,
        value: a.value,
      })),
      required: true,
      defaultValue: modelConfig.capabilities.defaults.aspectRatio,
    });
  }

  if (modelConfig.capabilities.durations.length > 0) {
    steps.push({
      id: "duration",
      type: "selection" as const,
      titleKey: "generation.duration.title",
      selectionType: "duration" as const,
      layout: "list" as const,
      options: modelConfig.capabilities.durations.map((d) => ({
        id: d.id,
        label: d.label,
        value: d.value,
      })),
      required: true,
      defaultValue: String(modelConfig.capabilities.defaults.duration),
    });
  }

  return {
    id: modelConfig.modelId,
    name: modelConfig.displayName,
    steps,
  };
}
