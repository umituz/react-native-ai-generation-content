/**
 * Generation Wrappers
 * High-level API wrappers for simple generation tasks
 */

export {
  enhancePromptWithLanguage,
  getSupportedLanguages,
  getLanguageName,
} from "./language.wrapper";

export { ModerationWrapper } from "./moderation.wrapper";
export type { ModerationResult, ModerationConfig } from "./moderation.wrapper";

export { generateWithSimpleWrapper } from "./simple-generation.wrapper";
export type {
  SimpleGenerationInput,
  SimpleGenerationConfig,
} from "./simple-generation.wrapper";
