/**
 * Shared types for Wizard Flow components
 */

import type { AlertMessages } from "../../../../../presentation/hooks/generation/types";
import type { CreditCalculatorFn } from "../../domain/types/credit-calculation.types";

/**
 * Error information with refund eligibility
 */
export interface GenerationErrorInfo {
  /** Error message */
  message: string;
  /** Whether credits should be refunded for this error */
  shouldRefund: boolean;
  /** Human-readable error type for logging */
  errorType?: string;
}

export interface BaseWizardFlowProps {
  /** Model ID for generation */
  readonly model: string;
  /** User ID for saving creations */
  readonly userId?: string;
  /** Credit cost for this generation - REQUIRED, determined by the app */
  readonly creditCost: number;
  /** Calculator function provided by APP - package calls this to get dynamic cost */
  readonly calculateCredits?: CreditCalculatorFn;
  /** Called when network is unavailable and generation is blocked */
  readonly onNetworkError?: () => void;
  /** Called when generation starts - APP handles credit deduction here */
  readonly onGenerationStart?: (
    data: Record<string, unknown>,
    proceedToGenerating: () => void,
    onError?: (error: string) => void,
  ) => void;
  /** Called when generation completes */
  readonly onGenerationComplete?: () => void;
  /** Called on generation error with refund eligibility info */
  readonly onGenerationError?: (error: string, errorInfo?: GenerationErrorInfo) => void;
  /** Called when back is pressed on first step */
  readonly onBack: () => void;
  /** Translation function */
  readonly t: (key: string) => string;
  /** Alert messages for error handling */
  readonly alertMessages?: AlertMessages;
}
