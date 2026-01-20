/**
 * Creation Types
 * Core type definitions for AI-generated creations
 */

/**
 * All supported creation types
 */
export type CreationTypeId =
  | "text-to-image"
  | "text-to-video"
  | "image-to-video"
  | "upscale"
  | "remove-background"
  | "photo-restore"
  | "inpainting"
  | "style-transfer"
  | "colorization"
  | "face-swap"
  | "object-removal"
  | "background-replacement"
  | "ai-brush"
  | "hd-touch-up"
  | "ai-hug"
  | "ai-kiss"
  | "anime-selfie";

/**
 * Creation status values
 */
export type CreationStatus =
  | "pending"
  | "queued"
  | "processing"
  | "completed"
  | "failed";

/**
 * Creation category for grouping types
 */
export type CreationCategory = "image" | "video" | "all";

/**
 * All status values as array for iteration
 */
export const ALL_CREATION_STATUSES: CreationStatus[] = [
  "pending",
  "queued",
  "processing",
  "completed",
  "failed",
];

/**
 * All categories as array for iteration
 */
export const ALL_CREATION_CATEGORIES: CreationCategory[] = [
  "all",
  "image",
  "video",
];
