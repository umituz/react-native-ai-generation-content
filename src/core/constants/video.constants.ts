/**
 * Video Generation Constants
 * Single Responsibility: Define video generation constants
 *
 * Grok Imagine Video supports:
 * - Duration: 4, 5, 6 seconds
 * - Resolution: 480p, 720p ($0.05/sec @ 480p, $0.07/sec @ 720p)
 * - Aspect Ratio: 16:9, 9:16
 */

export const VIDEO_DURATION = {
  SHORT: 4,
  MEDIUM: 8,
  LONG: 12,
} as const;

export type VideoDuration =
  | typeof VIDEO_DURATION.SHORT
  | typeof VIDEO_DURATION.MEDIUM
  | typeof VIDEO_DURATION.LONG;

/**
 * Duration options for video generation (fixed to 4 seconds)
 */
export const VIDEO_DURATION_OPTIONS: VideoDuration[] = [4];

/**
 * Duration options with labels (for DurationSelector components)
 */
export const VIDEO_DURATION_OPTIONS_WITH_LABELS: Array<{
  value: VideoDuration;
  label: string;
}> = [{ value: 4, label: "4s" }];

/**
 * Video Aspect Ratio options
 */
export const VIDEO_ASPECT_RATIO = {
  LANDSCAPE: "16:9",
  PORTRAIT: "9:16",
} as const;

export type VideoAspectRatio =
  | typeof VIDEO_ASPECT_RATIO.LANDSCAPE
  | typeof VIDEO_ASPECT_RATIO.PORTRAIT;

export const VIDEO_ASPECT_RATIO_OPTIONS: VideoAspectRatio[] = ["16:9", "9:16"];

/**
 * Video Resolution options
 */
export const VIDEO_RESOLUTION = {
  DEFAULT: "default",
  SD_480P: "480p",
  HD_720P: "720p",
} as const;

export type VideoResolution =
  | typeof VIDEO_RESOLUTION.DEFAULT
  | typeof VIDEO_RESOLUTION.SD_480P
  | typeof VIDEO_RESOLUTION.HD_720P;

export const VIDEO_RESOLUTION_OPTIONS: Array<{
  value: VideoResolution;
  label: string;
}> = [
  { value: "480p", label: "Standard (480p)" },
  { value: "720p", label: "HD (720p)" },
];

/**
 * Default motion strength for video generation
 */
export const DEFAULT_MOTION_STRENGTH = 0.7;

/**
 * Default guidance scale for text-to-video
 */
export const DEFAULT_GUIDANCE_SCALE = 12;
