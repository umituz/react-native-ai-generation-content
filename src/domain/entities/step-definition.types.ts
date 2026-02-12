/**
 * Step Definition Types
 */

import type { StepType } from "./flow-config.types";
import type { PhotoUploadStepConfig } from "./step-upload-config.types";
import type {
  TextInputStepConfig,
  StyleSelectionStepConfig,
  DurationSelectionStepConfig,
} from "./step-input-config.types";

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
 * Step Builder Result
 */
export interface BuiltStep {
  readonly id: string;
  readonly type: StepType;
  readonly config: Record<string, unknown>;
  readonly required: boolean;
  readonly nextStep?: string | NextStepDecision;
}
