/**
 * Progress Utilities
 * Provides consistent progress calculations and mappings
 */

/**
 * Clamps a value between 0 and 100
 * @param value - Value to clamp
 * @returns Clamped value between 0 and 100
 */
export function clampProgress(value: number): number {
  return Math.max(0, Math.min(100, value));
}

/**
 * Maps a value from one range to another (0-100)
 * @param value - Value to map
 * @param min - Minimum of input range
 * @param max - Maximum of input range
 * @returns Mapped value in 0-100 range
 */
export function mapToProgress(value: number, min: number, max: number): number {
  if (max === min) return 0;
  const normalized = (value - min) / (max - min);
  return clampProgress(normalized * 100);
}

/**
 * Maps a value from one range to another (0-100) with optional clamping
 * @param value - Value to map
 * @param min - Minimum of input range
 * @param max - Maximum of input range
 * @param clamp - Whether to clamp the result (default: true)
 * @returns Mapped value in 0-100 range
 */
export function mapRangeToProgress(
  value: number,
  min: number,
  max: number,
  clamp: boolean = true
): number {
  if (max === min) return 0;
  const normalized = (value - min) / (max - min);
  const result = normalized * 100;
  return clamp ? clampProgress(result) : result;
}

/**
 * Calculates progress percentage from current and total
 * @param current - Current value
 * @param total - Total value
 * @returns Progress percentage (0-100)
 */
export function calculateProgress(current: number, total: number): number {
  if (total <= 0) return 0;
  if (current >= total) return 100;
  return clampProgress((current / total) * 100);
}

/**
 * Interpolates between two values based on progress (0-100)
 * @param start - Start value
 * @param end - End value
 * @param progress - Progress (0-100)
 * @returns Interpolated value
 */
export function interpolateProgress(start: number, end: number, progress: number): number {
  const clampedProgress = clampProgress(progress);
  const factor = clampedProgress / 100;
  return start + (end - start) * factor;
}

/**
 * Converts linear progress to eased progress (smooth animation)
 * @param progress - Linear progress (0-100)
 * @param easing - Easing function (default: ease-out cubic)
 * @returns Eased progress (0-100)
 */
export function easeProgress(
  progress: number,
  easing: "linear" | "easeIn" | "easeOut" | "easeInOut" = "easeOut"
): number {
  const clamped = clampProgress(progress);
  const normalized = clamped / 100;

  let eased: number;
  switch (easing) {
    case "linear":
      eased = normalized;
      break;
    case "easeIn":
      eased = normalized * normalized;
      break;
    case "easeOut":
      eased = 1 - Math.pow(1 - normalized, 2);
      break;
    case "easeInOut":
      eased = normalized < 0.5
        ? 2 * normalized * normalized
        : 1 - Math.pow(-2 * normalized + 2, 2) / 2;
      break;
  }

  return eased * 100;
}

/**
 * Checks if progress is complete (100)
 * @param progress - Progress value to check
 * @returns True if progress is 100
 */
export function isProgressComplete(progress: number): boolean {
  return progress >= 100;
}

/**
 * Checks if progress has started (> 0)
 * @param progress - Progress value to check
 * @returns True if progress is greater than 0
 */
export function hasProgressStarted(progress: number): boolean {
  return progress > 0;
}
