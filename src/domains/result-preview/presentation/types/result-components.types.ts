/**
 * Result Component Types
 */

import { StyleProp, ViewStyle } from "react-native";

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
