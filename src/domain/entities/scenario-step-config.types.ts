/**
 * Scenario Step Configuration Types
 * Simplified config for scenario-based flows
 */

/**
 * Scenario Step Configuration
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
