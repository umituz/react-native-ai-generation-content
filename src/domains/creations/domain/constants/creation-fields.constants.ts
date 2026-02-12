/**
 * Creation Field Names
 *
 * Central registry of all Firestore document field names.
 * Prevents magic strings throughout the codebase.
 *
 * @module CreationFieldsConstants
 */

/**
 * Firestore document field names
 * Single source of truth for field naming
 */
export const CREATION_FIELDS = {
  // Core identification
  ID: "id" as const,
  TYPE: "type" as const,

  // Media URLs
  URI: "uri" as const,
  IMAGE_URL: "imageUrl" as const,
  VIDEO_URL: "videoUrl" as const,
  ORIGINAL_URI: "originalUri" as const,

  // Structured output
  OUTPUT: "output" as const,

  // Status and metadata
  STATUS: "status" as const,
  METADATA: "metadata" as const,
  PROMPT: "prompt" as const,

  // Timestamps
  CREATED_AT: "createdAt" as const,
  UPDATED_AT: "updatedAt" as const,
  DELETED_AT: "deletedAt" as const,
  RATED_AT: "ratedAt" as const,

  // User interactions
  IS_FAVORITE: "isFavorite" as const,
  IS_SHARED: "isShared" as const,
  RATING: "rating" as const,

  // AI provider metadata
  REQUEST_ID: "requestId" as const,
  MODEL: "model" as const,
} as const;

/** Union type of all field names */
export type CreationFieldName =
  typeof CREATION_FIELDS[keyof typeof CREATION_FIELDS];

/**
 * Updatable fields list
 * Fields that can be modified after creation
 */
export const UPDATABLE_FIELDS: ReadonlyArray<CreationFieldName> = [
  CREATION_FIELDS.URI,
  CREATION_FIELDS.STATUS,
  CREATION_FIELDS.OUTPUT,
  CREATION_FIELDS.IMAGE_URL,
  CREATION_FIELDS.VIDEO_URL,
  CREATION_FIELDS.METADATA,
  CREATION_FIELDS.IS_SHARED,
  CREATION_FIELDS.IS_FAVORITE,
  CREATION_FIELDS.RATING,
  CREATION_FIELDS.RATED_AT,
  CREATION_FIELDS.DELETED_AT,
  CREATION_FIELDS.REQUEST_ID,
  CREATION_FIELDS.MODEL,
  CREATION_FIELDS.PROMPT,
] as const;

/**
 * Type guard for updatable fields
 */
export function isUpdatableField(
  field: string
): field is CreationFieldName {
  return UPDATABLE_FIELDS.includes(field as CreationFieldName);
}

// Freeze to prevent mutations
Object.freeze(CREATION_FIELDS);
Object.freeze(UPDATABLE_FIELDS);
