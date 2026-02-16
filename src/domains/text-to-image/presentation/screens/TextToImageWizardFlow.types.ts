/**
 * TextToImageWizardFlow Types
 */

import type { AlertMessages } from "../../../../presentation/hooks/generation/types";
import type { GenerationErrorInfo } from "../../../generation/wizard/presentation/components/WizardFlow.types";

export interface TextToImageWizardFlowProps {
  readonly model: string;
  readonly userId?: string;
  readonly isAuthenticated: boolean;
  readonly hasPremium: boolean;
  readonly creditBalance: number;
  readonly isCreditsLoaded: boolean;
  readonly onShowAuthModal: (callback: () => void) => void;
  readonly onShowPaywall: () => void;
  readonly onGenerationComplete?: () => void;
  readonly onGenerationError?: (error: string, errorInfo?: GenerationErrorInfo) => void;
  readonly onBack: () => void;
  readonly t: (key: string) => string;
  readonly alertMessages?: AlertMessages;
}

export interface TextToImageFormState {
  prompt: string;
  selectedStyle: string;
}
