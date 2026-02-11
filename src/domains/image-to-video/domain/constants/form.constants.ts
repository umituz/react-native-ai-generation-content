/**
 * Form Constants
 * Default form values for image-to-video
 */

import type { ImageToVideoFormDefaults, ImageToVideoFormConfig } from "../types";
import { DEFAULT_ANIMATION_STYLE_ID } from "./animation.constants";
import { DEFAULT_MUSIC_MOOD_ID } from "./music.constants";
import { DEFAULT_VIDEO_DURATION } from "./duration.constants";

export const DEFAULT_FORM_VALUES: ImageToVideoFormDefaults = {
  animationStyle: DEFAULT_ANIMATION_STYLE_ID,
  duration: DEFAULT_VIDEO_DURATION,
  musicMood: DEFAULT_MUSIC_MOOD_ID,
};

export const DEFAULT_FORM_CONFIG: ImageToVideoFormConfig = {
  maxImages: 10,
  creditCost: 1,
  enableCustomAudio: true,
  enableMotionPrompt: false,
};
