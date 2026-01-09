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
  /** Rate callback */
  onRate?: () => void;
  /** Save button text */
  saveButtonText: string;
  /** Share button text */
  shareButtonText: string;
  /** Try again button text */
  tryAgainButtonText: string;
  /** Show only icons without text */
  iconOnly?: boolean;
  /** Show try again button */
  showTryAgain?: boolean;
  /** Show rating button */
  showRating?: boolean;
}

/**
 * Recent creation item
 */
export interface RecentCreation {
  readonly id: string;
  readonly imageUrl: string;
  readonly title: string;
  readonly date: string;
  readonly isFavorite?: boolean;
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
  /** Recent creations to display */
  recentCreations?: readonly RecentCreation[];
  /** Navigate to all creations */
  onViewAll?: () => void;
  /** View a specific creation */
  onCreationPress?: (creation: RecentCreation) => void;
  /** Translations */
  translations: ResultPreviewTranslations;
  /** Optional custom style */
  style?: StyleProp<ViewStyle>;
  /** Hide "Your Result" label */
  hideLabel?: boolean;
  /** Show icon-only action buttons */
  iconOnly?: boolean;
  /** Show try again button */
  showTryAgain?: boolean;
  /** Show rating button */
  showRating?: boolean;
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
  /** Rate button */
  rateButton?: string;
  /** Recent creations section title */
  recentCreations?: string;
  /** View all button */
  viewAll?: string;
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
