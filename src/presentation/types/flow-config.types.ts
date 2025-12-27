/**
 * Flow Configuration Types
 * Configuration system for step-by-step generation flows
 *
 * @package @umituz/react-native-ai-generation-content
 */

import type { StepHeaderConfig } from "@umituz/react-native-design-system";
import type { PhotoUploadCardConfig } from "../components/PhotoUploadCard";

/**
 * Photo upload step configuration
 */
export interface PhotoStepConfig {
  /** Whether this step is enabled */
  enabled: boolean;
  /** Step order (1, 2, 3, etc.) */
  order: number;
  /** Step identifier */
  id: string;
  /** Header configuration */
  header?: StepHeaderConfig;
  /** Photo upload card configuration */
  photoCard?: PhotoUploadCardConfig;
  /** Whether name input is required */
  requireNameInput?: boolean;
  /** Whether photo validation is enabled */
  enableValidation?: boolean;
  /** Validation type */
  validationType?: "none" | "face-detection" | "custom";
  /** Whether to show photo tips */
  showPhotoTips?: boolean;
  /** Custom validation function */
  customValidator?: (imageUri: string) => Promise<boolean>;
}

/**
 * Text input step configuration
 */
export interface TextInputStepConfig {
  /** Whether this step is enabled */
  enabled: boolean;
  /** Step order */
  order: number;
  /** Step identifier */
  id: string;
  /** Header configuration */
  header?: StepHeaderConfig;
  /** Minimum character length */
  minLength?: number;
  /** Maximum character length */
  maxLength?: number;
  /** Placeholder text */
  placeholder?: string;
  /** Whether to show character counter */
  showCharacterCount?: boolean;
}

/**
 * Preview step configuration
 */
export interface PreviewStepConfig {
  /** Whether this step is enabled */
  enabled: boolean;
  /** Step order */
  order: number;
  /** Step identifier */
  id: string;
  /** Header configuration */
  header?: StepHeaderConfig;
  /** Whether to show edit buttons */
  allowEditing?: boolean;
  /** Preview layout style */
  layout?: "grid" | "list" | "carousel";
}

/**
 * Complete flow configuration
 */
export interface GenerationFlowConfig {
  /** Photo upload steps (can be 1 or multiple) */
  photoSteps: PhotoStepConfig[];
  /** Text input step */
  textInputStep?: TextInputStepConfig;
  /** Preview step */
  previewStep?: PreviewStepConfig;
  /** Flow behavior */
  behavior?: {
    /** Whether to allow going back */
    allowBack?: boolean;
    /** Whether to show progress indicator */
    showProgress?: boolean;
    /** Whether to auto-advance after photo selection */
    autoAdvance?: boolean;
    /** Whether to require authentication */
    requireAuth?: boolean;
    /** Whether to check feature gate */
    checkFeatureGate?: boolean;
  };
}

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

/**
 * Step data structure
 */
export interface PhotoStepData {
  /** Step identifier */
  id: string;
  /** Photo URI */
  imageUri: string | null;
  /** Preview URL */
  previewUrl?: string;
  /** Name/label for this photo */
  name?: string;
  /** Whether validation passed */
  isValid?: boolean;
  /** Validation status */
  validationStatus?: "pending" | "validating" | "valid" | "invalid";
}

/**
 * Text input step data
 */
export interface TextInputStepData {
  /** Step identifier */
  id: string;
  /** Text content */
  text: string;
  /** Whether text is valid */
  isValid?: boolean;
}

/**
 * Complete flow state
 */
export interface GenerationFlowState {
  /** Current step index */
  currentStepIndex: number;
  /** Photo steps data */
  photoSteps: PhotoStepData[];
  /** Text input data */
  textInput?: TextInputStepData;
  /** Whether flow is complete */
  isComplete: boolean;
  /** Whether currently processing */
  isProcessing: boolean;
}
