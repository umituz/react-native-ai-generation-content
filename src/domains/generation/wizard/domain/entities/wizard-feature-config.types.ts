/**
 * Wizard Feature Configuration Types
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
