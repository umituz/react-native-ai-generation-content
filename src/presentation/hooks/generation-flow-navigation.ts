/**
 * Generation Flow Navigation Functions
 */

import type { GenerationFlowConfig, GenerationFlowState, PhotoStepConfig } from "../types/flow-config.types";

export function createGoNextHandler(
  canGoNext: boolean,
  state: GenerationFlowState,
  config: GenerationFlowConfig,
  setState: (state: GenerationFlowState) => void,
  onComplete?: (state: GenerationFlowState) => void,
  onStepChange?: (stepIndex: number, stepConfig: PhotoStepConfig) => void
) {
  return () => {
    if (!canGoNext) return;

    const nextIndex = state.currentStepIndex + 1;
    const isLastStep = nextIndex >= config.photoSteps.length;

    if (isLastStep) {
      const newState = { ...state, isComplete: true };
      setState(newState);
      onComplete?.(newState);
    } else {
      setState({ ...state, currentStepIndex: nextIndex });
      onStepChange?.(nextIndex, config.photoSteps[nextIndex]);
    }
  };
}

export function createGoBackHandler(
  canGoBack: boolean,
  currentStepIndex: number,
  config: GenerationFlowConfig,
  setState: (updater: (prev: GenerationFlowState) => GenerationFlowState) => void,
  onStepChange?: (stepIndex: number, stepConfig: PhotoStepConfig) => void
) {
  return () => {
    if (!canGoBack) return;

    const prevIndex = currentStepIndex - 1;
    setState((prev) => ({ ...prev, currentStepIndex: prevIndex, isComplete: false }));
    onStepChange?.(prevIndex, config.photoSteps[prevIndex]);
  };
}

export function createCompleteHandler(
  state: GenerationFlowState,
  setState: (state: GenerationFlowState) => void,
  onComplete?: (state: GenerationFlowState) => void
) {
  return () => {
    const newState = { ...state, isComplete: true };
    setState(newState);
    onComplete?.(newState);
  };
}
