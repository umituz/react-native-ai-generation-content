/**
 * Base Moderator
 * Shared functionality for all content moderators
 */

import type {
  Violation,
  ViolationType,
  SuggestionMessages,
} from "../../../domain/entities/moderation.types";

export interface ModerationResult {
  isAllowed: boolean;
  violations: Violation[];
}

const DEFAULT_SUGGESTIONS: Record<string, string> = {
  explicit_content: "Remove explicit content",
  violence: "Remove violent content",
  hate_speech: "Remove discriminatory language",
  harassment: "Remove harassing content",
  illegal_activity: "Remove illegal content references",
  spam: "Remove spam content",
  copyright: "Remove copyrighted content",
  personal_info: "Remove personal information",
  dangerous_content: "Remove dangerous content",
  default: "Modify content to comply with guidelines",
};

export abstract class BaseModerator {
  protected customSuggestions?: SuggestionMessages;

  setSuggestionMessages(messages: SuggestionMessages): void {
    this.customSuggestions = messages;
  }

  protected getSuggestion(type: ViolationType): string {
    if (this.customSuggestions?.[type]) {
      return this.customSuggestions[type] as string;
    }
    return DEFAULT_SUGGESTIONS[type] || DEFAULT_SUGGESTIONS.default;
  }

  protected createViolation(
    id: string,
    ruleName: string,
    message: string,
    violationType: ViolationType = "illegal_activity"
  ): Violation {
    return {
      ruleId: id,
      ruleName,
      violationType,
      severity: "high",
      matchedPattern: "validation",
      context: "",
      suggestion: message,
    };
  }

  abstract moderate(content: string): ModerationResult;
}
