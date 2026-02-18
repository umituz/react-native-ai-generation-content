/**
 * Progress Utilities
 * Common progress calculation and formatting utilities
 */

/**
 * Clamps progress value to valid range [0, 100]
 * @param progress - Raw progress value
 * @returns Clamped progress between 0 and 100
 */
export function clampProgress(progress: number): number {
  return Math.max(0, Math.min(100, progress));
}

/**
 * Rounds progress to nearest integer percentage
 * @param progress - Progress value
 * @returns Rounded progress percentage
 */
export function roundProgress(progress: number): number {
  return Math.round(clampProgress(progress));
}

