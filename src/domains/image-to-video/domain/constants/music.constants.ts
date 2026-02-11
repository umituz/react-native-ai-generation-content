/**
 * Music Mood Constants
 * Default music moods for image-to-video
 */

import type { MusicMood } from "../types";

export const DEFAULT_MUSIC_MOODS: MusicMood[] = [
  {
    id: "none",
    name: "No Music",
    description: "Silent video",
    icon: "volume-mute-outline",
  },
  {
    id: "energetic",
    name: "Energetic",
    description: "Upbeat and dynamic",
    icon: "flash-outline",
  },
  {
    id: "calm",
    name: "Calm",
    description: "Peaceful and relaxing",
    icon: "leaf-outline",
  },
  {
    id: "happy",
    name: "Happy",
    description: "Cheerful and joyful",
    icon: "happy-outline",
  },
  {
    id: "emotional",
    name: "Emotional",
    description: "Touching and heartfelt",
    icon: "heart-outline",
  },
  {
    id: "rhythmic",
    name: "Rhythmic",
    description: "Beat-driven and groovy",
    icon: "musical-notes-outline",
  },
  {
    id: "custom",
    name: "Custom",
    description: "Upload your own audio",
    icon: "cloud-upload-outline",
  },
];

export const DEFAULT_MUSIC_MOOD_ID = "none";
