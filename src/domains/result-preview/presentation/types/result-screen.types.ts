/**
 * Result Screen Types
 */

import { StyleProp, ViewStyle } from "react-native";
import type { RecentCreation } from "./result-creation.types";

/**
 * Result preview screen props
 */
export interface ResultPreviewScreenProps {
  /** Image URL to display */
  imageUrl?: string;
  /** Video URL to display */
  videoUrl?: string;
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
  /** Result label (optional when hideLabel is true) */
  yourResult?: string;
  /** Save button */
  saveButton: string;
  /** Saving button */
  saving: string;
  /** Share button */
  shareButton: string;
  /** Sharing button */
  sharing: string;
  /** Try again button text */
  tryAnother: string;
  /** Rate button */
  rateButton?: string;
  /** Recent creations section title */
  recentCreations?: string;
  /** View all button */
  viewAll?: string;
}
