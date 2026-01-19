/**
 * Wizard Configuration Types
 * Generic, feature-agnostic wizard configuration system
 *
 * All features use these same types - NO feature-specific wizards!
 */

import type { StepType } from "../../../../../domain/entities/flow-config.types";

/**
 * Generic Step Configuration
 * Base interface for all step configs
 */
export interface BaseStepConfig {
  readonly id: string;
  readonly type: StepType | string;
  readonly enabled?: boolean;
  readonly required?: boolean;
  readonly titleKey?: string;
  readonly subtitleKey?: string;
}

/**
 * Photo Upload Step Configuration
 * Used by ANY feature that needs photo uploads (couple, face-swap, image-to-video, etc.)
 */
export interface PhotoUploadStepConfig extends BaseStepConfig {
  readonly type: "photo_upload";
  readonly label?: string; // "Photo 1", "Photo 2", "Your Photo", etc.
  readonly showFaceDetection?: boolean;
  readonly showNameInput?: boolean;
  readonly showPhotoTips?: boolean;
  readonly maxFileSizeMB?: number;
}

/**
 * Text Input Step Configuration
 * Used by text-to-video, prompt-based features, etc.
 */
export interface TextInputStepConfig extends BaseStepConfig {
  readonly type: "text_input";
  readonly placeholderKey?: string;
  readonly minLength?: number;
  readonly maxLength?: number;
  readonly multiline?: boolean;
}

/**
 * Selection Step Configuration
 * Generic selection (style, duration, aspect ratio, etc.)
 */
export interface SelectionStepConfig extends BaseStepConfig {
  readonly type: "selection";
  readonly selectionType: "style" | "duration" | "aspect_ratio" | "quality" | "custom";
  readonly options: readonly {
    readonly id: string;
    readonly label: string;
    readonly icon?: string;
    readonly value: unknown;
  }[];
  readonly multiSelect?: boolean;
  readonly defaultValue?: string | string[];
}

/**
 * Preview Step Configuration
 * Shows preview before generation (scenario preview, settings review, etc.)
 */
export interface PreviewStepConfig extends BaseStepConfig {
  readonly type: "preview";
  readonly previewType: "scenario" | "settings" | "custom";
  readonly showContinueButton?: boolean;
}

/**
 * Auth Gate Step Configuration
 * Blocks flow if user is not authenticated
 */
export interface AuthGateStepConfig extends BaseStepConfig {
  readonly type: "auth_gate";
  readonly allowAnonymous?: boolean;
  readonly messageKey?: string;
}

/**
 * Credit Gate Step Configuration
 * Blocks flow if user doesn't have enough credits
 */
export interface CreditGateStepConfig extends BaseStepConfig {
  readonly type: "credit_gate";
  readonly requiredCredits: number;
  readonly messageKey?: string;
}

/**
 * Union of all step config types
 */
export type WizardStepConfig =
  | AuthGateStepConfig
  | CreditGateStepConfig
  | PhotoUploadStepConfig
  | TextInputStepConfig
  | SelectionStepConfig
  | PreviewStepConfig
  | BaseStepConfig;

/**
 * Feature Flow Configuration
 * Each feature (image-to-video, face-swap, couple-future, etc.) provides this
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
 * Shorthand for common patterns (couple scenarios, single photo, etc.)
 */
export interface ScenarioBasedConfig {
  readonly photoCount?: number; // 0, 1, 2, etc.
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

  // Add photo upload steps (max 2 photos)
  if (config.photoCount && config.photoCount > 0) {
    const maxPhotos = Math.min(config.photoCount, 2); // Max 2 photos
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

  // Add text input
  if (config.requireText) {
    steps.push({
      id: "text_input",
      type: "text_input",
      required: true,
      minLength: 10,
      maxLength: 500,
    });
  }

  // Add style selection
  if (config.requireStyleSelection) {
    steps.push({
      id: "style_selection",
      type: "selection",
      selectionType: "style",
      options: [], // Provided by feature
      required: true,
    });
  }

  // Add duration selection
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

  // Add custom steps
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
 * Labels should be provided from main app via photoLabels parameter
 */
export const WIZARD_PRESETS = {
  // Two photo features (couple, comparison, etc.)
  TWO_PHOTOS: {
    photoCount: 2,
  },

  // Single photo features
  SINGLE_PHOTO: {
    photoCount: 1,
    requireStyleSelection: true,
    requireDurationSelection: true,
  },

  // Text-only features
  TEXT_ONLY: {
    photoCount: 0,
    requireText: true,
    requireStyleSelection: true,
    requireDurationSelection: true,
  },
} as const;
