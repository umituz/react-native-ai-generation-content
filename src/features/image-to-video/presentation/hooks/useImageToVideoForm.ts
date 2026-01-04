/**
 * Image-to-Video Form Hook
 * Composes form state and generation for complete form management
 */

import { useMemo, useCallback } from "react";

declare const __DEV__: boolean;
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
    if (__DEV__) {
      // eslint-disable-next-line no-console
      console.log("[useImageToVideoForm] handleSelectImages called");
    }
    if (callbacks.onSelectImages) {
      try {
        const images = await callbacks.onSelectImages();
        if (__DEV__) {
          // eslint-disable-next-line no-console
          console.log("[useImageToVideoForm] Images selected:", images.length);
        }
        if (images.length > 0) {
          actions.addImages(images);
          if (__DEV__) {
            // eslint-disable-next-line no-console
            console.log("[useImageToVideoForm] Images added to state");
          }
        }
      } catch (error) {
        if (__DEV__) {
          // eslint-disable-next-line no-console
          console.error("[useImageToVideoForm] Error selecting images:", error);
        }
      }
    } else {
      if (__DEV__) {
        // eslint-disable-next-line no-console
        console.warn("[useImageToVideoForm] No onSelectImages callback provided");
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
