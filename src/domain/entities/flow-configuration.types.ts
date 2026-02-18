/**
 * Flow Configuration Types
 */

import type { StepDefinition } from "./flow-step.types";
import type { FlowVisualStyleData } from "./flow-config-data.types";

/** Flow Callbacks */
export interface FlowCallbacks {
  onAuthRequired?: (resume: () => void) => void;
  onCreditsExhausted?: () => void;
  onGenerationStart?: () => void;
  onGenerationSuccess?: (result: unknown) => void;
  onGenerationError?: (error: string) => void;
  onStepChange?: (stepId: string, index: number) => void;
  onFlowComplete?: (result: unknown) => void;
}

/** Flow Data Provider - App provides data */
interface FlowDataProvider {
  readonly categories?: readonly unknown[];
  readonly scenarios?: readonly unknown[];
  readonly visualStyles?: readonly FlowVisualStyleData[];
  readonly surprisePrompts?: readonly string[];
}

/** Flow Configuration */
export interface FlowConfiguration {
  readonly id: string;
  readonly steps: readonly StepDefinition[];
  readonly initialStepId?: string;
  readonly callbacks?: FlowCallbacks;
  readonly data?: FlowDataProvider;
  readonly creditCost?: number;
  readonly userId?: string;
}

