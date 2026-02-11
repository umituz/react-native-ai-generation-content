/**
 * Animation Style Constants
 * Default animation styles for image-to-video
 */

import type { AnimationStyle } from "../types";

export const DEFAULT_ANIMATION_STYLES: AnimationStyle[] = [
  {
    id: "ken_burns",
    name: "Ken Burns",
    description: "Slow zoom and pan effect",
    icon: "expand-outline",
  },
  {
    id: "zoom_in",
    name: "Zoom In",
    description: "Gradual zoom in effect",
    icon: "add-circle-outline",
  },
  {
    id: "zoom_out",
    name: "Zoom Out",
    description: "Gradual zoom out effect",
    icon: "remove-circle-outline",
  },
  {
    id: "slide_left",
    name: "Slide Left",
    description: "Pan from right to left",
    icon: "arrow-back-outline",
  },
  {
    id: "slide_right",
    name: "Slide Right",
    description: "Pan from left to right",
    icon: "arrow-forward-outline",
  },
  {
    id: "parallax",
    name: "Parallax",
    description: "3D depth effect",
    icon: "layers-outline",
  },
];

export const DEFAULT_ANIMATION_STYLE_ID = "ken_burns";
