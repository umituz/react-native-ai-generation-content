/**
 * Generation Flow Update Functions
 */

import type { Dispatch, SetStateAction } from "react";
import type { GenerationFlowConfig, GenerationFlowState } from "../types/flow-config.types";
import { updatePhotoStep, isTextInputValid } from "./flow-state.utils";

export function createPhotoUpdater(
  setState: Dispatch<SetStateAction<GenerationFlowState>>
) {
  return (imageUri: string, previewUrl?: string) => {
    setState((prev) =>
      updatePhotoStep(prev, prev.currentStepIndex, {
        imageUri,
        previewUrl,
        validationStatus: "pending",
      }),
    );
  };
}

export function createNameUpdater(
  setState: Dispatch<SetStateAction<GenerationFlowState>>
) {
  return (name: string) => {
    setState((prev) =>
      updatePhotoStep(prev, prev.currentStepIndex, { name }),
    );
  };
}

export function createValidationUpdater(
  setState: Dispatch<SetStateAction<GenerationFlowState>>
) {
  return (isValid: boolean) => {
    setState((prev) =>
      updatePhotoStep(prev, prev.currentStepIndex, {
        isValid,
        validationStatus: isValid ? "valid" : "invalid",
      }),
    );
  };
}

export function createTextInputUpdater(
  setState: Dispatch<SetStateAction<GenerationFlowState>>,
  config: GenerationFlowConfig
) {
  return (text: string) => {
    setState((prev) => {
      if (!prev.textInput) return prev;

      const minLength = config.textInputStep?.minLength ?? 0;
      const maxLength = config.textInputStep?.maxLength ?? Infinity;

      return {
        ...prev,
        textInput: {
          ...prev.textInput,
          text,
          isValid: isTextInputValid(text, minLength, maxLength),
        },
      };
    });
  };
}
