/**
 * Scenario Configurations
 * Pre-defined step configurations for common scenarios
 */

import type { ScenarioStepConfig } from "../../../../domain/entities/step-config.types";

export const SCENARIO_CONFIGS: Record<string, ScenarioStepConfig> = {
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
  "advanced-generation": {
    photoUploads: {
      count: 1,
      labels: ["Base Image"],
    },
    textInput: {
      enabled: true,
      required: false,
    },
    styleSelection: {
      enabled: true,
      required: true,
    },
  },
};
