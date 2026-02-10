/**
 * Validation Constants
 * All validation limits and constraints
 */

import { env } from "../config/env.config";

/** Maximum length for AI prompt text */
export const MAX_PROMPT_LENGTH = env.validationMaxPromptLength;

/** Minimum length for AI prompt text */
export const MIN_PROMPT_LENGTH = env.validationMinPromptLength;

/** Maximum length for user ID */
export const MAX_USER_ID_LENGTH = env.validationMaxUserIdLength;

/** Maximum length for creation ID */
export const MAX_CREATION_ID_LENGTH = env.validationMaxCreationIdLength;

/** Maximum base64 string length (before encoding) */
export const MAX_BASE64_SIZE_MB = env.validationMaxBase64SizeMb;

/** Maximum regex pattern length for validation */
export const MAX_PATTERN_LENGTH = env.validationMaxPatternLength;

/** Maximum duration for video generation (seconds) */
export const MAX_VIDEO_DURATION_SECONDS = env.validationMaxVideoDurationSeconds;

/** Minimum duration for video generation (seconds) */
export const MIN_VIDEO_DURATION_SECONDS = env.validationMinVideoDurationSeconds;

/** Maximum image file size (MB) */
export const MAX_IMAGE_SIZE_MB = env.validationMaxImageSizeMb;

/** Maximum URL length */
export const MAX_URL_LENGTH = env.validationMaxUrlLength;

/** Maximum number of images in multi-image generation */
export const MAX_MULTI_IMAGE_COUNT = env.validationMaxMultiImageCount;

/** Minimum number of images for multi-image generation */
export const MIN_MULTI_IMAGE_COUNT = env.validationMinMultiImageCount;
