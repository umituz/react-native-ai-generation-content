/**
 * Flow State Types
 */

import type { PhotoStepData, TextInputStepData } from "./flow-step-data.types";

/**
 * Complete flow state
 */
export interface GenerationFlowState {
  currentStepIndex: number;
  photoSteps: PhotoStepData[];
  textInput?: TextInputStepData;
  isComplete: boolean;
  isProcessing: boolean;
}
