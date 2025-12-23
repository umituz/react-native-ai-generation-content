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

export {
  contentModerationService,
  patternMatcherService,
  textModerator,
  imageModerator,
  videoModerator,
  voiceModerator,
  BaseModerator,
} from "./infrastructure/services";

export type {
  PatternMatch,
  ModerationResult as ModeratorResult,
} from "./infrastructure/services";

// =============================================================================
// INFRASTRUCTURE LAYER - Rules
// =============================================================================

export { rulesRegistry } from "./infrastructure/rules/rules-registry";
export { defaultModerationRules } from "./infrastructure/rules/default-rules.data";

// =============================================================================
// PRESENTATION LAYER - Exceptions
// =============================================================================

export { ContentPolicyViolationError } from "./presentation/exceptions/content-policy-violation.exception";
