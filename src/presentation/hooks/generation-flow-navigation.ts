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
      // Bounds check before accessing array
      const nextStep = config.photoSteps[nextIndex];
      if (nextStep) {
        onStepChange?.(nextIndex, nextStep);
      }
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
    // Validate index is within bounds
    if (prevIndex < 0) return;

    setState((prev) => ({ ...prev, currentStepIndex: prevIndex, isComplete: false }));
    // Bounds check before accessing array
    const prevStep = config.photoSteps[prevIndex];
    if (prevStep) {
      onStepChange?.(prevIndex, prevStep);
    }
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
