/**
 * Polling Constants
 * All timeout, interval, and retry related constants
 */

/** Default polling interval for job status checks (milliseconds) */
export const DEFAULT_POLL_INTERVAL_MS = 3000;

/** Gallery polling interval (slower than wizard) */
export const GALLERY_POLL_INTERVAL_MS = 5000;

/** Maximum number of polling attempts before timeout */
export const DEFAULT_MAX_POLL_ATTEMPTS = 100;

/** Maximum consecutive transient errors before aborting */
export const DEFAULT_MAX_CONSECUTIVE_ERRORS = 5;

/** Maximum total time for polling (milliseconds) - ~5 minutes */
export const DEFAULT_MAX_POLL_TIME_MS = 5 * 60 * 1000;

/** Minimum backoff delay (milliseconds) */
export const MIN_BACKOFF_DELAY_MS = 1000;

/** Maximum backoff delay (milliseconds) */
export const MAX_BACKOFF_DELAY_MS = 30000;

/** Exponential backoff base multiplier */
export const BACKOFF_MULTIPLIER = 1.5;

/** Progress percentage to report when job completes */
export const COMPLETION_PROGRESS = 100;

/** Initial progress percentage */
export const INITIAL_PROGRESS = 0;
