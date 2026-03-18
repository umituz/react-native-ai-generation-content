/**
 * Confidence Score Calculations
 */

/**
 * Calculate confidence score from violations with weights
 */
export function calculateConfidenceScore(
  violations: readonly { severity: "critical" | "high" | "medium" | "low" }[]
): number {
  if (violations.length === 0) return 1.0;

  const weights = { critical: 1.0, high: 0.75, medium: 0.5, low: 0.25 };
  const score = violations.reduce(
    (sum, v) => sum + (weights[v.severity] || 0.25),
    0
  );

  // Normalize by number of violations, capped at 1.0
  return Math.min(1.0, score / Math.max(1, violations.length));
}
