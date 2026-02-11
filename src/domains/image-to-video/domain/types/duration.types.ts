/**
 * Duration Types for Image-to-Video
 * Defines video duration options
 */

export type VideoDuration = 4 | 8 | number;

export interface DurationOption {
  value: VideoDuration;
  label?: string;
}
