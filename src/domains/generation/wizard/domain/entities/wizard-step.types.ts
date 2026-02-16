/**
 * Wizard Step Configuration Types
 * Generic step configs for all wizard features
 */

import type { StepType } from "../../../../../domain/entities/flow-config.types";

/**
 * Generic Step Configuration - Base interface for all step configs
 */
export interface BaseStepConfig {
  readonly id: string;
  readonly type: StepType | string;
  readonly enabled?: boolean;
  readonly required?: boolean;
  readonly titleKey?: string;
  readonly subtitleKey?: string;
}

/**
 * Photo Upload Step Configuration
 */
export interface PhotoUploadStepConfig extends BaseStepConfig {
  readonly type: "photo_upload";
  readonly label?: string;
  readonly showFaceDetection?: boolean;
  readonly showNameInput?: boolean;
  readonly showPhotoTips?: boolean;
  readonly maxFileSizeMB?: number;
}

/**
 * Text Input Step Configuration
 */
export interface TextInputStepConfig extends BaseStepConfig {
  readonly type: "text_input";
  readonly placeholderKey?: string;
  readonly minLength?: number;
  readonly maxLength?: number;
  readonly multiline?: boolean;
}

/**
 * Selection Step Configuration
 */
export interface SelectionStepConfig extends BaseStepConfig {
  readonly type: "selection";
  readonly selectionType: "style" | "duration" | "aspect_ratio" | "quality" | "resolution" | "custom";
  readonly options: readonly {
    readonly id: string;
    readonly label: string;
    readonly icon?: string;
    readonly value: unknown;
  }[];
  readonly multiSelect?: boolean;
  readonly layout?: "grid" | "list";
  readonly defaultValue?: string | string[];
}

/**
 * Preview Step Configuration
 */
export interface PreviewStepConfig extends BaseStepConfig {
  readonly type: "preview";
  readonly previewType: "scenario" | "settings" | "custom";
  readonly showContinueButton?: boolean;
}

/**
 * Auth Gate Step Configuration
 */
export interface AuthGateStepConfig extends BaseStepConfig {
  readonly type: "auth_gate";
  readonly allowAnonymous?: boolean;
  readonly messageKey?: string;
}

/**
 * Credit Gate Step Configuration
 */
export interface CreditGateStepConfig extends BaseStepConfig {
  readonly type: "credit_gate";
  readonly requiredCredits: number;
  readonly messageKey?: string;
}

/**
 * Union of all step config types
 */
export type WizardStepConfig =
  | AuthGateStepConfig
  | CreditGateStepConfig
  | PhotoUploadStepConfig
  | TextInputStepConfig
  | SelectionStepConfig
  | PreviewStepConfig
  | BaseStepConfig;
