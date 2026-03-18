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
import type { UseTextToVideoFormProps, UseTextToVideoFormReturn } from "./useTextToVideoForm.types";
import { createFrameChangeHandler, createFrameDeleteHandler } from "./useTextToVideoForm.handlers";

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
    createFrameChangeHandler(setFrames, frames.length),
    [frames.length],
  );

  const handleFrameDelete = useCallback(
    createFrameDeleteHandler(setFrames, frames.length),
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

