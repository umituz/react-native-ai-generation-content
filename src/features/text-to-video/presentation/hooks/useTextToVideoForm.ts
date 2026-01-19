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

declare const __DEV__: boolean;

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
  handleFrameChange: (index: number) => void;
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

  const handleFrameChange = useCallback((index: number) => {
    if (__DEV__) {
       
      console.log("[TextToVideoForm] Frame change requested:", index);
    }
  }, []);

  const handleFrameDelete = useCallback(
    (index: number) => {
      const newFrames = frames.filter((f) => f.order !== index);
      setFrames(newFrames);
    },
    [frames],
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
