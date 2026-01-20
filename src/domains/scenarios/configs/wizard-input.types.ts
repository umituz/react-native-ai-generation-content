/**
 * Wizard Input Types
 * Type definitions for wizard input classification
 */

import type { WizardFeatureConfig } from "../../generation/wizard/domain/entities/wizard-config.types";

/**
 * Input Type Classification
 * Based on what inputs the wizard needs (photos, text)
 */
export enum WizardInputType {
  DUAL_IMAGE = "dual_image",
  SINGLE_IMAGE = "single_image",
  TEXT_INPUT = "text_input",
  DUAL_IMAGE_FACE = "dual_image_face",
}

/**
 * Configuration Options for wizard config resolver
 */
export interface WizardConfigOptions {
  readonly inputType?: WizardInputType;
  readonly additionalSteps?: WizardFeatureConfig["steps"];
  readonly overrides?: Partial<WizardFeatureConfig>;
}

/**
 * Factory function type for creating wizard configs
 */
export type WizardConfigFactory = (scenarioId: string) => WizardFeatureConfig;
