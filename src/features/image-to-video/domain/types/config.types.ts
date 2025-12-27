/**
 * Config Types for Image-to-Video
 * Defines callbacks and configuration options
 */

import type { ImageToVideoResult } from "./image-to-video.types";
import type { ImageToVideoFormState } from "./form.types";

export interface ImageToVideoCallbacks {
  onGenerate: (formState: ImageToVideoFormState) => Promise<void>;
  onSelectImages?: () => Promise<string[]>;
  onSelectCustomAudio?: () => Promise<string | null>;
  onCreditCheck?: (cost: number) => boolean;
  onShowPaywall?: (cost: number) => void;
  onSuccess?: (result: ImageToVideoResult) => void;
  onError?: (error: string) => void;
}

export interface ImageToVideoFormConfig {
  maxImages?: number;
  creditCost?: number;
  enableCustomAudio?: boolean;
  enableMotionPrompt?: boolean;
}

export interface ImageToVideoTranslationsExtended {
  sectionTitles: {
    selectedImages: string;
    animationStyle: string;
    durationPerImage: string;
    addMusic: string;
  };
  imageSelection: {
    selectImages: string;
    chooseUpTo: string;
    addMore: string;
  };
  duration: {
    totalVideo: string;
  };
  music: {
    customAudioSelected: string;
  };
  hero: {
    title: string;
    subtitle: string;
  };
  generate: {
    buttonText: string;
    generatingText: string;
  };
  errors: {
    noImages: string;
    noImagesMessage: string;
  };
}
