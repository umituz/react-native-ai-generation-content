/**
 * Flow Default Configurations
 * Default configurations for generation flows
 */

import type { GenerationFlowConfig } from "./flow-config.types";

/**
 * Default single photo flow configuration
 */
export const DEFAULT_SINGLE_PHOTO_FLOW: GenerationFlowConfig = {
  photoSteps: [
    {
      enabled: true,
      order: 1,
      id: "photo-1",
      header: {
        showStepIndicator: false,
        titleAlignment: "center",
        titleFontSize: 28,
        subtitleFontSize: 16,
      },
      photoCard: {
        aspectRatio: 1,
        borderRadius: 28,
        showValidationStatus: true,
        allowChange: true,
        borderStyle: "dashed",
      },
      requireNameInput: true,
      enableValidation: false,
      validationType: "none",
      showPhotoTips: true,
    },
  ],
  behavior: {
    allowBack: false,
    showProgress: false,
    autoAdvance: false,
    requireAuth: false,
    checkFeatureGate: true,
  },
};

/**
 * Default dual photo flow configuration
 */
export const DEFAULT_DUAL_PHOTO_FLOW: GenerationFlowConfig = {
  photoSteps: [
    {
      enabled: true,
      order: 1,
      id: "partner-a",
      header: {
        showStepIndicator: true,
        currentStep: 1,
        totalSteps: 2,
        titleAlignment: "center",
        titleFontSize: 28,
        subtitleFontSize: 16,
      },
      photoCard: {
        aspectRatio: 1,
        borderRadius: 28,
        showValidationStatus: true,
        allowChange: true,
        borderStyle: "dashed",
      },
      requireNameInput: true,
      enableValidation: false,
      validationType: "none",
      showPhotoTips: true,
    },
    {
      enabled: true,
      order: 2,
      id: "partner-b",
      header: {
        showStepIndicator: true,
        currentStep: 2,
        totalSteps: 2,
        titleAlignment: "center",
        titleFontSize: 28,
        subtitleFontSize: 16,
      },
      photoCard: {
        aspectRatio: 1,
        borderRadius: 28,
        showValidationStatus: true,
        allowChange: true,
        borderStyle: "dashed",
      },
      requireNameInput: true,
      enableValidation: false,
      validationType: "none",
      showPhotoTips: false,
    },
  ],
  behavior: {
    allowBack: true,
    showProgress: true,
    autoAdvance: false,
    requireAuth: false,
    checkFeatureGate: true,
  },
};
