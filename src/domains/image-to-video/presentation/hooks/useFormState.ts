/**
 * Form State Hook for Image-to-Video
 * Manages form state with actions
 * Now powered by generic form state factory
 */

import { useCallback, useMemo } from "react";
import { createFormStateHook } from "../../../../shared/hooks/factories";
import type {
  ImageToVideoFormState,
  ImageToVideoFormActions,
  ImageToVideoFormDefaults,
} from "../../domain/types";

export interface UseFormStateOptions {
  defaults: ImageToVideoFormDefaults;
}

export interface UseFormStateReturn {
  state: ImageToVideoFormState;
  actions: ImageToVideoFormActions & {
    addImages: (images: string[]) => void;
    removeImage: (index: number) => void;
  };
}

// Create the form state hook using the factory
const useImageToVideoFormStateInternal = createFormStateHook<
  ImageToVideoFormState,
  ImageToVideoFormDefaults
>({
  createInitialState: (defaults) => ({
    selectedImages: [],
    animationStyle: defaults.animationStyle ?? "none",
    duration: defaults.duration ?? 3,
    motionPrompt: "",
  }),
});

/**
 * Image-to-Video form state hook
 * Manages form fields with additional image array helpers
 */
export function useFormState(options: UseFormStateOptions): UseFormStateReturn {
  const { state, actions: baseActions } = useImageToVideoFormStateInternal(options);

  // Add custom array helpers
  const addImages = useCallback((images: string[]) => {
    baseActions.setSelectedImages([...state.selectedImages, ...images]);
  }, [state.selectedImages, baseActions]);

  const removeImage = useCallback((index: number) => {
    baseActions.setSelectedImages(
      state.selectedImages.filter((_, i) => i !== index)
    );
  }, [state.selectedImages, baseActions]);

  const actions = useMemo(
    () => ({
      ...baseActions,
      addImages,
      removeImage,
    }),
    [baseActions, addImages, removeImage]
  );

  return { state, actions };
}
