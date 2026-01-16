/**
 * useFlow Hook
 * Main hook for accessing flow state and actions
 */

import { useRef, useCallback, useMemo } from "react";
import { createFlowStore, type FlowStoreType } from "./useFlowStore";
import type { FlowState, FlowActions, StepDefinition, FlowUploadedImageData } from "../../../../domain/entities/flow-config.types";

interface UseFlowConfig {
  steps: readonly StepDefinition[];
  initialStepId?: string;
  initialStepIndex?: number;
}

interface UseFlowReturn extends FlowState, FlowActions {
  canGoNext: boolean;
  canGoBack: boolean;
  currentStep: StepDefinition | undefined;
  totalSteps: number;
  isFirstStep: boolean;
  isLastStep: boolean;
  hasPartner: (partnerId: string) => boolean;
  getPartnerImage: (partnerId: string) => FlowUploadedImageData | undefined;
  getPartnerName: (partnerId: string) => string;
}

let flowStoreInstance: FlowStoreType | null = null;

export const useFlow = (config: UseFlowConfig): UseFlowReturn => {
  const storeRef = useRef<FlowStoreType | null>(null);
  const prevConfigRef = useRef<{ initialStepIndex?: number; initialStepId?: string } | undefined>(undefined);

  // Detect config changes (initialStepIndex or initialStepId changed)
  const configChanged =
    prevConfigRef.current !== undefined &&
    (prevConfigRef.current.initialStepIndex !== config.initialStepIndex ||
      prevConfigRef.current.initialStepId !== config.initialStepId);

  // If config changed, reset and recreate store
  if (configChanged) {
    if (flowStoreInstance) {
      flowStoreInstance.getState().reset();
    }
    flowStoreInstance = null;
    storeRef.current = null;
  }

  // Initialize store if needed
  if (!storeRef.current) {
    if (!flowStoreInstance) {
      flowStoreInstance = createFlowStore({
        steps: config.steps,
        initialStepId: config.initialStepId,
        initialStepIndex: config.initialStepIndex,
      });
    }
    storeRef.current = flowStoreInstance;
  }

  // Store current config for next render comparison
  prevConfigRef.current = {
    initialStepIndex: config.initialStepIndex,
    initialStepId: config.initialStepId,
  };

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
