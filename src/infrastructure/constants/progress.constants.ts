/**
 * Progress Constants
 * Standardized progress values for generation pipelines
 */

/** Image generation progress stages */
export const IMAGE_PROGRESS = {
  START: 10,
  INPUT_PREPARED: 30,
  REQUEST_SENT: 40,
  RESULT_RECEIVED: 90,
  COMPLETE: 100,
} as const;

/** Video generation progress stages */
export const VIDEO_PROGRESS = {
  START: 5,
  INPUT_PREPARED: 10,
  REQUEST_SENT: 15,
  IN_QUEUE: 20,
  IN_PROGRESS: 50,
  RESULT_RECEIVED: 90,
  COMPLETE: 100,
} as const;

/** Polling progress stages */
export const POLLING_PROGRESS = {
  RESULT_RECEIVED: 90,
  COMPLETE: 100,
} as const;

/** Video generation timeout in milliseconds (5 minutes) */
export const VIDEO_TIMEOUT_MS = 300000;

/** Maximum consecutive transient errors before failing */
export const MAX_TRANSIENT_ERRORS = 5;
