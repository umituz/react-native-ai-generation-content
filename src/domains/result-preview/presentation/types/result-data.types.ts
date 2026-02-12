/**
 * Result Data Types
 */

/**
 * Result data structure
 */
export interface ResultData {
  imageUrl: string;
  metadata?: Record<string, unknown>;
}

/**
 * Result actions callbacks
 */
export interface ResultActionsCallbacks {
  /** Download/save result */
  onDownload: () => void | Promise<void>;
  /** Share result */
  onShare: () => void | Promise<void>;
  /** Try again with same inputs */
  onTryAgain: () => void | Promise<void>;
  /** Navigate back */
  onNavigateBack: () => void | Promise<void>;
}

/**
 * Result display state
 */
export interface ResultDisplayState {
  /** Currently saving */
  isSaving: boolean;
  /** Currently sharing */
  isSharing: boolean;
}
