/**
 * Result Hooks Types
 */

/**
 * Use result actions options
 */
export interface UseResultActionsOptions {
  /** Image URL to save/share */
  imageUrl?: string;
  /** Video URL to save/share */
  videoUrl?: string;
  /** Callback on save success */
  onSaveSuccess?: () => void;
  /** Callback on save error */
  onSaveError?: (error: Error) => void;
  /** Callback on share start */
  onShareStart?: () => void;
  /** Callback on share end */
  onShareEnd?: (cancelled?: boolean) => void;
}

/**
 * Use result actions return
 */
export interface UseResultActionsReturn {
  /** Currently saving */
  isSaving: boolean;
  /** Currently sharing */
  isSharing: boolean;
  /** Save/download handler */
  handleDownload: () => Promise<void>;
  /** Share handler */
  handleShare: () => Promise<void>;
}
