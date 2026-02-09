/**
 * Content Moderation Constants
 * Shared constants for content moderation validators
 */

export const DEFAULT_PROTOCOLS = ["http:", "https:", "file:", "data:"] as const;
export const VIDEO_PROTOCOLS = ["http:", "https:", "file:"] as const;
export const DEFAULT_MAX_URI_LENGTH = 2048;
export const DEFAULT_MAX_TEXT_LENGTH = 5000;
