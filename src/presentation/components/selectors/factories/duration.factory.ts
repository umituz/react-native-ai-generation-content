/**
 * Duration Factory
 * Creates i18n-ready duration options
 */

import type { DurationValue } from "../types";

export interface DurationOption {
  value: DurationValue;
  label: string;
}

/**
 * Creates duration options with translations
 * @param durations - Array of duration values in seconds
 * @param formatLabel - Function to format duration label (e.g., "4s", "8 seconds")
 * @returns Array of duration options
 */
export const createDurationOptions = (
  durations: readonly DurationValue[],
  formatLabel: (seconds: DurationValue) => string
): DurationOption[] =>
  durations.map((duration) => ({
    value: duration,
    label: formatLabel(duration),
  }));

/**
 * Common duration values (seconds)
 */
export const COMMON_DURATIONS = [4, 8, 12, 16] as const;
