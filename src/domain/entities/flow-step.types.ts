/**
 * Flow Step Types
 */

import type { FlowState } from "./flow-state.types";
import type { FlowActions } from "./flow-actions.types";

/** Step Types */
export enum StepType {
  // Gate steps - auth and credits check
  AUTH_GATE = "auth_gate",
  CREDIT_GATE = "credit_gate",
  // Content steps
  CATEGORY_SELECTION = "category_selection",
  SCENARIO_SELECTION = "scenario_selection",
  SCENARIO_PREVIEW = "scenario_preview",
  PARTNER_UPLOAD = "partner_upload",
  TEXT_INPUT = "text_input",
  FEATURE_SELECTION = "feature_selection",
  // Generation steps
  GENERATING = "generating",
  RESULT_PREVIEW = "result_preview",
  CUSTOM = "custom",
}

/** Gate Step Result */
export type GateResult = "passed" | "blocked" | "pending";

/** Step Transition */
export interface StepTransition {
  readonly next?: string | ((state: FlowState) => string | null);
  readonly back?: string;
  readonly skipIf?: (state: FlowState) => boolean;
}

/** Step Definition */
export interface StepDefinition<TConfig = unknown> {
  readonly id: string;
  readonly type: StepType;
  readonly required?: boolean;
  readonly config?: TConfig;
  readonly transitions?: StepTransition;
  readonly component?: React.ComponentType<StepComponentProps>;
}

/** Step Component Props */
export interface StepComponentProps {
  readonly step: StepDefinition;
  readonly state: FlowState;
  readonly actions: FlowActions;
  readonly onNext: () => void;
  readonly onBack: () => void;
  readonly isProcessing: boolean;
  readonly progress: number;
  readonly error: string | null;
}
