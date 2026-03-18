/**
 * useTextToVideoForm Hook - Types
 * Type definitions for text-to-video form
 */

import type {
  TextToVideoFormState,
  FrameData,
} from "../../domain/types";

export interface UseTextToVideoFormProps {
  initialValues?: Partial<TextToVideoFormState>;
  onPromptChange?: (prompt: string) => void;
  onStyleChange?: (style: string) => void;
  onTabChange?: (tab: string) => void;
}

export interface UseTextToVideoFormReturn {
  state: TextToVideoFormState;
  frames: FrameData[];
  setPrompt: (prompt: string) => void;
  setStyle: (style: string) => void;
  setAspectRatio: (ratio: string) => void;
  setDuration: (duration: number) => void;
  setActiveTab: (tab: string) => void;
  setSoundEnabled: (enabled: boolean) => void;
  setProfessionalMode: (enabled: boolean) => void;
  setFrames: (frames: FrameData[]) => void;
  handleFrameChange: (fromIndex: number, toIndex: number) => void;
  handleFrameDelete: (index: number) => void;
  selectExamplePrompt: (prompt: string) => void;
  reset: () => void;
}
