/**
 * Voice Content Moderator
 * Validates and moderates voice/TTS text content
 */

import type { Violation } from "../../../domain/entities/moderation.types";
import { patternMatcherService } from "../pattern-matcher.service";
import { rulesRegistry } from "../../rules/rules-registry";
import { BaseModerator, type ModerationResult } from "./base.moderator";
import { env } from "../../../../../infrastructure/config/env.config";

class VoiceModerator extends BaseModerator {
  private maxLength = env.moderationVoiceMaxLength;

  setMaxLength(length: number): void {
    this.maxLength = length;
  }

  moderate(text: string): ModerationResult {
    const validationError = this.validate(text);
    if (validationError) {
      return { isAllowed: false, violations: [validationError] };
    }

    const violations = this.evaluateRules(text);
    return { isAllowed: violations.length === 0, violations };
  }

  private validate(text: string): Violation | null {
    if (!text || typeof text !== "string") {
      return this.createViolation("empty-text", "Voice Validation", "empty");
    }

    if (text.length > this.maxLength) {
      return this.createViolation(
        "too-long",
        "Voice Validation",
        "length exceeded"
      );
    }

    return null;
  }

  private evaluateRules(text: string): Violation[] {
    const rules = rulesRegistry.getRulesByContentType("voice");
    const violations: Violation[] = [];

    for (const rule of rules) {
      const matches = patternMatcherService.matchAnyPattern(
        text,
        rule.patterns
      );
      const matched = matches.find((m) => m.matched);

      if (matched) {
        violations.push({
          ruleId: rule.id,
          ruleName: rule.name,
          violationType: rule.violationType,
          severity: rule.severity,
          matchedPattern: matched.matchedText || "",
          context: text.slice(0, 100),
          suggestion: this.getSuggestion(rule.violationType),
        });
      }
    }

    return violations;
  }
}

export const voiceModerator = new VoiceModerator();
