/**
 * Default Moderation Rules
 * Security validations (XSS, prompt injection) are handled in moderators
 * AI providers handle content policy (NSFW, violence, etc.)
 */

import type { ModerationRule } from "../../domain/entities/moderation.types";

export const defaultModerationRules: ModerationRule[] = [];
