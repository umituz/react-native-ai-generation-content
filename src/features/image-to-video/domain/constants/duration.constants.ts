/**
 * Duration Constants
 * Default duration options for image-to-video
 */

import type { VideoDuration, DurationOption } from "../types";

export const DEFAULT_DURATION_OPTIONS: DurationOption[] = [
  { value: 4, label: "4s" },
  { value: 8, label: "8s" },
];

export const DEFAULT_VIDEO_DURATION: VideoDuration = 4;
