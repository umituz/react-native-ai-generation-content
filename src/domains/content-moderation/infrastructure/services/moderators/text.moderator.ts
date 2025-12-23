/**
 * Text Content Moderator
 * Validates and moderates text content
 */

import type { Violation } from "../../../domain/entities/moderation.types";
import { patternMatcherService } from "../pattern-matcher.service";
import { rulesRegistry } from "../../rules/rules-registry";
import { BaseModerator, type ModerationResult } from "./base.moderator";

declare const __DEV__: boolean;

const DEFAULT_MAX_LENGTH = 10000;

const MALICIOUS_CODE_PATTERNS = [
  /<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi,
  /javascript:/gi,
  /on\w+\s*=/gi,
];

const PROMPT_INJECTION_PATTERNS = [
  /ignore\s+(all\s+)?(previous|prior|above)\s+(instructions?|prompts?|rules?)/gi,
  /disregard\s+(all\s+)?(previous|prior|above)\s+(instructions?|prompts?)/gi,
  /forget\s+(all\s+)?(previous|prior|your)\s+(instructions?|prompts?|rules?)/gi,
  /you\s+are\s+now\s+(a|an)\s+/gi,
  /act\s+as\s+(if|though)\s+you/gi,
  /pretend\s+(you\s+are|to\s+be)/gi,
  /bypass\s+(your\s+)?(safety|content|moderation)/gi,
  /override\s+(your\s+)?(restrictions?|limitations?|rules?)/gi,
  /jailbreak/gi,
  /DAN\s*mode/gi,
  /developer\s+mode\s+(enabled|on|activated)/gi,
  /system\s*:\s*/gi,
  /\[system\]/gi,
  /<<\s*sys\s*>>/gi,
];

class TextModerator extends BaseModerator {
  private maxLength = DEFAULT_MAX_LENGTH;

  setMaxLength(length: number): void {
    this.maxLength = length;
  }

  moderate(content: string): ModerationResult {
    if (typeof __DEV__ !== "undefined" && __DEV__) {
      // eslint-disable-next-line no-console
      console.log("[TextModerator] moderate() called", {
        contentLength: content?.length ?? 0,
      });
    }

    const validationError = this.validate(content);
    if (validationError) {
      if (typeof __DEV__ !== "undefined" && __DEV__) {
        // eslint-disable-next-line no-console
        console.log("[TextModerator] validation failed", {
          ruleId: validationError.ruleId,
          violationType: validationError.violationType,
        });
      }
      return { isAllowed: false, violations: [validationError] };
    }

    const violations = this.evaluateRules(content);

    if (typeof __DEV__ !== "undefined" && __DEV__) {
      // eslint-disable-next-line no-console
      console.log("[TextModerator] moderate() completed", {
        isAllowed: violations.length === 0,
        violationsCount: violations.length,
      });
    }

    return { isAllowed: violations.length === 0, violations };
  }

  private validate(content: string): Violation | null {
    if (!content || typeof content !== "string") {
      return this.createViolation("empty-content", "Validation", "empty");
    }

    if (content.length > this.maxLength) {
      return this.createViolation("too-long", "Validation", "length exceeded");
    }

    if (this.containsMaliciousCode(content)) {
      return this.createViolation(
        "malicious",
        "Security",
        "malicious code",
        "dangerous_content"
      );
    }

    if (this.containsPromptInjection(content)) {
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
    return MALICIOUS_CODE_PATTERNS.some((pattern) => pattern.test(content));
  }

  private containsPromptInjection(content: string): boolean {
    return PROMPT_INJECTION_PATTERNS.some((pattern) => pattern.test(content));
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
