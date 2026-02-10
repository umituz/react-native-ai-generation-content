/**
 * Content Moderation Constants
 * Shared constants for content moderation validators
 */

import { env } from "../../../../infrastructure/config/env.config";

export const DEFAULT_PROTOCOLS = ["http:", "https:", "file:", "data:"] as const;
export const VIDEO_PROTOCOLS = ["http:", "https:", "file:"] as const;
export const DEFAULT_MAX_URI_LENGTH = env.moderationMaxUriLength;
export const DEFAULT_MAX_TEXT_LENGTH = env.moderationMaxTextLength;
