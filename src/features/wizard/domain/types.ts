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
