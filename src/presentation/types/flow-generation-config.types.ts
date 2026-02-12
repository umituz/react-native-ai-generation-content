/**
 * Flow Generation Configuration Types
 */

import type { PhotoStepConfig, TextInputStepConfig, PreviewStepConfig } from "./flow-step-configs.types";

/**
 * Complete flow configuration
 */
export interface GenerationFlowConfig {
  /** Photo upload steps (can be 1 or multiple) */
  photoSteps: PhotoStepConfig[];
  /** Text input step */
  textInputStep?: TextInputStepConfig;
  /** Preview step */
  previewStep?: PreviewStepConfig;
  /** Flow behavior */
  behavior?: {
    allowBack?: boolean;
    showProgress?: boolean;
    autoAdvance?: boolean;
    requireAuth?: boolean;
    checkFeatureGate?: boolean;
  };
}
