/**
 * Shared types for Wizard Flow components
 */

import type { AlertMessages } from "../../../../../presentation/hooks/generation/types";

export interface BaseWizardFlowProps {
  /** Model ID for generation */
  readonly model: string;
  /** User ID for saving creations */
  readonly userId?: string;
  /** Credit cost for this generation - REQUIRED, determined by the app */
  readonly creditCost: number;
  /** Called when network is unavailable and generation is blocked */
  readonly onNetworkError?: () => void;
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
