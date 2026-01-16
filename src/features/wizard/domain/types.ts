/**
 * AIGenerationWizard Types
 * Generic wizard for all AI generation flows
 */

import type { ReactNode } from "react";
import type { UploadedImage } from "../../partner-upload/domain/types";

// Step types
export type WizardStepId = string;

export interface WizardStep {
  id: WizardStepId;
  component: React.ComponentType<WizardStepProps>;
}

export interface WizardStepProps {
  onNext: () => void;
  onBack: () => void;
  onComplete: () => void;
  isProcessing: boolean;
  progress: number;
  error: string | null;
}

// Wizard state
export interface WizardState {
  currentStepIndex: number;
  isProcessing: boolean;
  progress: number;
  error: string | null;
  result: unknown | null;
  images: Record<string, UploadedImage | null>;
  names: Record<string, string>;
  customData: Record<string, unknown>;
}

// Wizard config
export interface AIGenerationWizardConfig {
  steps: WizardStep[];
  initialStep?: number;
  creditCost?: number;
}

// Wizard callbacks
export interface AIGenerationWizardCallbacks {
  onAuthRequired?: (callback: () => void) => void;
  onCreditsExhausted?: () => void;
  onGenerationStart?: () => void;
  onGenerationSuccess?: (result: unknown) => void;
  onGenerationError?: (error: string) => void;
  onStepChange?: (stepIndex: number, stepId: WizardStepId) => void;
}

// Main props
export interface AIGenerationWizardProps {
  userId?: string;
  isAuthenticated?: boolean;
  hasCredits?: boolean;
  config: AIGenerationWizardConfig;
  callbacks?: AIGenerationWizardCallbacks;
  renderStep?: (step: WizardStep, props: WizardStepProps) => ReactNode;
  children?: ReactNode;
}

// Store actions
export interface WizardActions {
  nextStep: () => void;
  prevStep: () => void;
  goToStep: (index: number) => void;
  setImage: (key: string, image: UploadedImage | null) => void;
  setName: (key: string, name: string) => void;
  setCustomData: (key: string, value: unknown) => void;
  setProcessing: (isProcessing: boolean) => void;
  setProgress: (progress: number) => void;
  setError: (error: string | null) => void;
  setResult: (result: unknown) => void;
  reset: () => void;
}

export type WizardStore = WizardState & WizardActions;

/** Feature mode determines the wizard variant */
export type FeatureMode = "single_image" | "dual_image" | "text_to_media" | "image_to_video";

/** Pre-built step type */
export type PrebuiltStepType =
  | "image_upload"
  | "partner_a_upload"
  | "partner_b_upload"
  | "prompt_input"
  | "style_selector"
  | "duration_selector"
  | "scenario_selection"
  | "scenario_preview"
  | "generating"
  | "result";

/** Feature wizard config */
export interface FeatureWizardConfig {
  readonly featureId: string;
  readonly mode: FeatureMode;
  readonly creditCost?: number;
  readonly showPrompt?: boolean;
  readonly showStyleSelector?: boolean;
  readonly showDurationSelector?: boolean;
  readonly showScenarioSelection?: boolean;
}

/** Pre-configured step flows */
export const FEATURE_FLOWS: Record<FeatureMode, readonly PrebuiltStepType[]> = {
  single_image: ["image_upload", "generating"],
  dual_image: ["partner_a_upload", "partner_b_upload", "generating"],
  text_to_media: ["prompt_input", "generating"],
  image_to_video: ["image_upload", "prompt_input", "generating"],
} as const;

/** Feature mode by feature ID */
export const FEATURE_MODES: Record<string, FeatureMode> = {
  // Single Image Features
  "anime-selfie": "single_image",
  "hd-touch-up": "single_image",
  "photo-restoration": "single_image",
  "remove-background": "single_image",
  "remove-object": "single_image",
  "upscaling": "single_image",
  // Single Image with Prompt
  "image-to-image": "single_image",
  "replace-background": "single_image",
  // Dual Image Features
  "ai-hug": "dual_image",
  "ai-kiss": "dual_image",
  "face-swap": "dual_image",
  "couple-future": "dual_image",
  // Text to Media Features
  "text-to-image": "text_to_media",
  "text-to-video": "text_to_media",
  "text-to-voice": "text_to_media",
  "meme-generator": "text_to_media",
  "script-generator": "text_to_media",
  "love-message": "text_to_media",
  // Image to Video Features
  "image-to-video": "image_to_video",
} as const;

/** Get feature mode by feature ID */
export const getFeatureMode = (featureId: string): FeatureMode => {
  return FEATURE_MODES[featureId] ?? "single_image";
};

/** Get flow steps for feature mode */
export const getFeatureFlow = (mode: FeatureMode): readonly PrebuiltStepType[] => {
  return FEATURE_FLOWS[mode];
};
