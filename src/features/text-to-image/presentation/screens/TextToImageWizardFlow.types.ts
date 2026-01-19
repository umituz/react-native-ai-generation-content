/**
 * TextToImageWizardFlow Types
 */

import type { AlertMessages } from "../../../../presentation/hooks/generation/types";

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
  readonly onGenerationError?: (error: string) => void;
  readonly onBack: () => void;
  readonly t: (key: string) => string;
  readonly alertMessages?: AlertMessages;
}

export interface TextToImageFormState {
  prompt: string;
  selectedStyle: string;
}
