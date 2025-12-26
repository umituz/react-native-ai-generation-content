/**
 * @umituz/react-native-ai-creations
 *
 * AI-generated creations gallery with filtering, sharing, and management
 *
 * Architecture:
 * - Extends BaseRepository from @umituz/react-native-firestore
 * - Fully dynamic path structure (configurable per app)
 * - Fully dynamic document mapping (configurable per app)
 * - App-agnostic: Works with any app, no app-specific code
 *
 * This package is designed to be used across hundreds of apps.
 *
 * Usage:
 *   import {
 *     CreationsGalleryScreen,
 *     CreationsHomeCard,
 *     useCreations,
 *     createCreationsRepository,
 *   } from '@umituz/react-native-ai-creations';
 */

// =============================================================================
// DOMAIN LAYER - Entities
// =============================================================================

export type { Creation, CreationDocument } from "./domain/entities";
export { mapDocumentToCreation } from "./domain/entities";

// =============================================================================
// DOMAIN LAYER - Value Objects
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
export { CreationsStorageService } from "./infrastructure/services/CreationsStorageService";
export { createCreationsRepository } from "./infrastructure/adapters";
export { CreationsService } from "./application/services/CreationsService";
export type { ICreationsStorageService } from "./domain/services/ICreationsStorageService";

// =============================================================================
// PRESENTATION LAYER - Hooks
// =============================================================================

export { useCreations } from "./presentation/hooks/useCreations";
export { useDeleteCreation } from "./presentation/hooks/useDeleteCreation";
export { useCreationsFilter } from "./presentation/hooks/useCreationsFilter";

// =============================================================================
// PRESENTATION LAYER - Components
// =============================================================================

export { CreationThumbnail } from "./presentation/components/CreationThumbnail";
export { CreationCard } from "./presentation/components/CreationCard";
export { CreationsHomeCard } from "./presentation/components/CreationsHomeCard";
export { FilterChips } from "./presentation/components/FilterChips";
export { EmptyState } from "./presentation/components/EmptyState";
export {
  CreationsProvider,
  useCreationsProvider,
} from "./presentation/components/CreationsProvider";

// =============================================================================
// PRESENTATION LAYER - Screens
// =============================================================================

export { CreationsGalleryScreen } from "./presentation/screens/CreationsGalleryScreen";
