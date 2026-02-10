/**
 * Environment Configuration
 * Centralized environment variable access with fallback defaults
 */

type EnvValue = string | number | boolean;

function getEnvValue(key: string, defaultValue: EnvValue): EnvValue {
  if (typeof process !== "undefined" && process.env) {
    const value = process.env[key];
    if (value !== undefined && value !== "") {
      if (typeof defaultValue === "number") {
        const parsed = Number(value);
        return isNaN(parsed) ? defaultValue : parsed;
      }
      if (typeof defaultValue === "boolean") {
        return value === "true" || value === "1";
      }
      return value;
    }
  }
  return defaultValue;
}

export const env = {
  // API Configuration
  apiDefaultTimeoutMs: getEnvValue("API_DEFAULT_TIMEOUT_MS", 30000) as number,
  apiRetryDelayMs: getEnvValue("API_RETRY_DELAY_MS", 1000) as number,

  // Generation Timeouts
  generationImageTimeoutMs: getEnvValue("GENERATION_IMAGE_TIMEOUT_MS", 120000) as number,
  generationVideoTimeoutMs: getEnvValue("GENERATION_VIDEO_TIMEOUT_MS", 300000) as number,
  generationMultiImageTimeoutMs: getEnvValue("GENERATION_MULTI_IMAGE_TIMEOUT_MS", 120000) as number,

  // Polling Configuration
  pollDefaultIntervalMs: getEnvValue("POLL_DEFAULT_INTERVAL_MS", 3000) as number,
  pollGalleryIntervalMs: getEnvValue("POLL_GALLERY_INTERVAL_MS", 5000) as number,
  pollMaxTimeMs: getEnvValue("POLL_MAX_TIME_MS", 300000) as number,
  pollMaxAttempts: getEnvValue("POLL_MAX_ATTEMPTS", 100) as number,
  pollMaxConsecutiveErrors: getEnvValue("POLL_MAX_CONSECUTIVE_ERRORS", 5) as number,
  pollMinBackoffDelayMs: getEnvValue("POLL_MIN_BACKOFF_DELAY_MS", 1000) as number,
  pollMaxBackoffDelayMs: getEnvValue("POLL_MAX_BACKOFF_DELAY_MS", 30000) as number,
  pollBackoffMultiplier: getEnvValue("POLL_BACKOFF_MULTIPLIER", 1.5) as number,

  // Validation Limits
  validationMaxPromptLength: getEnvValue("VALIDATION_MAX_PROMPT_LENGTH", 10000) as number,
  validationMinPromptLength: getEnvValue("VALIDATION_MIN_PROMPT_LENGTH", 1) as number,
  validationMaxUserIdLength: getEnvValue("VALIDATION_MAX_USER_ID_LENGTH", 128) as number,
  validationMaxCreationIdLength: getEnvValue("VALIDATION_MAX_CREATION_ID_LENGTH", 128) as number,
  validationMaxUrlLength: getEnvValue("VALIDATION_MAX_URL_LENGTH", 2048) as number,
  validationMaxBase64SizeMb: getEnvValue("VALIDATION_MAX_BASE64_SIZE_MB", 20) as number,
  validationMaxPatternLength: getEnvValue("VALIDATION_MAX_PATTERN_LENGTH", 1000) as number,
  validationMaxImageSizeMb: getEnvValue("VALIDATION_MAX_IMAGE_SIZE_MB", 10) as number,
  validationMaxVideoDurationSeconds: getEnvValue("VALIDATION_MAX_VIDEO_DURATION_SECONDS", 60) as number,
  validationMinVideoDurationSeconds: getEnvValue("VALIDATION_MIN_VIDEO_DURATION_SECONDS", 3) as number,
  validationMaxMultiImageCount: getEnvValue("VALIDATION_MAX_MULTI_IMAGE_COUNT", 10) as number,
  validationMinMultiImageCount: getEnvValue("VALIDATION_MIN_MULTI_IMAGE_COUNT", 2) as number,

  // Content Moderation
  moderationMaxTextLength: getEnvValue("MODERATION_MAX_TEXT_LENGTH", 5000) as number,
  moderationMaxUriLength: getEnvValue("MODERATION_MAX_URI_LENGTH", 2048) as number,
  moderationVoiceMaxLength: getEnvValue("MODERATION_VOICE_MAX_LENGTH", 5000) as number,

  // Storage Configuration
  storageDbOperationTimeoutMs: getEnvValue("STORAGE_DB_OPERATION_TIMEOUT_MS", 10000) as number,
  storageMaxCacheSize: getEnvValue("STORAGE_MAX_CACHE_SIZE", 100) as number,
} as const;
