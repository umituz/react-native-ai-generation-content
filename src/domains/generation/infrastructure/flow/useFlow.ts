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

export const useFlow = (config: UseFlowConfig): UseFlowReturn => {
  const storeRef = useRef<FlowStoreType | null>(null);
  const prevConfigRef = useRef<{ initialStepIndex?: number; initialStepId?: string; stepsCount: number } | undefined>(undefined);

  // Detect config changes (initialStepIndex, initialStepId, or steps changed)
  const configChanged =
    prevConfigRef.current !== undefined &&
    (prevConfigRef.current.initialStepIndex !== config.initialStepIndex ||
      prevConfigRef.current.initialStepId !== config.initialStepId ||
      prevConfigRef.current.stepsCount !== config.steps.length);

  // If config changed, reset and recreate store (per-component instance)
  if (configChanged && storeRef.current) {
    storeRef.current.getState().reset();
    storeRef.current = null;
  }

  // Initialize store if needed (per-component instance)
  if (!storeRef.current) {
    storeRef.current = createFlowStore({
      steps: config.steps,
      initialStepId: config.initialStepId,
      initialStepIndex: config.initialStepIndex,
    });
  }

  // Store current config for next render comparison
  prevConfigRef.current = {
    initialStepIndex: config.initialStepIndex,
    initialStepId: config.initialStepId,
    stepsCount: config.steps.length,
  };

  const store = storeRef.current;
  if (!store) {
    throw new Error("Flow store not initialized");
  }
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

declare const __DEV__: boolean;

export const resetFlowStore = () => {
  if (typeof __DEV__ !== "undefined" && __DEV__) {
    console.warn('resetFlowStore is deprecated. Each component now maintains its own flow store instance.');
  }
};
