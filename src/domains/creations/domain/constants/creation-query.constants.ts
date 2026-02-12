/**
 * Creation Query Configuration
 *
 * Firestore query optimization settings.
 * Controls pagination, caching, and performance.
 *
 * @module CreationQueryConstants
 */

/**
 * Firestore query configuration
 */
export const CREATION_QUERY_CONFIG = {
  /** Default page size for pagination */
  DEFAULT_PAGE_SIZE: 20,

  /** Maximum page size (prevent memory issues) */
  MAX_PAGE_SIZE: 100,

  /** Cache TTL in milliseconds (5 minutes) */
  CACHE_TTL_MS: 5 * 60 * 1000,

  /** Include metadata changes in snapshots */
  INCLUDE_METADATA_CHANGES: false,
} as const;

/**
 * Collection names
 */
export const CREATION_COLLECTIONS = {
  ROOT: "creations" as const,
  USERS: "users" as const,
} as const;

// Freeze to prevent mutations
Object.freeze(CREATION_QUERY_CONFIG);
Object.freeze(CREATION_COLLECTIONS);
