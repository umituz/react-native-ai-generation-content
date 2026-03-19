/**
 * Text Content Moderator
 * Validates and moderates text content using shared validation utilities
 */

import type { Violation } from "../../../domain/entities/moderation.types";
import { patternMatcherService } from "../pattern-matcher.service";
import { rulesRegistry } from "../../rules/rules-registry";
import { BaseModerator, type ModerationResult } from "./base.moderator";
import { DEFAULT_MAX_TEXT_LENGTH } from "../../constants/moderation.constants";
import { containsMaliciousPatterns } from "../../utils/content-security.util";
import { containsPromptInjection } from "../../utils/prompt-injection.util";
import { validateString, validateRequiredFields } from "../../../../../shared-kernel/infrastructure/validation";


class TextModerator extends BaseModerator {
  private maxLength = DEFAULT_MAX_TEXT_LENGTH;

  setMaxLength(length: number): void {
    this.maxLength = length;
  }

  moderate(content: string): ModerationResult {
    if (typeof __DEV__ !== "undefined" && __DEV__) {
      console.log("[TextModerator] moderate() called", {
        contentLength: content?.length ?? 0,
      });
    }

    const validationError = this.validate(content);
    if (validationError) {
      if (typeof __DEV__ !== "undefined" && __DEV__) {
        console.log("[TextModerator] validation failed", {
          ruleId: validationError.ruleId,
          violationType: validationError.violationType,
        });
      }
      return { isAllowed: false, violations: [validationError] };
    }

    const violations = this.evaluateRules(content);

    if (typeof __DEV__ !== "undefined" && __DEV__) {
      console.log("[TextModerator] moderate() completed", {
        isAllowed: violations.length === 0,
        violationsCount: violations.length,
      });
    }

    return { isAllowed: violations.length === 0, violations };
  }

  private validate(content: string): Violation | null {
    // Use shared validation utilities
    const requiredValidation = validateRequiredFields({ content }, ['content']);
    if (!requiredValidation.isValid) {
      return this.createViolation("empty-content", "Validation", "empty");
    }

    const stringValidation = validateString(content, {
      required: true,
      maxLength: this.maxLength,
    });

    if (!stringValidation.isValid) {
      if (stringValidation.errors.maxLength) {
        return this.createViolation("too-long", "Validation", "length exceeded");
      }
      return this.createViolation("empty-content", "Validation", "empty");
    }

    if (this.containsMaliciousCode(content)) {
      return this.createViolation(
        "malicious",
        "Security",
        "malicious code",
        "dangerous_content"
      );
    }

    if (containsPromptInjection(content)) {
      return this.createViolation(
        "prompt-injection",
        "Security",
        "prompt injection",
        "dangerous_content"
      );
    }

    return null;
  }

  private containsMaliciousCode(content: string): boolean {
    return containsMaliciousPatterns(content);
  }

  private evaluateRules(content: string): Violation[] {
    const rules = rulesRegistry.getRulesByContentType("text");
    const violations: Violation[] = [];

    for (const rule of rules) {
      const matches = patternMatcherService.matchAnyPattern(
        content,
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
          context: content.slice(0, 100),
          suggestion: this.getSuggestion(rule.violationType),
        });
      }
    }

    return violations;
  }
}

export const textModerator = new TextModerator();
