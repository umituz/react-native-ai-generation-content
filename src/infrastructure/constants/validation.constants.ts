/**
 * Validation Constants
 * All validation limits and constraints
 */

/** Maximum length for AI prompt text */
export const MAX_PROMPT_LENGTH = 10000;

/** Minimum length for AI prompt text */
export const MIN_PROMPT_LENGTH = 1;

/** Maximum length for user ID */
export const MAX_USER_ID_LENGTH = 128;

/** Maximum length for creation ID */
export const MAX_CREATION_ID_LENGTH = 128;

/** Maximum base64 string length (before encoding) */
export const MAX_BASE64_SIZE_MB = 20;

/** Maximum regex pattern length for validation */
export const MAX_PATTERN_LENGTH = 1000;

/** Maximum duration for video generation (seconds) */
export const MAX_VIDEO_DURATION_SECONDS = 60;

/** Minimum duration for video generation (seconds) */
export const MIN_VIDEO_DURATION_SECONDS = 3;

/** Maximum image file size (MB) */
export const MAX_IMAGE_SIZE_MB = 10;

/** Maximum URL length */
export const MAX_URL_LENGTH = 2048;

/** Maximum number of images in multi-image generation */
export const MAX_MULTI_IMAGE_COUNT = 10;

/** Minimum number of images for multi-image generation */
export const MIN_MULTI_IMAGE_COUNT = 2;
