/**
 * Validation Constants
 * All validation limits and constraints
 */

import { env } from "../config/env.config";

/** Maximum length for AI prompt text */
export const MAX_PROMPT_LENGTH = env.validationMaxPromptLength;

/** Minimum length for AI prompt text */
export const MIN_PROMPT_LENGTH = env.validationMinPromptLength;
