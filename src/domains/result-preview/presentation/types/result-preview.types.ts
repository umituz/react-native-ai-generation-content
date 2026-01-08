/**
 * Result Preview Domain Types
 * Reusable result preview components for AI generation
 */

import { StyleProp, ViewStyle } from "react-native";

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

/**
 * Result image card props
 */
export interface ResultImageCardProps {
  /** Image URL to display */
  imageUrl: string;
  /** Optional custom style */
  style?: StyleProp<ViewStyle>;
  /** Image rounded corners */
  rounded?: boolean;
}

/**
 * Result action bar props
 */
export interface ResultActionBarProps {
  /** Currently saving */
  isSaving: boolean;
  /** Currently sharing */
  isSharing: boolean;
  /** Download callback */
  onDownload: () => void;
  /** Share callback */
  onShare: () => void;
  /** Try again callback */
  onTryAgain: () => void;
  /** Rate callback (optional) */
  onRate?: () => void;
  /** Save button text */
  saveButtonText: string;
  /** Save button text when loading */
  saveButtonLoadingText: string;
  /** Share button text */
  shareButtonText: string;
  /** Share button text when loading */
  shareButtonLoadingText: string;
  /** Try again button text */
  tryAgainButtonText: string;
  /** Rate button text (optional) */
  rateButtonText?: string;
}

/**
 * Result preview screen props
 */
export interface ResultPreviewScreenProps {
  /** Result data to display */
  imageUrl: string;
  /** Result display state */
  isSaving: boolean;
  isSharing: boolean;
  /** Action callbacks */
  onDownload: () => void;
  onShare: () => void;
  onTryAgain: () => void;
  onNavigateBack: () => void;
  onRate?: () => void;
  /** Translations */
  translations: ResultPreviewTranslations;
  /** Optional custom style */
  style?: StyleProp<ViewStyle>;
}

/**
 * Result preview translations
 */
export interface ResultPreviewTranslations {
  /** Screen title */
  title: string;
  /** Result label */
  yourResult: string;
  /** Save button */
  saveButton: string;
  /** Saving button */
  saving: string;
  /** Share button */
  shareButton: string;
  /** Sharing button */
  sharing: string;
  /** Try again button */
  tryAnother: string;
  /** Rate button (optional) */
  rateButton?: string;
}

/**
 * Use result actions options
 */
export interface UseResultActionsOptions {
  /** Image URL to save/share */
  imageUrl?: string;
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
