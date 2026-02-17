/**
 * Animation Constants
 * Single Responsibility: Define animation style constants
 */

export const ANIMATION_STYLE = {
  ZOOM: "zoom",
  PAN: "pan",
  KEN_BURNS: "ken_burns",
  NONE: "none",
} as const;

export type AnimationStyle =
  | typeof ANIMATION_STYLE.ZOOM
  | typeof ANIMATION_STYLE.PAN
  | typeof ANIMATION_STYLE.KEN_BURNS
  | typeof ANIMATION_STYLE.NONE;
