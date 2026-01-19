/**
 * Duration Constants
 * Default duration options for Sora 2 video generation
 * Sora 2 supports: 4, 8, 12 seconds ($0.10/second)
 */

import type { VideoDuration, DurationOption } from "../types";

export const DEFAULT_DURATION_OPTIONS: DurationOption[] = [
  { value: 4, label: "4s" },
  { value: 8, label: "8s" },
  { value: 12, label: "12s" },
];

export const DEFAULT_VIDEO_DURATION: VideoDuration = 4;
