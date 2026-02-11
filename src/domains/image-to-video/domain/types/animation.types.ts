/**
 * Animation Types for Image-to-Video
 * Defines animation style options
 */

export interface AnimationStyle {
  id: string;
  name: string;
  description: string;
  icon: string;
}

export type AnimationStyleId =
  | "ken_burns"
  | "zoom_in"
  | "zoom_out"
  | "slide_left"
  | "slide_right"
  | "parallax"
  | string;
