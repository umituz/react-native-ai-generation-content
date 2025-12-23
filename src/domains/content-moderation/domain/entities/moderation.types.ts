/**
 * Content Moderation Types
 * Core type definitions for content moderation system
 */

export type ContentType = "text" | "image" | "video" | "voice";

export type ModerationSeverity = "low" | "medium" | "high" | "critical";

export type AgeRating = "G" | "PG" | "PG-13" | "R" | "NC-17" | "18+";

export type ViolationType =
  | "explicit_content"
  | "violence"
  | "hate_speech"
  | "harassment"
  | "illegal_activity"
  | "spam"
  | "copyright"
  | "personal_info"
  | "dangerous_content";

export interface ModerationRule {
  id: string;
  name: string;
  description: string;
  contentTypes: ContentType[];
  severity: ModerationSeverity;
  violationType: ViolationType;
  patterns: string[];
  enabled: boolean;
}

export interface ModerationResult {
  isAllowed: boolean;
  violations: Violation[];
  confidence: number;
  suggestedAction: "allow" | "warn" | "block";
}

export interface Violation {
  ruleId: string;
  ruleName: string;
  violationType: ViolationType;
  severity: ModerationSeverity;
  matchedPattern: string;
  context: string;
  suggestion: string;
}

export interface ModerationContext {
  userId?: string;
  contentType: ContentType;
  content: string;
  metadata?: Record<string, unknown>;
}

export interface ModerationConfig {
  strictMode: boolean;
  autoBlock: boolean;
  logViolations: boolean;
  notifyUser: boolean;
  customRules?: ModerationRule[];
  suggestionMessages?: SuggestionMessages;
}

export interface SuggestionMessages {
  explicit_content?: string;
  violence?: string;
  hate_speech?: string;
  harassment?: string;
  illegal_activity?: string;
  spam?: string;
  copyright?: string;
  personal_info?: string;
  dangerous_content?: string;
  default?: string;
}

export interface ValidationLimits {
  maxTextLength?: number;
  maxVoiceTextLength?: number;
  maxUriLength?: number;
}
