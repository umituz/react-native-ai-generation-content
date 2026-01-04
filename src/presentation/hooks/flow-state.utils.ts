/**
 * Flow State Utilities
 * State initialization and update helpers for generation flow
 *
 * @package @umituz/react-native-ai-generation-content
 */

import type {
  GenerationFlowConfig,
  GenerationFlowState,
  PhotoStepData,
  PhotoStepConfig,
} from "../types/flow-config.types";

/**
 * Create initial flow state from config
 */
export function createInitialFlowState(
  config: GenerationFlowConfig,
): GenerationFlowState {
  return {
    currentStepIndex: 0,
    photoSteps: config.photoSteps.map((step) => ({
      id: step.id,
      imageUri: null,
      previewUrl: undefined,
      name: undefined,
      isValid: undefined,
      validationStatus: "pending" as const,
    })),
    textInput: config.textInputStep
      ? {
          id: config.textInputStep.id,
          text: "",
          isValid: false,
        }
      : undefined,
    isComplete: false,
    isProcessing: false,
  };
}

/**
 * Update photo step in state
 */
export function updatePhotoStep(
  state: GenerationFlowState,
  stepIndex: number,
  updates: Partial<PhotoStepData>,
): GenerationFlowState {
  const newPhotoSteps = [...state.photoSteps];
  newPhotoSteps[stepIndex] = {
    ...newPhotoSteps[stepIndex],
    ...updates,
  };

  return {
    ...state,
    photoSteps: newPhotoSteps,
  };
}

/**
 * Check if current step is valid
 */
export function isStepValid(
  stepData: PhotoStepData | null,
  stepConfig: PhotoStepConfig | null,
): boolean {
  if (!stepData || !stepConfig) {
    return false;
  }

  // Check photo
  if (!stepData.imageUri) {
    return false;
  }

  // Check name if required
  if (stepConfig.requireNameInput && !stepData.name) {
    return false;
  }

  // Check validation if enabled
  if (stepConfig.enableValidation && !stepData.isValid) {
    return false;
  }

  return true;
}

/**
 * Check if text input is valid
 */
export function isTextInputValid(
  text: string,
  minLength: number,
  maxLength: number,
): boolean {
  return text.length >= minLength && text.length <= maxLength;
}
