/**
 * useTextToVideoForm Hook
 * Single Responsibility: Manage text-to-video form state
 */

import { useState, useCallback } from "react";
import type {
  TextToVideoFormState,
  FrameData,
} from "../../domain/types";
import { INITIAL_FORM_STATE } from "../../domain/types";


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

export function useTextToVideoForm(
  props: UseTextToVideoFormProps = {},
): UseTextToVideoFormReturn {
  const { initialValues, onPromptChange, onStyleChange, onTabChange } = props;

  const [state, setState] = useState<TextToVideoFormState>({
    ...INITIAL_FORM_STATE,
    ...initialValues,
  });

  const [frames, setFrames] = useState<FrameData[]>([]);

  const setPrompt = useCallback(
    (prompt: string) => {
      setState((prev) => ({ ...prev, prompt }));
      onPromptChange?.(prompt);
    },
    [onPromptChange],
  );

  const setStyle = useCallback(
    (style: string) => {
      setState((prev) => ({ ...prev, style }));
      onStyleChange?.(style);
    },
    [onStyleChange],
  );

  const setAspectRatio = useCallback((aspectRatio: string) => {
    setState((prev) => ({ ...prev, aspectRatio }));
  }, []);

  const setDuration = useCallback((duration: number) => {
    setState((prev) => ({ ...prev, duration }));
  }, []);

  const setActiveTab = useCallback(
    (activeTab: string) => {
      setState((prev) => ({ ...prev, activeTab }));
      onTabChange?.(activeTab);
    },
    [onTabChange],
  );

  const setSoundEnabled = useCallback((soundEnabled: boolean) => {
    setState((prev) => ({ ...prev, soundEnabled }));
  }, []);

  const setProfessionalMode = useCallback((professionalMode: boolean) => {
    setState((prev) => ({ ...prev, professionalMode }));
  }, []);

  const handleFrameChange = useCallback(
    (fromIndex: number, toIndex: number) => {
      if (fromIndex < 0 || fromIndex >= frames.length || toIndex < 0 || toIndex >= frames.length) {
        if (__DEV__) {
          console.warn("[TextToVideoForm] Invalid frame indices:", { fromIndex, toIndex, length: frames.length });
        }
        return;
      }

      if (fromIndex === toIndex) return;

      setFrames((prevFrames) => {
        const newFrames = [...prevFrames];
        const [movedFrame] = newFrames.splice(fromIndex, 1);
        newFrames.splice(toIndex, 0, movedFrame);
        return newFrames;
      });
    },
    [frames.length],
  );

  const handleFrameDelete = useCallback(
    (index: number) => {
      if (index < 0 || index >= frames.length) {
        if (__DEV__) {
          console.warn("[TextToVideoForm] Invalid frame index:", index);
        }
        return;
      }
      setFrames((prevFrames) => prevFrames.filter((_, i) => i !== index));
    },
    [frames.length],
  );

  const selectExamplePrompt = useCallback(
    (prompt: string) => {
      setPrompt(prompt);
    },
    [setPrompt],
  );

  const reset = useCallback(() => {
    setState({ ...INITIAL_FORM_STATE, ...initialValues });
    setFrames([]);
  }, [initialValues]);

  return {
    state,
    frames,
    setPrompt,
    setStyle,
    setAspectRatio,
    setDuration,
    setActiveTab,
    setSoundEnabled,
    setProfessionalMode,
    setFrames,
    handleFrameChange,
    handleFrameDelete,
    selectExamplePrompt,
    reset,
  };
}
