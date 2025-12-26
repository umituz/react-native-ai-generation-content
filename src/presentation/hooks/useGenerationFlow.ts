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

export interface UseGenerationFlowOptions {
  /** Flow configuration */
  config: GenerationFlowConfig;
  /** Callback when flow is complete */
  onComplete?: (state: GenerationFlowState) => void;
  /** Callback when step changes */
  onStepChange?: (stepIndex: number, stepConfig: PhotoStepConfig) => void;
}

export interface UseGenerationFlowReturn {
  /** Current flow state */
  state: GenerationFlowState;
  /** Current step configuration */
  currentStepConfig: PhotoStepConfig | null;
  /** Current step data */
  currentStepData: PhotoStepData | null;
  /** Whether can go to next step */
  canGoNext: boolean;
  /** Whether can go to previous step */
  canGoBack: boolean;
  /** Go to next step */
  goNext: () => void;
  /** Go to previous step */
  goBack: () => void;
  /** Update current step photo */
  updatePhoto: (imageUri: string, previewUrl?: string) => void;
  /** Update current step name */
  updateName: (name: string) => void;
  /** Update current step validation */
  updateValidation: (isValid: boolean) => void;
  /** Update text input */
  updateTextInput: (text: string) => void;
  /** Reset flow */
  reset: () => void;
  /** Complete flow */
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
  // Initialize state
  const [state, setState] = useState<GenerationFlowState>(() => ({
    currentStepIndex: 0,
    photoSteps: config.photoSteps.map((step) => ({
      id: step.id,
      imageUri: null,
      previewUrl: undefined,
      name: undefined,
      isValid: undefined,
      validationStatus: "pending",
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
  }));

  // Get current step configuration
  const currentStepConfig = useMemo(() => {
    if (state.currentStepIndex >= config.photoSteps.length) {
      return null;
    }
    return config.photoSteps[state.currentStepIndex];
  }, [state.currentStepIndex, config.photoSteps]);

  // Get current step data
  const currentStepData = useMemo(() => {
    if (state.currentStepIndex >= state.photoSteps.length) {
      return null;
    }
    return state.photoSteps[state.currentStepIndex];
  }, [state.currentStepIndex, state.photoSteps]);

  // Check if current step is valid
  const isCurrentStepValid = useMemo(() => {
    if (!currentStepData || !currentStepConfig) {
      return false;
    }

    // Check photo
    if (!currentStepData.imageUri) {
      return false;
    }

    // Check name if required
    if (currentStepConfig.requireNameInput && !currentStepData.name) {
      return false;
    }

    // Check validation if enabled
    if (currentStepConfig.enableValidation && !currentStepData.isValid) {
      return false;
    }

    return true;
  }, [currentStepData, currentStepConfig]);

  // Can go to next step
  const canGoNext = useMemo(() => {
    return isCurrentStepValid && !state.isProcessing;
  }, [isCurrentStepValid, state.isProcessing]);

  // Can go back
  const canGoBack = useMemo(() => {
    return (
      state.currentStepIndex > 0 &&
      config.behavior?.allowBack !== false &&
      !state.isProcessing
    );
  }, [state.currentStepIndex, config.behavior?.allowBack, state.isProcessing]);

  // Go to next step
  const goNext = useCallback(() => {
    if (!canGoNext) return;

    setState((prev) => {
      const nextIndex = prev.currentStepIndex + 1;

      // If we've completed all photo steps, mark as complete
      if (nextIndex >= config.photoSteps.length) {
        const newState = {
          ...prev,
          isComplete: true,
        };
        onComplete?.(newState);
        return newState;
      }

      // Move to next step
      const newState = {
        ...prev,
        currentStepIndex: nextIndex,
      };

      // Notify step change
      onStepChange?.(nextIndex, config.photoSteps[nextIndex]);

      return newState;
    });
  }, [canGoNext, config.photoSteps, onComplete, onStepChange]);

  // Go to previous step
  const goBack = useCallback(() => {
    if (!canGoBack) return;

    setState((prev) => {
      const prevIndex = prev.currentStepIndex - 1;
      const newState = {
        ...prev,
        currentStepIndex: prevIndex,
        isComplete: false,
      };

      // Notify step change
      onStepChange?.(prevIndex, config.photoSteps[prevIndex]);

      return newState;
    });
  }, [canGoBack, config.photoSteps, onStepChange]);

  // Update photo
  const updatePhoto = useCallback(
    (imageUri: string, previewUrl?: string) => {
      setState((prev) => {
        const newPhotoSteps = [...prev.photoSteps];
        newPhotoSteps[prev.currentStepIndex] = {
          ...newPhotoSteps[prev.currentStepIndex],
          imageUri,
          previewUrl,
          validationStatus: "pending",
        };

        return {
          ...prev,
          photoSteps: newPhotoSteps,
        };
      });
    },
    [],
  );

  // Update name
  const updateName = useCallback((name: string) => {
    setState((prev) => {
      const newPhotoSteps = [...prev.photoSteps];
      newPhotoSteps[prev.currentStepIndex] = {
        ...newPhotoSteps[prev.currentStepIndex],
        name,
      };

      return {
        ...prev,
        photoSteps: newPhotoSteps,
      };
    });
  }, []);

  // Update validation
  const updateValidation = useCallback((isValid: boolean) => {
    setState((prev) => {
      const newPhotoSteps = [...prev.photoSteps];
      newPhotoSteps[prev.currentStepIndex] = {
        ...newPhotoSteps[prev.currentStepIndex],
        isValid,
        validationStatus: isValid ? "valid" : "invalid",
      };

      return {
        ...prev,
        photoSteps: newPhotoSteps,
      };
    });
  }, []);

  // Update text input
  const updateTextInput = useCallback(
    (text: string) => {
      setState((prev) => {
        if (!prev.textInput) return prev;

        const minLength = config.textInputStep?.minLength ?? 0;
        const maxLength = config.textInputStep?.maxLength ?? Infinity;
        const isValid = text.length >= minLength && text.length <= maxLength;

        return {
          ...prev,
          textInput: {
            ...prev.textInput,
            text,
            isValid,
          },
        };
      });
    },
    [config.textInputStep],
  );

  // Reset flow
  const reset = useCallback(() => {
    setState({
      currentStepIndex: 0,
      photoSteps: config.photoSteps.map((step) => ({
        id: step.id,
        imageUri: null,
        previewUrl: undefined,
        name: undefined,
        isValid: undefined,
        validationStatus: "pending",
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
    });
  }, [config.photoSteps, config.textInputStep]);

  // Complete flow
  const complete = useCallback(() => {
    setState((prev) => {
      const newState = {
        ...prev,
        isComplete: true,
      };
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
