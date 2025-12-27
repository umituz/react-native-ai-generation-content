/**
 * useTextToVoiceForm Hook
 * Manages form state for text-to-voice generation
 */

import { useState, useCallback } from "react";
import type {
  TextToVoiceFormState,
  TextToVoiceFormReturn,
  TextToVoiceFormConfig,
  TextToVoiceRequest,
} from "../../domain/types";

const DEFAULT_FORM_STATE: TextToVoiceFormState = {
  text: "",
  model: "",
  voice: "",
  speed: 1.0,
  stability: 0.5,
  similarityBoost: 0.75,
};

export function useTextToVoiceForm(
  config?: TextToVoiceFormConfig,
): TextToVoiceFormReturn {
  const initialState: TextToVoiceFormState = {
    text: config?.initialText ?? DEFAULT_FORM_STATE.text,
    model: config?.initialModel ?? DEFAULT_FORM_STATE.model,
    voice: config?.initialVoice ?? DEFAULT_FORM_STATE.voice,
    speed: config?.initialSpeed ?? DEFAULT_FORM_STATE.speed,
    stability: config?.initialStability ?? DEFAULT_FORM_STATE.stability,
    similarityBoost:
      config?.initialSimilarityBoost ?? DEFAULT_FORM_STATE.similarityBoost,
  };

  const [formState, setFormState] = useState<TextToVoiceFormState>(initialState);

  const setText = useCallback((text: string) => {
    setFormState((prev) => ({ ...prev, text }));
  }, []);

  const setModel = useCallback((model: string) => {
    setFormState((prev) => ({ ...prev, model }));
  }, []);

  const setVoice = useCallback((voice: string) => {
    setFormState((prev) => ({ ...prev, voice }));
  }, []);

  const setSpeed = useCallback((speed: number) => {
    setFormState((prev) => ({ ...prev, speed }));
  }, []);

  const setStability = useCallback((stability: number) => {
    setFormState((prev) => ({ ...prev, stability }));
  }, []);

  const setSimilarityBoost = useCallback((similarityBoost: number) => {
    setFormState((prev) => ({ ...prev, similarityBoost }));
  }, []);

  const buildRequest = useCallback((): TextToVoiceRequest => {
    return {
      text: formState.text.trim(),
      userId: "",
      model: formState.model || undefined,
      options: {
        voice: formState.voice || undefined,
        speed: formState.speed,
        stability: formState.stability,
        similarityBoost: formState.similarityBoost,
      },
    };
  }, [formState]);

  const resetForm = useCallback(() => {
    setFormState(initialState);
  }, [initialState]);

  return {
    formState,
    setText,
    setModel,
    setVoice,
    setSpeed,
    setStability,
    setSimilarityBoost,
    buildRequest,
    resetForm,
  };
}
