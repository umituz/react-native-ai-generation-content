/**
 * useGenerationFlow Hook
 * Manages step-by-step generation flow state and navigation
 */

import { useState, useCallback, useMemo } from "react";
import { createInitialFlowState, isStepValid } from "./flow-state.utils";
import {
  createPhotoUpdater,
  createNameUpdater,
  createValidationUpdater,
  createTextInputUpdater,
} from "./generation-flow-updates";
import {
  createGoNextHandler,
  createGoBackHandler,
  createCompleteHandler,
} from "./generation-flow-navigation";
import type {
  UseGenerationFlowOptions,
  UseGenerationFlowReturn,
} from "./generation-flow.types";

export type { UseGenerationFlowOptions, UseGenerationFlowReturn };

export const useGenerationFlow = ({
  config,
  onComplete,
  onStepChange,
}: UseGenerationFlowOptions): UseGenerationFlowReturn => {
  const [state, setState] = useState(() => createInitialFlowState(config));

  const currentStepConfig = useMemo(
    () => (state.currentStepIndex >= config.photoSteps.length ? null : config.photoSteps[state.currentStepIndex]),
    [state.currentStepIndex, config.photoSteps]
  );

  const currentStepData = useMemo(
    () => (state.currentStepIndex >= state.photoSteps.length ? null : state.photoSteps[state.currentStepIndex]),
    [state.currentStepIndex, state.photoSteps]
  );

  const isCurrentStepValid = useMemo(
    () => isStepValid(currentStepData, currentStepConfig),
    [currentStepData, currentStepConfig]
  );

  const canGoNext = isCurrentStepValid && !state.isProcessing;
  const canGoBack = state.currentStepIndex > 0 && config.behavior?.allowBack !== false && !state.isProcessing;

  const goNext = useCallback(
    createGoNextHandler(canGoNext, state, config, setState, onComplete, onStepChange),
    [canGoNext, state, config, onComplete, onStepChange]
  );

  const goBack = useCallback(
    createGoBackHandler(canGoBack, state.currentStepIndex, config, setState, onStepChange),
    [canGoBack, state.currentStepIndex, config, onStepChange]
  );

  const updatePhoto = useCallback(createPhotoUpdater(setState), []);
  const updateName = useCallback(createNameUpdater(setState), []);
  const updateValidation = useCallback(createValidationUpdater(setState), []);
  const updateTextInput = useCallback(createTextInputUpdater(setState, config), [config.textInputStep]);
  const reset = useCallback(() => setState(createInitialFlowState(config)), [config]);
  const complete = useCallback(createCompleteHandler(state, setState, onComplete), [state, onComplete]);

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
