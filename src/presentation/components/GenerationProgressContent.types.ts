/**
 * GenerationProgressContent Type Definitions
 */

export interface GenerationProgressContentProps {
  readonly progress: number;
  readonly icon?: string;
  readonly title?: string;
  readonly message?: string;
  readonly hint?: string;
  readonly dismissLabel?: string;
  readonly onDismiss?: () => void;
  /** Close button in top-right corner for background generation */
  readonly onClose?: () => void;
  /** Hint text shown near close button (e.g., "Continue in background") */
  readonly backgroundHint?: string;
  readonly backgroundColor?: string;
  readonly textColor?: string;
  readonly hintColor?: string;
  readonly progressColor?: string;
  readonly progressBackgroundColor?: string;
  readonly dismissButtonColor?: string;
}
