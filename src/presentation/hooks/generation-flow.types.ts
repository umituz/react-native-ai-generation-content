/**
 * Generation Flow Hook Types
 */

import type {
  GenerationFlowConfig,
  GenerationFlowState,
  PhotoStepData,
  PhotoStepConfig,
} from "../types/flow-config.types";

export interface UseGenerationFlowOptions {
  config: GenerationFlowConfig;
  onComplete?: (state: GenerationFlowState) => void;
  onStepChange?: (stepIndex: number, stepConfig: PhotoStepConfig) => void;
}

export interface UseGenerationFlowReturn {
  state: GenerationFlowState;
  currentStepConfig: PhotoStepConfig | null;
  currentStepData: PhotoStepData | null;
  canGoNext: boolean;
  canGoBack: boolean;
  goNext: () => void;
  goBack: () => void;
  updatePhoto: (imageUri: string, previewUrl?: string) => void;
  updateName: (name: string) => void;
  updateValidation: (isValid: boolean) => void;
  updateTextInput: (text: string) => void;
  reset: () => void;
  complete: () => void;
}
