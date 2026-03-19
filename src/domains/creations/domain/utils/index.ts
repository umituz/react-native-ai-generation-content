/**
 * Creation Domain Utils
 * Utility functions for creation display, formatting, and helpers
 */

// Display utilities
export {
  getTypeIcon,
  getTypeTextKey,
  getTypeText,
  getCreationTitle,
} from './creation-display.util';

// Format utilities
export {
  truncateText,
  generateCreationId,
} from './creation-format.util';

// Search utilities
export {
  filterBySearch,
} from './creation-search.util';

// Sort utilities
export {
  sortCreations,
} from './creation-sort.util';

// Preview helpers
export {
  getPreviewUrl,
  getAllMediaUrls,
  hasDownloadableContent,
  hasVideoContent,
  hasAudioContent,
  getPrimaryMediaUrl,
} from './preview-helpers';

// Status helpers
export {
  getStatusColorKey,
  getStatusColor,
  getStatusTextKey,
  getStatusText,
  isInProgress,
  isCompleted,
  isFailed,
} from './status-helpers';

// Types
export type { StatusColorKey } from './status-helpers';
export type { IconName } from './creation-display.util';
export type { CreationOutput } from './preview-helpers';
