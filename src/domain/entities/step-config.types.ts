/**
 * Dynamic Step Configuration Types
 * Configuration-driven wizard flow system
 */

import type { StepType } from "./flow-config.types";

/**
 * Photo Upload Step Config
 */
export interface PhotoUploadStepConfig {
  readonly id: string;
  readonly label?: string; // "First Partner", "Your Photo", etc.
  readonly titleKey?: string;
  readonly subtitleKey?: string;
  readonly showFaceDetection?: boolean;
  readonly showNameInput?: boolean;
  readonly showPhotoTips?: boolean;
  readonly required?: boolean;
}

/**
 * Text Input Step Config
 */
export interface TextInputStepConfig {
  readonly id: string;
  readonly titleKey?: string;
  readonly placeholderKey?: string;
  readonly minLength?: number;
  readonly maxLength?: number;
  readonly required?: boolean;
}

/**
 * Style Selection Step Config
 */
export interface StyleSelectionStepConfig {
  readonly id: string;
  readonly titleKey?: string;
  readonly styles: readonly string[]; // style IDs
  readonly required?: boolean;
}

/**
 * Duration Selection Step Config
 */
export interface DurationSelectionStepConfig {
  readonly id: string;
  readonly titleKey?: string;
  readonly durations: readonly number[]; // seconds
  readonly defaultDuration?: number;
  readonly required?: boolean;
}

/**
 * Next Step Decision Function
 * Evaluates current state and determines next step
 */
export type NextStepDecision = (context: {
  readonly values: Record<string, unknown>;
  readonly currentStepId: string;
  readonly completedSteps: readonly string[];
}) => string | null;

/**
 * Step Definition with Configuration
 */
export interface DynamicStepDefinition {
  readonly id: string;
  readonly type: StepType;
  readonly enabled?: boolean;
  readonly required?: boolean;
  readonly config?:
    | PhotoUploadStepConfig
    | TextInputStepConfig
    | StyleSelectionStepConfig
    | DurationSelectionStepConfig
    | Record<string, unknown>;
  readonly nextStep?: string | NextStepDecision;
  readonly skipIf?: (context: { readonly values: Record<string, unknown> }) => boolean;
}

/**
 * Feature Flow Configuration
 * Defines complete flow for a feature/scenario
 */
export interface FeatureFlowConfig {
  readonly id: string;
  readonly name: string;
  readonly steps: readonly DynamicStepDefinition[];
  readonly initialStepId?: string;
  readonly onComplete?: (data: Record<string, unknown>) => void | Promise<void>;
}

/**
 * Scenario Step Configuration
 * Simplified config for scenario-based flows
 */
export interface ScenarioStepConfig {
  readonly photoUploads?: {
    readonly count: number;
    readonly labels?: readonly string[];
    readonly showFaceDetection?: boolean;
    readonly showNameInput?: boolean;
  };
  readonly textInput?: {
    readonly enabled: boolean;
    readonly required?: boolean;
    readonly minLength?: number;
    readonly maxLength?: number;
  };
  readonly styleSelection?: {
    readonly enabled: boolean;
    readonly required?: boolean;
    readonly styles?: readonly string[];
  };
  readonly durationSelection?: {
    readonly enabled: boolean;
    readonly required?: boolean;
    readonly durations?: readonly number[];
  };
}

/**
 * Step Builder Result
 */
export interface BuiltStep {
  readonly id: string;
  readonly type: StepType;
  readonly config: Record<string, unknown>;
  readonly required: boolean;
  readonly nextStep?: string | NextStepDecision;
}
