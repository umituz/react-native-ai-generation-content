/**
 * useAnimeSelfieFeature Hook
 * Manages anime selfie feature state and actions
 */

import { useState, useCallback } from "react";
import { executeImageFeature } from "../../../../infrastructure/services";
import type {
  AnimeSelfieFeatureState,
  AnimeSelfieFeatureConfig,
  AnimeSelfieResult,
} from "../../domain/types";

export interface UseAnimeSelfieFeatureProps {
  config: AnimeSelfieFeatureConfig;
  onSelectImage: () => Promise<string | null>;
  onSaveImage: (imageUrl: string) => Promise<void>;
}

export interface UseAnimeSelfieFeatureReturn extends AnimeSelfieFeatureState {
  selectImage: () => Promise<void>;
  process: () => Promise<void>;
  save: () => Promise<void>;
  reset: () => void;
}

const initialState: AnimeSelfieFeatureState = {
  imageUri: null,
  processedUrl: null,
  isProcessing: false,
  progress: 0,
  error: null,
};

export function useAnimeSelfieFeature(
  props: UseAnimeSelfieFeatureProps,
): UseAnimeSelfieFeatureReturn {
  const { config, onSelectImage, onSaveImage } = props;
  const [state, setState] = useState<AnimeSelfieFeatureState>(initialState);

  const selectImage = useCallback(async () => {
    try {
      const uri = await onSelectImage();
      if (uri) {
        setState((prev) => ({ ...prev, imageUri: uri, error: null }));
        config.onImageSelect?.(uri);
      }
    } catch (error) {
      const message = error instanceof Error ? error.message : String(error);
      setState((prev) => ({ ...prev, error: message }));
    }
  }, [onSelectImage, config]);

  const handleProgress = useCallback((progress: number) => {
    setState((prev) => ({ ...prev, progress }));
  }, []);

  const process = useCallback(async () => {
    if (!state.imageUri) return;

    setState((prev) => ({
      ...prev,
      isProcessing: true,
      progress: 0,
      error: null,
    }));

    config.onProcessingStart?.();

    const imageBase64 = await config.prepareImage(state.imageUri);

    const result = await executeImageFeature(
      "anime-selfie",
      { imageBase64, options: { style: config.defaultStyle } },
      { extractResult: config.extractResult, onProgress: handleProgress },
    );

    if (result.success && result.imageUrl) {
      setState((prev) => ({
        ...prev,
        isProcessing: false,
        processedUrl: result.imageUrl!,
        progress: 100,
      }));
      config.onProcessingComplete?.(result as AnimeSelfieResult);
    } else {
      const errorMessage = result.error || "Processing failed";
      setState((prev) => ({
        ...prev,
        isProcessing: false,
        error: errorMessage,
        progress: 0,
      }));
      config.onError?.(errorMessage);
    }
  }, [state.imageUri, config, handleProgress]);

  const save = useCallback(async () => {
    if (!state.processedUrl) return;

    try {
      await onSaveImage(state.processedUrl);
    } catch (error) {
      const message = error instanceof Error ? error.message : String(error);
      setState((prev) => ({ ...prev, error: message }));
    }
  }, [state.processedUrl, onSaveImage]);

  const reset = useCallback(() => {
    setState(initialState);
  }, []);

  return {
    ...state,
    selectImage,
    process,
    save,
    reset,
  };
}
