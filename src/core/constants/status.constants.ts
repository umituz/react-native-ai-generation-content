/**
 * AI Generation Status Constants
 */

export const FAL_AI_STATUS = {
  IN_QUEUE: "IN_QUEUE",
  QUEUED: "QUEUED",
  IN_PROGRESS: "IN_PROGRESS",
  PROCESSING: "PROCESSING",
  COMPLETED: "COMPLETED",
  FAILED: "FAILED",
} as const;

export const CREATION_STATUS = {
  PENDING: "pending",
  QUEUED: "queued",
  PROCESSING: "processing",
  COMPLETED: "completed",
  FAILED: "failed",
} as const;

export const PROVIDER = {
  FAL: "fal",
} as const;
