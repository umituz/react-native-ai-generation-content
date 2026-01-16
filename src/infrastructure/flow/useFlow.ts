/**
 * useFlow Hook
 * Main hook for accessing flow state and actions
 */

import { useRef, useCallback, useMemo } from "react";
import { createFlowStore, type FlowStoreType } from "./useFlowStore";
import type { FlowState, FlowActions, StepDefinition } from "../../domain/entities/flow-config.types";

interface UseFlowConfig {
  steps: readonly StepDefinition[];
  initialStepId?: string;
}

interface UseFlowReturn extends FlowState, FlowActions {
  canGoNext: boolean;
  canGoBack: boolean;
  currentStep: StepDefinition | undefined;
  totalSteps: number;
  isFirstStep: boolean;
  isLastStep: boolean;
  hasPartner: (partnerId: string) => boolean;
  getPartnerImage: (partnerId: string) => FlowState["partners"][string];
  getPartnerName: (partnerId: string) => string;
}

let flowStoreInstance: FlowStoreType | null = null;

export const useFlow = (config: UseFlowConfig): UseFlowReturn => {
  const storeRef = useRef<FlowStoreType | null>(null);

  if (!storeRef.current) {
    if (!flowStoreInstance) {
      flowStoreInstance = createFlowStore(config);
    }
    storeRef.current = flowStoreInstance;
  }

  const store = storeRef.current;
  const state = store();
  const totalSteps = config.steps.length;

  const canGoNext = state.currentStepIndex < totalSteps - 1;
  const canGoBack = state.currentStepIndex > 0;
  const isFirstStep = state.currentStepIndex === 0;
  const isLastStep = state.currentStepIndex === totalSteps - 1;

  const currentStep = useMemo(
    () => config.steps[state.currentStepIndex],
    [config.steps, state.currentStepIndex],
  );

  const hasPartner = useCallback(
    (partnerId: string) => state.partners[partnerId] != null,
    [state.partners],
  );

  const getPartnerImage = useCallback(
    (partnerId: string) => state.partners[partnerId],
    [state.partners],
  );

  const getPartnerName = useCallback(
    (partnerId: string) => state.partnerNames[partnerId] ?? "",
    [state.partnerNames],
  );

  return {
    ...state,
    canGoNext,
    canGoBack,
    currentStep,
    totalSteps,
    isFirstStep,
    isLastStep,
    hasPartner,
    getPartnerImage,
    getPartnerName,
  };
};

export const resetFlowStore = () => {
  if (flowStoreInstance) {
    flowStoreInstance.getState().reset();
  }
  flowStoreInstance = null;
};
