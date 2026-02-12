/**
 * Flow Store Types
 */

import type {
  FlowState,
  StepDefinition,
} from "../../../../domain/entities/flow-config.types";

export interface FlowStoreState extends FlowState {
  stepDefinitions: readonly StepDefinition[];
}

export interface FlowStoreConfig {
  steps: readonly StepDefinition[];
  initialStepId?: string;
  initialStepIndex?: number;
}
