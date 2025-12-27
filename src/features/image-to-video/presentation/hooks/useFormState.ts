/**
 * Form State Hook for Image-to-Video
 * Manages form state with actions
 */

import { useState, useCallback, useMemo } from "react";
import type {
  ImageToVideoFormState,
  ImageToVideoFormActions,
  ImageToVideoFormDefaults,
  AnimationStyleId,
  MusicMoodId,
  VideoDuration,
} from "../../domain/types";
import {
  DEFAULT_ANIMATION_STYLE_ID,
  DEFAULT_MUSIC_MOOD_ID,
  DEFAULT_VIDEO_DURATION,
} from "../../domain/constants";

export interface UseFormStateOptions {
  defaults?: ImageToVideoFormDefaults;
}

export interface UseFormStateReturn {
  state: ImageToVideoFormState;
  actions: ImageToVideoFormActions;
}

function createInitialState(defaults?: ImageToVideoFormDefaults): ImageToVideoFormState {
  return {
    selectedImages: [],
    animationStyle: defaults?.animationStyle ?? DEFAULT_ANIMATION_STYLE_ID,
    duration: defaults?.duration ?? DEFAULT_VIDEO_DURATION,
    musicMood: defaults?.musicMood ?? DEFAULT_MUSIC_MOOD_ID,
    customAudioUri: null,
    motionPrompt: "",
  };
}

export function useFormState(options?: UseFormStateOptions): UseFormStateReturn {
  const { defaults } = options ?? {};

  const [state, setState] = useState<ImageToVideoFormState>(() =>
    createInitialState(defaults)
  );

  const setSelectedImages = useCallback((images: string[]) => {
    setState((prev) => ({ ...prev, selectedImages: images }));
  }, []);

  const addImages = useCallback((images: string[]) => {
    setState((prev) => ({
      ...prev,
      selectedImages: [...prev.selectedImages, ...images],
    }));
  }, []);

  const removeImage = useCallback((index: number) => {
    setState((prev) => ({
      ...prev,
      selectedImages: prev.selectedImages.filter((_, i) => i !== index),
    }));
  }, []);

  const setAnimationStyle = useCallback((style: AnimationStyleId) => {
    setState((prev) => ({ ...prev, animationStyle: style }));
  }, []);

  const setDuration = useCallback((duration: VideoDuration) => {
    setState((prev) => ({ ...prev, duration }));
  }, []);

  const setMusicMood = useCallback((mood: MusicMoodId) => {
    setState((prev) => ({ ...prev, musicMood: mood }));
  }, []);

  const setCustomAudioUri = useCallback((uri: string | null) => {
    setState((prev) => ({ ...prev, customAudioUri: uri }));
  }, []);

  const setMotionPrompt = useCallback((prompt: string) => {
    setState((prev) => ({ ...prev, motionPrompt: prompt }));
  }, []);

  const reset = useCallback(() => {
    setState(createInitialState(defaults));
  }, [defaults]);

  const actions = useMemo<ImageToVideoFormActions>(
    () => ({
      setSelectedImages,
      addImages,
      removeImage,
      setAnimationStyle,
      setDuration,
      setMusicMood,
      setCustomAudioUri,
      setMotionPrompt,
      reset,
    }),
    [
      setSelectedImages,
      addImages,
      removeImage,
      setAnimationStyle,
      setDuration,
      setMusicMood,
      setCustomAudioUri,
      setMotionPrompt,
      reset,
    ]
  );

  return { state, actions };
}
