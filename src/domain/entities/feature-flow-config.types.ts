/**
 * Feature Flow Configuration Types
 */

import type { DynamicStepDefinition } from "./step-definition.types";

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
