/**
 * Shared types for Wizard Flow components
 */

import type { AlertMessages } from "../../../../../presentation/hooks/generation/types";

export interface BaseWizardFlowProps {
  /** Model ID for generation */
  readonly model: string;
  /** User ID for saving creations */
  readonly userId?: string;
  /** Is user authenticated (registered, not anonymous) */
  readonly isAuthenticated: boolean;
  /** Does user have premium subscription */
  readonly hasPremium: boolean;
  /** User's credit balance */
  readonly creditBalance: number;
  /** Are credits loaded */
  readonly isCreditsLoaded: boolean;
  /** Show auth modal with callback */
  readonly onShowAuthModal: (callback: () => void) => void;
  /** Show paywall */
  readonly onShowPaywall: () => void;
  /** Called when generation completes */
  readonly onGenerationComplete?: () => void;
  /** Called on generation error */
  readonly onGenerationError?: (error: string) => void;
  /** Called when back is pressed on first step */
  readonly onBack: () => void;
  /** Translation function */
  readonly t: (key: string) => string;
  /** Alert messages for error handling */
  readonly alertMessages?: AlertMessages;
}
