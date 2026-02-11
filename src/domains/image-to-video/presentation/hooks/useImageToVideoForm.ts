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
} from "../../domain/types";

export interface UseImageToVideoFormOptions extends UseFormStateOptions {
  callbacks: ImageToVideoCallbacks;
}

export interface UseImageToVideoFormReturn {
  state: ImageToVideoFormState;
  actions: ImageToVideoFormActions;
  generationState: ImageToVideoGenerationState;
  handleGenerate: () => Promise<void>;
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

  const handleSelectImages = useCallback(async () => {
    if (__DEV__) {
       
      console.log("[useImageToVideoForm] handleSelectImages called");
    }
    if (callbacks.onSelectImages) {
      try {
        const images = await callbacks.onSelectImages();
        if (__DEV__) {
           
          console.log("[useImageToVideoForm] Images selected:", images.length);
        }
        if (images.length > 0) {
          actions.addImages(images);
          if (__DEV__) {
             
            console.log("[useImageToVideoForm] Images added to state");
          }
        }
      } catch (error) {
        if (__DEV__) {
           
          console.error("[useImageToVideoForm] Error selecting images:", error);
        }
      }
    } else {
      if (__DEV__) {
         
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
      handleSelectImages,
      isReady,
    }),
    [
      state,
      actions,
      generationState,
      handleGenerate,
      handleSelectImages,
      isReady,
    ]
  );

  return formReturn;
}
