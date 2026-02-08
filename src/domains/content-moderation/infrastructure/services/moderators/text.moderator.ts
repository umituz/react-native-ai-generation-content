/**
 * Text Content Moderator
 * Validates and moderates text content
 */

import type { Violation } from "../../../domain/entities/moderation.types";
import { patternMatcherService } from "../pattern-matcher.service";
import { rulesRegistry } from "../../rules/rules-registry";
import { BaseModerator, type ModerationResult } from "./base.moderator";
import { DEFAULT_MAX_TEXT_LENGTH } from "../../../../infrastructure/constants/content.constants";

declare const __DEV__: boolean;

/**
 * HTML entity encoding detection
 * More reliable than regex for detecting encoded malicious content
 */
function containsHTMLEntities(content: string): boolean {
  const htmlEntities = [
    /&lt;/gi, /&gt;/gi, /&quot;/gi, /&amp;/gi, /&apos;/gi,
    /&#\d+;/gi, /&#x[0-9a-fA-F]+;/gi,
  ];
  return htmlEntities.some(entity => entity.test(content));
}

/**
 * Safe string matching for malicious code detection
 * Uses string operations instead of regex where possible
 */
function containsMaliciousPatterns(content: string): boolean {
  const lowerContent = content.toLowerCase();

  // Check for script tags (case-insensitive)
  const scriptPatterns = ["<script", "</script>", "javascript:", "onclick=", "onerror=", "onload="];
  for (const pattern of scriptPatterns) {
    if (lowerContent.includes(pattern)) {
      return true;
    }
  }

  // Check for HTML entities (potential evasion)
  if (containsHTMLEntities(content)) {
    return true;
  }

  return false;
}

/**
 * Multi-layered prompt injection detection
 * Combines regex with string matching for better security
 */
function containsPromptInjection(content: string): boolean {
  const lowerContent = content.toLowerCase();

  // Critical injection patterns (string-based for safety)
  const criticalPatterns = [
    "ignore all instructions",
    "ignore previous instructions",
    "disregard all instructions",
    "forget all instructions",
    "you are now a",
    "jailbreak",
    "dan mode",
    "developer mode",
    "system:",
    "[system]",
    "<<system>>",
  ];

  for (const pattern of criticalPatterns) {
    if (lowerContent.includes(pattern)) {
      return true;
    }
  }

  // Additional regex patterns for more complex matching
  const regexPatterns = [
    /act\s+as\s+(if|though)\s+you/gi,
    /pretend\s+(you\s+are|to\s+be)/gi,
    /bypass\s+(your\s+)?(safety|content|moderation)/gi,
    /override\s+(your\s+)?(restrictions?|limitations?|rules?)/gi,
  ];

  return regexPatterns.some(pattern => {
    try {
      return pattern.test(content);
    } catch {
      return false;
    }
  });
}

// Kept for reference but no longer used directly - using safer functions above
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
    return containsMaliciousPatterns(content);
  }

  private containsPromptInjection(content: string): boolean {
    return containsPromptInjection(content);
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
