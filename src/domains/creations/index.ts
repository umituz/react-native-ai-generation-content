/**
 * Creations Domain
 * AI-generated creations gallery with filtering, sharing, and management
 */

 
if (typeof __DEV__ !== "undefined" && __DEV__) console.log("📍 [LIFECYCLE] creations/index.ts - Module loading");

// =============================================================================
// DOMAIN LAYER - Types
// =============================================================================

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

// =============================================================================
// DOMAIN LAYER - Utils
// =============================================================================

export {
  // Status helpers
  getStatusColorKey,
  getStatusColor,
  getStatusTextKey,
  getStatusText,
  isInProgress,
  isCompleted,
  isFailed,
  type StatusColorKey,
  // Preview helpers
  getPreviewUrl,
  getAllMediaUrls,
  hasDownloadableContent,
  hasVideoContent,
  hasAudioContent,
  getPrimaryMediaUrl,
  type CreationOutput,
  // Creation helpers
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

// =============================================================================
// DOMAIN LAYER - Entities
// =============================================================================

export type { Creation, CreationDocument } from "./domain/entities";
export { mapDocumentToCreation } from "./domain/entities";

// =============================================================================
// DOMAIN LAYER - Config
// =============================================================================

export type {
  CreationType,
  CreationsTranslations,
  CreationsConfig,
  DocumentMapper,
} from "./domain/value-objects";
export { DEFAULT_TRANSLATIONS, DEFAULT_CONFIG } from "./domain/value-objects";

// =============================================================================
// DOMAIN LAYER - Repository Interface
// =============================================================================

export type { ICreationsRepository } from "./domain/repositories";

// =============================================================================
// INFRASTRUCTURE LAYER
// =============================================================================

export {
  CreationsRepository,
  type RepositoryOptions,
} from "./infrastructure/repositories";
export { createCreationsRepository } from "./infrastructure/adapters";

// =============================================================================
// PRESENTATION LAYER - Hooks
// =============================================================================

export { useCreations } from "./presentation/hooks/useCreations";
export { useDeleteCreation } from "./presentation/hooks/useDeleteCreation";
export { useCreationsFilter } from "./presentation/hooks/useCreationsFilter";
export { useAdvancedFilter } from "./presentation/hooks/useAdvancedFilter";
export { useCreationPersistence } from "./presentation/hooks/useCreationPersistence";
export type {
  UseCreationPersistenceConfig,
  UseCreationPersistenceReturn,
  BaseProcessingStartData,
  BaseProcessingResult,
} from "./presentation/hooks/useCreationPersistence";

// =============================================================================
// PRESENTATION LAYER - Components
// =============================================================================

// Core Components
export { CreationPreview } from "./presentation/components/CreationPreview";
export { CreationBadges } from "./presentation/components/CreationBadges";
export {
  CreationActions,
  type CreationAction,
} from "./presentation/components/CreationActions";
export {
  CreationCard,
  type CreationCardData,
  type CreationCardCallbacks,
} from "./presentation/components/CreationCard";
export { CreationThumbnail } from "./presentation/components/CreationThumbnail";

// Filter Components
export { FilterChips } from "./presentation/components/FilterChips";
export {
  CreationsFilterBar,
  createMediaFilterButtons,
  createStatusFilterButtons,
  type FilterButton,
} from "./presentation/components/CreationsFilterBar";

// Gallery Components
export { CreationsHomeCard } from "./presentation/components/CreationsHomeCard";
export { EmptyState } from "./presentation/components/EmptyState";
export { PendingJobsSection, type PendingJobsSectionProps } from "./presentation/components/PendingJobsSection";

// Utilities
export {
  getLocalizedTitle,
  getFilterCategoriesFromConfig,
  getTranslatedTypes,
} from "./presentation/utils/filterUtils";

// =============================================================================
// PRESENTATION LAYER - Screens
// =============================================================================

export { CreationsGalleryScreen } from "./presentation/screens/CreationsGalleryScreen";
