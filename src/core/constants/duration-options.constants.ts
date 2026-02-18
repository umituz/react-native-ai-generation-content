/**
 * Duration Options Constants
 * Generic video duration choices — reusable across all apps
 */

export interface DurationOption {
  seconds: number;
  label: string;
}

export const DURATION_OPTIONS: DurationOption[] = [
  { seconds: 4, label: "4s - Standard" },
];
