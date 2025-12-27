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
    icon: "Maximize2",
  },
  {
    id: "zoom_in",
    name: "Zoom In",
    description: "Gradual zoom in effect",
    icon: "ZoomIn",
  },
  {
    id: "zoom_out",
    name: "Zoom Out",
    description: "Gradual zoom out effect",
    icon: "ZoomOut",
  },
  {
    id: "slide_left",
    name: "Slide Left",
    description: "Pan from right to left",
    icon: "ArrowLeft",
  },
  {
    id: "slide_right",
    name: "Slide Right",
    description: "Pan from left to right",
    icon: "ArrowRight",
  },
  {
    id: "parallax",
    name: "Parallax",
    description: "3D depth effect",
    icon: "Layers",
  },
];

export const DEFAULT_ANIMATION_STYLE_ID = "ken_burns";
