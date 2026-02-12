/**
 * Creations Domain Layer Exports
 */

// Types
export type {
  CreationTypeId,
  CreationStatus,
  CreationCategory,
  CreationFilter,
  FilterOption,
  CreationStats,
} from "./domain/types";

export {
  ALL_CREATION_STATUSES,
  ALL_CREATION_CATEGORIES,
  ALL_CREATION_TYPES,
  IMAGE_CREATION_TYPES,
  VIDEO_CREATION_TYPES,
  DEFAULT_CREATION_FILTER,
  MEDIA_FILTER_OPTIONS,
  STATUS_FILTER_OPTIONS,
  getTypesForCategory,
  getCategoryForType,
  getCategoryForCreation,
  isTypeInCategory,
  isVideoCreationType,
  isImageCreationType,
  calculateCreationStats,
} from "./domain/types";

// Utils
export {
  getStatusColorKey,
  getStatusColor,
  getStatusTextKey,
  getStatusText,
  isInProgress,
  isCompleted,
  isFailed,
  type StatusColorKey,
  getPreviewUrl,
  getAllMediaUrls,
  hasDownloadableContent,
  hasVideoContent,
  hasAudioContent,
  getPrimaryMediaUrl,
  type CreationOutput,
  generateCreationId,
  getTypeIcon,
  getTypeTextKey,
  getTypeText,
  getCreationTitle,
  filterBySearch,
  sortCreations,
  truncateText,
  type IconName,
} from "./domain/utils";

// Entities
export type { Creation, CreationDocument } from "./domain/entities";
export { mapDocumentToCreation } from "./domain/entities";

// Config
export type {
  CreationType,
  CreationsTranslations,
  CreationsConfig,
  DocumentMapper,
} from "./domain/value-objects";
export { DEFAULT_TRANSLATIONS, DEFAULT_CONFIG } from "./domain/value-objects";

// Repository Interface
export type {
  ICreationsRepository,
  CreationsSubscriptionCallback,
  UnsubscribeFunction,
} from "./domain/repositories";
