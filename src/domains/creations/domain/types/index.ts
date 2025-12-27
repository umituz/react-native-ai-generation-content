/**
 * Creation Domain Types
 */

// Core types
export type {
  CreationTypeId,
  CreationStatus,
  CreationCategory,
} from "./creation-types";

export {
  ALL_CREATION_STATUSES,
  ALL_CREATION_CATEGORIES,
} from "./creation-types";

// Category system
export {
  IMAGE_CREATION_TYPES,
  VIDEO_CREATION_TYPES,
  VOICE_CREATION_TYPES,
  ALL_CREATION_TYPES,
  getTypesForCategory,
  getCategoryForType,
  isTypeInCategory,
  isVideoCreationType,
  isImageCreationType,
  isVoiceCreationType,
  getMediaTypeForCreation,
} from "./creation-categories";

// Filter types
export type {
  CreationFilter,
  FilterOption,
  CreationStats,
} from "./creation-filter";

export {
  DEFAULT_CREATION_FILTER,
  MEDIA_FILTER_OPTIONS,
  STATUS_FILTER_OPTIONS,
  calculateCreationStats,
} from "./creation-filter";
