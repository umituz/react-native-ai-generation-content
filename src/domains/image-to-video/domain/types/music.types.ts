/**
 * Music Types for Image-to-Video
 * Defines music mood options
 */

export interface MusicMood {
  id: string;
  name: string;
  description: string;
  icon: string;
}

export type MusicMoodId =
  | "none"
  | "energetic"
  | "calm"
  | "happy"
  | "emotional"
  | "rhythmic"
  | "custom"
  | string;
