/**
 * Form Types for Image-to-Video
 * Defines form state and actions
 */

import type { AnimationStyleId } from "./animation.types";
import type { MusicMoodId } from "./music.types";
import type { VideoDuration } from "./duration.types";

export interface ImageToVideoFormState {
  selectedImages: string[];
  animationStyle: AnimationStyleId;
  duration: VideoDuration;
  musicMood: MusicMoodId;
  customAudioUri: string | null;
  motionPrompt: string;
}

export interface ImageToVideoFormActions {
  setSelectedImages: (images: string[]) => void;
  addImages: (images: string[]) => void;
  removeImage: (index: number) => void;
  setAnimationStyle: (style: AnimationStyleId) => void;
  setDuration: (duration: VideoDuration) => void;
  setMusicMood: (mood: MusicMoodId) => void;
  setCustomAudioUri: (uri: string | null) => void;
  setMotionPrompt: (prompt: string) => void;
  reset: () => void;
}

export interface ImageToVideoFormDefaults {
  animationStyle?: AnimationStyleId;
  duration?: VideoDuration;
  musicMood?: MusicMoodId;
}
