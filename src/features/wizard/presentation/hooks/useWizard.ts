/**
 * useWizard Hook
 * Access wizard store state and actions
 */

import { useRef, useCallback } from "react";
import { createWizardStore, type WizardStoreType } from "../store/useWizardStore";
import type { WizardState, WizardActions } from "../../domain/types";
import type { UploadedImage } from "../../../partner-upload/domain/types";

interface UseWizardConfig {
  totalSteps: number;
}

interface UseWizardReturn extends WizardState, WizardActions {
  /** Check if user can go to next step */
  canGoNext: boolean;
  /** Check if user can go to previous step */
  canGoBack: boolean;
  /** Get image by key */
  getImage: (key: string) => UploadedImage | null;
  /** Get name by key */
  getName: (key: string) => string;
  /** Get custom data by key */
  getData: <T>(key: string) => T | undefined;
  /** Check if all required images are uploaded */
  hasImages: (keys: string[]) => boolean;
  /** Check if all required names are filled */
  hasNames: (keys: string[]) => boolean;
}

// Store singleton per wizard instance
let wizardStoreInstance: WizardStoreType | null = null;

export const useWizard = (config: UseWizardConfig): UseWizardReturn => {
  const storeRef = useRef<WizardStoreType | null>(null);

  // Create or reuse store
  if (!storeRef.current) {
    if (!wizardStoreInstance) {
      wizardStoreInstance = createWizardStore(config);
    }
    storeRef.current = wizardStoreInstance;
  }

  const store = storeRef.current;
  const state = store();

  // Computed helpers
  const canGoNext = state.currentStepIndex < config.totalSteps - 1;
  const canGoBack = state.currentStepIndex > 0;

  const getImage = useCallback(
    (key: string) => state.images[key] ?? null,
    [state.images],
  );

  const getName = useCallback(
    (key: string) => state.names[key] ?? "",
    [state.names],
  );

  const getData = useCallback(
    <T>(key: string) => state.customData[key] as T | undefined,
    [state.customData],
  );

  const hasImages = useCallback(
    (keys: string[]) => keys.every((key) => state.images[key] != null),
    [state.images],
  );

  const hasNames = useCallback(
    (keys: string[]) =>
      keys.every((key) => state.names[key] && state.names[key].trim().length > 0),
    [state.names],
  );

  return {
    // State
    currentStepIndex: state.currentStepIndex,
    isProcessing: state.isProcessing,
    progress: state.progress,
    error: state.error,
    result: state.result,
    images: state.images,
    names: state.names,
    customData: state.customData,

    // Actions
    nextStep: state.nextStep,
    prevStep: state.prevStep,
    goToStep: state.goToStep,
    setImage: state.setImage,
    setName: state.setName,
    setCustomData: state.setCustomData,
    setProcessing: state.setProcessing,
    setProgress: state.setProgress,
    setError: state.setError,
    setResult: state.setResult,
    reset: state.reset,

    // Helpers
    canGoNext,
    canGoBack,
    getImage,
    getName,
    getData,
    hasImages,
    hasNames,
  };
};

/** Reset the wizard store singleton */
export const resetWizardStore = () => {
  if (wizardStoreInstance) {
    wizardStoreInstance.getState().reset();
  }
  wizardStoreInstance = null;
};
