/**
 * Image-to-Video Form Hook
 * Composes form state and generation for complete form management
 */

import { useMemo, useCallback } from "react";
import { useFormState, type UseFormStateOptions } from "./useFormState";
import { useGeneration } from "./useGeneration";
import type {
  ImageToVideoFormState,
  ImageToVideoFormActions,
  ImageToVideoGenerationState,
  ImageToVideoCallbacks,
  MusicMoodId,
} from "../../domain/types";

export interface UseImageToVideoFormOptions extends UseFormStateOptions {
  callbacks: ImageToVideoCallbacks;
}

export interface UseImageToVideoFormReturn {
  state: ImageToVideoFormState;
  actions: ImageToVideoFormActions;
  generationState: ImageToVideoGenerationState;
  handleGenerate: () => Promise<void>;
  handleMusicSelect: (moodId: MusicMoodId) => void;
  handleSelectImages: () => Promise<void>;
  isReady: boolean;
}

export function useImageToVideoForm(
  options: UseImageToVideoFormOptions
): UseImageToVideoFormReturn {
  const { callbacks, defaults } = options;

  const { state, actions } = useFormState({ defaults });

  const { generationState, handleGenerate, isReady } = useGeneration({
    formState: state,
    callbacks,
  });

  const handleMusicSelect = useCallback(
    (moodId: MusicMoodId) => {
      if (moodId === "custom" && callbacks.onSelectCustomAudio) {
        callbacks.onSelectCustomAudio().then((uri) => {
          if (uri) {
            actions.setCustomAudioUri(uri);
            actions.setMusicMood("custom");
          }
        });
      } else {
        actions.setMusicMood(moodId);
        if (moodId !== "custom") {
          actions.setCustomAudioUri(null);
        }
      }
    },
    [callbacks, actions]
  );

  const handleSelectImages = useCallback(async () => {
    if (callbacks.onSelectImages) {
      const images = await callbacks.onSelectImages();
      if (images.length > 0) {
        actions.addImages(images);
      }
    }
  }, [callbacks, actions]);

  const formReturn = useMemo<UseImageToVideoFormReturn>(
    () => ({
      state,
      actions,
      generationState,
      handleGenerate,
      handleMusicSelect,
      handleSelectImages,
      isReady,
    }),
    [
      state,
      actions,
      generationState,
      handleGenerate,
      handleMusicSelect,
      handleSelectImages,
      isReady,
    ]
  );

  return formReturn;
}
