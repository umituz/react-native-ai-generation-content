/**
 * Content Policy Violation Exception
 * Custom error class for content policy violations
 */

import type {
  Violation,
  ViolationType,
} from "../../domain/entities/moderation.types";

export class ContentPolicyViolationError extends Error {
  public readonly violations: Violation[];

  constructor(violations: Violation[], message?: string) {
    const defaultMessage = `Content policy violation: ${violations
      .map((v) => v.ruleName)
      .join(", ")}`;
    super(message || defaultMessage);
    this.name = "ContentPolicyViolationError";
    this.violations = violations;
  }

  getUserMessage(): string {
    if (this.violations.length === 0) {
      return "Content policy violation detected.";
    }

    const firstViolation = this.violations[0];
    return firstViolation?.suggestion || "Please modify your content.";
  }

  getViolationTypes(): ViolationType[] {
    return this.violations.map((v) => v.violationType);
  }

  hasViolationType(type: ViolationType): boolean {
    return this.violations.some((v) => v.violationType === type);
  }

  getSeverityLevel(): "low" | "medium" | "high" | "critical" {
    const severities = this.violations.map((v) => v.severity);

    if (severities.includes("critical")) return "critical";
    if (severities.includes("high")) return "high";
    if (severities.includes("medium")) return "medium";
    return "low";
  }
}
