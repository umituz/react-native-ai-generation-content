/**
 * Polling Constants
 * All timeout, interval, and retry related constants
 */

import { env } from "../config/env.config";

/** Default polling interval for job status checks (milliseconds) */
export const DEFAULT_POLL_INTERVAL_MS = env.pollDefaultIntervalMs;

/** Gallery polling interval (slower than wizard) */
export const GALLERY_POLL_INTERVAL_MS = env.pollGalleryIntervalMs;

/** Maximum number of polling attempts before timeout */
export const DEFAULT_MAX_POLL_ATTEMPTS = env.pollMaxAttempts;

/** Maximum consecutive transient errors before aborting */
export const DEFAULT_MAX_CONSECUTIVE_ERRORS = env.pollMaxConsecutiveErrors;

/** Maximum total time for polling (milliseconds) */
export const DEFAULT_MAX_POLL_TIME_MS = env.pollMaxTimeMs;

/** Minimum backoff delay (milliseconds) */
export const MIN_BACKOFF_DELAY_MS = env.pollMinBackoffDelayMs;

/** Maximum backoff delay (milliseconds) */
export const MAX_BACKOFF_DELAY_MS = env.pollMaxBackoffDelayMs;

/** Exponential backoff base multiplier */
export const BACKOFF_MULTIPLIER = env.pollBackoffMultiplier;

/** Progress percentage to report when job completes */
export const COMPLETION_PROGRESS = 100;

/** Initial progress percentage */
export const INITIAL_PROGRESS = 0;
