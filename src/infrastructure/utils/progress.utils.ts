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

/**
 * Formats progress as percentage string
 * @param progress - Progress value
 * @returns Formatted percentage string (e.g., "75%")
 */
export function formatProgressPercentage(progress: number): string {
  return `${roundProgress(progress)}%`;
}

/**
 * Calculates progress percentage from current and total values
 * @param current - Current value
 * @param total - Total value
 * @returns Progress percentage (0-100)
 */
export function calculateProgressPercentage(current: number, total: number): number {
  if (total <= 0) return 0;
  return clampProgress((current / total) * 100);
}

/**
 * Maps job status to approximate progress percentage
 * @param status - Job status string
 * @returns Approximate progress percentage
 */
export function mapStatusToProgress(status: string): number {
  const normalizedStatus = status.toLowerCase();
  const statusMap: Record<string, number> = {
    queued: 10,
    in_queue: 15,
    processing: 50,
    in_progress: 60,
    completed: 100,
    failed: 0,
  };
  return statusMap[normalizedStatus] ?? 30;
}
