/**
 * @umituz/react-native-ai-content-moderation
 * Content moderation service for AI applications
 *
 * Usage:
 *   import {
 *     contentModerationService,
 *     ContentPolicyViolationError,
 *     rulesRegistry
 *   } from '@umituz/react-native-ai-content-moderation';
 */

// =============================================================================
// DOMAIN LAYER - Types
// =============================================================================

export type {
  ContentType,
  ModerationSeverity,
  AgeRating,
  ViolationType,
  ModerationRule,
  ModerationResult,
  Violation,
  ModerationContext,
  ModerationConfig,
  SuggestionMessages,
  ValidationLimits,
} from "./domain/entities/moderation.types";

export type {
  ContentFilterResult,
  IContentFilter,
  IModerator,
} from "./domain/interfaces/content-filter.interface";

// =============================================================================
// INFRASTRUCTURE LAYER - Services
// =============================================================================

export { contentModerationService } from "./infrastructure/services/content-moderation.service";
export { patternMatcherService, type PatternMatch } from "./infrastructure/services/pattern-matcher.service";
export { textModerator } from "./infrastructure/services/moderators/text.moderator";
export { imageModerator } from "./infrastructure/services/moderators/image.moderator";
export { videoModerator } from "./infrastructure/services/moderators/video.moderator";
export { voiceModerator } from "./infrastructure/services/moderators/voice.moderator";
export { BaseModerator } from "./infrastructure/services/moderators/base.moderator";

// =============================================================================
// INFRASTRUCTURE LAYER - Rules
// =============================================================================

export { rulesRegistry } from "./infrastructure/rules/rules-registry";
export { defaultModerationRules } from "./infrastructure/rules/default-rules.data";

// =============================================================================
// PRESENTATION LAYER - Exceptions
// =============================================================================

export { ContentPolicyViolationError } from "./presentation/exceptions/content-policy-violation.exception";
