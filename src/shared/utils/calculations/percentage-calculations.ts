/**
 * Percentage & Progress Calculations
 */

/**
 * Calculate percentage with bounds checking (0-100)
 */
export function calculatePercentage(value: number, total: number): number {
  if (total === 0) return 0;
  const percentage = (value / total) * 100;
  return Math.max(0, Math.min(100, percentage));
}

/**
 * Calculate progress with min/max bounds
 */
export function calculateProgress(
  current: number,
  total: number,
  min: number = 0,
  max: number = 100
): number {
  if (total === 0) return min;
  const percentage = (current / total) * (max - min) + min;
  return Math.max(min, Math.min(max, percentage));
}

/**
 * Calculate remaining percentage
 */
export function calculateRemaining(current: number, total: number): number {
  return Math.max(0, total - current);
}
