/**
 * useGenerationFlow Hook
 * Manages step-by-step generation flow state and navigation
 *
 * @package @umituz/react-native-ai-generation-content
 */

import { useState, useCallback, useMemo } from "react";
import type {
  GenerationFlowConfig,
  GenerationFlowState,
  PhotoStepData,
  PhotoStepConfig,
} from "../types/flow-config.types";
import {
  createInitialFlowState,
  updatePhotoStep,
  isStepValid,
  isTextInputValid,
} from "./flow-state.utils";

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

/**
 * Hook to manage generation flow state
 */
export const useGenerationFlow = ({
  config,
  onComplete,
  onStepChange,
}: UseGenerationFlowOptions): UseGenerationFlowReturn => {
  const [state, setState] = useState<GenerationFlowState>(() =>
    createInitialFlowState(config),
  );

  const currentStepConfig = useMemo(() => {
    if (state.currentStepIndex >= config.photoSteps.length) return null;
    return config.photoSteps[state.currentStepIndex];
  }, [state.currentStepIndex, config.photoSteps]);

  const currentStepData = useMemo(() => {
    if (state.currentStepIndex >= state.photoSteps.length) return null;
    return state.photoSteps[state.currentStepIndex];
  }, [state.currentStepIndex, state.photoSteps]);

  const isCurrentStepValid = useMemo(
    () => isStepValid(currentStepData, currentStepConfig),
    [currentStepData, currentStepConfig],
  );

  const canGoNext = useMemo(
    () => isCurrentStepValid && !state.isProcessing,
    [isCurrentStepValid, state.isProcessing],
  );

  const canGoBack = useMemo(
    () =>
      state.currentStepIndex > 0 &&
      config.behavior?.allowBack !== false &&
      !state.isProcessing,
    [state.currentStepIndex, config.behavior?.allowBack, state.isProcessing],
  );

  const goNext = useCallback(() => {
    if (!canGoNext) return;

    setState((prev) => {
      const nextIndex = prev.currentStepIndex + 1;

      if (nextIndex >= config.photoSteps.length) {
        const newState = { ...prev, isComplete: true };
        onComplete?.(newState);
        return newState;
      }

      onStepChange?.(nextIndex, config.photoSteps[nextIndex]);
      return { ...prev, currentStepIndex: nextIndex };
    });
  }, [canGoNext, config.photoSteps, onComplete, onStepChange]);

  const goBack = useCallback(() => {
    if (!canGoBack) return;

    setState((prev) => {
      const prevIndex = prev.currentStepIndex - 1;
      onStepChange?.(prevIndex, config.photoSteps[prevIndex]);
      return { ...prev, currentStepIndex: prevIndex, isComplete: false };
    });
  }, [canGoBack, config.photoSteps, onStepChange]);

  const updatePhoto = useCallback((imageUri: string, previewUrl?: string) => {
    setState((prev) =>
      updatePhotoStep(prev, prev.currentStepIndex, {
        imageUri,
        previewUrl,
        validationStatus: "pending",
      }),
    );
  }, []);

  const updateName = useCallback((name: string) => {
    setState((prev) =>
      updatePhotoStep(prev, prev.currentStepIndex, { name }),
    );
  }, []);

  const updateValidation = useCallback((isValid: boolean) => {
    setState((prev) =>
      updatePhotoStep(prev, prev.currentStepIndex, {
        isValid,
        validationStatus: isValid ? "valid" : "invalid",
      }),
    );
  }, []);

  const updateTextInput = useCallback(
    (text: string) => {
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
    },
    [config.textInputStep],
  );

  const reset = useCallback(() => {
    setState(createInitialFlowState(config));
  }, [config]);

  const complete = useCallback(() => {
    setState((prev) => {
      const newState = { ...prev, isComplete: true };
      onComplete?.(newState);
      return newState;
    });
  }, [onComplete]);

  return {
    state,
    currentStepConfig,
    currentStepData,
    canGoNext,
    canGoBack,
    goNext,
    goBack,
    updatePhoto,
    updateName,
    updateValidation,
    updateTextInput,
    reset,
    complete,
  };
};
