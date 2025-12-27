/**
 * Text-to-Video Feature State Types
 * Single Responsibility: Define internal state structures
 */

export interface TextToVideoFeatureState {
  prompt: string;
  videoUrl: string | null;
  thumbnailUrl: string | null;
  isProcessing: boolean;
  progress: number;
  error: string | null;
}

export interface TextToVideoFormState {
  prompt: string;
  style: string;
  aspectRatio: string;
  duration: number;
  activeTab: string;
  soundEnabled: boolean;
  professionalMode: boolean;
}

export interface TextToVideoGenerationState {
  isGenerating: boolean;
  progress: number;
  contentWarnings: string[];
  error: string | null;
}

export interface FrameData {
  id: string;
  url: string;
  order: number;
}

export const INITIAL_FORM_STATE: TextToVideoFormState = {
  prompt: "",
  style: "realistic",
  aspectRatio: "16:9",
  duration: 4,
  activeTab: "text-to-video",
  soundEnabled: false,
  professionalMode: false,
};

export const INITIAL_GENERATION_STATE: TextToVideoGenerationState = {
  isGenerating: false,
  progress: 0,
  contentWarnings: [],
  error: null,
};
