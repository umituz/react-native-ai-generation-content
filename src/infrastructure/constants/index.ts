/**
 * Infrastructure Constants
 */

// Polling Constants
export * from "./polling.constants";

// Validation Constants
export * from "./validation.constants";

// Content Moderation Constants
export * from "./content.constants";

// Storage Constants
export * from "./storage.constants";

/** Video generation timeout in milliseconds (5 minutes) - @deprecated Use DEFAULT_MAX_POLL_TIME_MS instead */
export const VIDEO_TIMEOUT_MS = 300000;

/** Maximum consecutive transient errors before failing - @deprecated Use DEFAULT_MAX_CONSECUTIVE_ERRORS instead */
export const MAX_TRANSIENT_ERRORS = 5;
