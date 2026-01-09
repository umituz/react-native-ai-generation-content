/**
 * CreationCard Type Definitions
 */

import type { CreationStatus, CreationTypeId } from "../../domain/types";
import type { CreationOutput } from "../../domain/utils";

/**
 * Creation data interface for the card
 * Flexible to support both package and app Creation types
 */
export interface CreationCardData {
  id: string;
  type: CreationTypeId | string;
  status?: CreationStatus;
  prompt?: string;
  /** Output object for app-style creations */
  output?: CreationOutput;
  /** URI for package-style creations */
  uri?: string;
  provider?: string;
  createdAt: Date | number;
  /** Whether this creation is marked as favorite */
  isFavorite?: boolean;
}

/**
 * Action callbacks interface
 */
export interface CreationCardCallbacks {
  onPress?: (creation: CreationCardData) => void;
  onDownload?: (creation: CreationCardData) => Promise<void>;
  onShare?: (creation: CreationCardData) => Promise<void>;
  onDelete?: (creation: CreationCardData) => void;
  onFavorite?: (creation: CreationCardData) => void;
  onPostToFeed?: (creation: CreationCardData) => void;
}

export interface CreationCardProps {
  /** Creation data */
  readonly creation: CreationCardData;
  /** Action callbacks */
  readonly callbacks?: CreationCardCallbacks;
  /** Show badges overlay */
  readonly showBadges?: boolean;
  /** Show action buttons */
  readonly showActions?: boolean;
  /** Custom status text (for i18n) */
  readonly statusText?: string;
  /** Custom type text (for i18n) */
  readonly typeText?: string;
  /** Date formatter function */
  readonly formatDate?: (date: Date) => string;
  /** Is sharing in progress */
  readonly isSharing?: boolean;
  /** Is download available */
  readonly isDownloadAvailable?: boolean;
  /** Can post to feed */
  readonly canPostToFeed?: boolean;
}
