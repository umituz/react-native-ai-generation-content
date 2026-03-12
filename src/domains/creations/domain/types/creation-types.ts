/**
 * Creation Types
 * Core type definitions for AI-generated creations
 */

/**
 * All supported creation types
 */
export type CreationTypeId =
  | "text-to-image"
  | "imagine"
  | "wardrobe"
  | "historical-wardrobe"
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
  | "anime-selfie"
  | "aging"
  | "headshot"
  | "retouch"
  | "magic-edit"
  | "color-grading"
  | "art-style"
  | "mood-filter"
  | "face-expression"
  | "scene-composer"
  | "ai-background"
  | "effects";

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
