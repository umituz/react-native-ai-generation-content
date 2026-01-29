/**
 * Queue Status Constants
 * FAL queue job status values - shared across all polling hooks
 */

export const QUEUE_STATUS = {
  IN_QUEUE: "IN_QUEUE",
  IN_PROGRESS: "IN_PROGRESS",
  COMPLETED: "COMPLETED",
  FAILED: "FAILED",
} as const;

export type QueueStatus = (typeof QUEUE_STATUS)[keyof typeof QUEUE_STATUS];

/** Creation document status values */
export const CREATION_STATUS = {
  PROCESSING: "processing",
  COMPLETED: "completed",
  FAILED: "failed",
} as const;

export type CreationStatus = (typeof CREATION_STATUS)[keyof typeof CREATION_STATUS];
