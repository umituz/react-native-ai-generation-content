/**
 * Polling Constants
 * All timeout, interval, and retry related constants
 */

import { env } from "../config/env.config";

/** Default polling interval for job status checks (milliseconds) */
export const DEFAULT_POLL_INTERVAL_MS = env.pollDefaultIntervalMs;

/** Maximum consecutive transient errors before aborting */
export const DEFAULT_MAX_CONSECUTIVE_ERRORS = env.pollMaxConsecutiveErrors;

/** Maximum total time for polling (milliseconds) */
export const DEFAULT_MAX_POLL_TIME_MS = env.pollMaxTimeMs;
