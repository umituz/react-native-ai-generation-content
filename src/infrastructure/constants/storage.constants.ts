/**
 * Storage Constants
 * Database and storage related constants
 */

import { env } from "../config/env.config";

/** Maximum number of creations to fetch in one query */
export const MAX_CREATIONS_FETCH_LIMIT = 100;

/** Default number of creations per page */
export const DEFAULT_CREATIONS_PAGE_SIZE = 20;

/** Maximum number of logs to keep in memory */
export const MAX_LOG_ENTRIES = 1000;

/** Timeout for database operations (milliseconds) */
export const DB_OPERATION_TIMEOUT_MS = env.storageDbOperationTimeoutMs;

/** Maximum cache size for frequently accessed data */
export const MAX_CACHE_SIZE = env.storageMaxCacheSize;

/** Cache TTL for creations (milliseconds) - 5 minutes */
export const CREATIONS_CACHE_TTL_MS = 5 * 60 * 1000;

/** Cache TTL for user data (milliseconds) - 10 minutes */
export const USER_DATA_CACHE_TTL_MS = 10 * 60 * 1000;
