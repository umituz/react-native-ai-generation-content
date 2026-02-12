/**
 * Input Step Configuration Types
 */

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
  readonly styles: readonly string[];
  readonly required?: boolean;
}

/**
 * Duration Selection Step Config
 */
export interface DurationSelectionStepConfig {
  readonly id: string;
  readonly titleKey?: string;
  readonly durations: readonly number[];
  readonly defaultDuration?: number;
  readonly required?: boolean;
}
