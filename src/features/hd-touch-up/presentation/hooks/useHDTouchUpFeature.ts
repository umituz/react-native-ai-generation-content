/**
 * useHDTouchUpFeature Hook
 * Manages HD touch up feature state and actions
 */

import { useState, useCallback } from "react";
import { executeImageFeature } from "../../../../infrastructure/services";
import type {
  HDTouchUpFeatureState,
  HDTouchUpFeatureConfig,
  HDTouchUpResult,
} from "../../domain/types";

export interface UseHDTouchUpFeatureProps {
  config: HDTouchUpFeatureConfig;
  onSelectImage: () => Promise<string | null>;
  onSaveImage: (imageUrl: string) => Promise<void>;
  onBeforeProcess?: () => Promise<boolean>;
}

export interface UseHDTouchUpFeatureReturn extends HDTouchUpFeatureState {
  selectImage: () => Promise<void>;
  process: () => Promise<void>;
  save: () => Promise<void>;
  reset: () => void;
}

const initialState: HDTouchUpFeatureState = {
  imageUri: null,
  processedUrl: null,
  isProcessing: false,
  progress: 0,
  error: null,
};

export function useHDTouchUpFeature(
  props: UseHDTouchUpFeatureProps,
): UseHDTouchUpFeatureReturn {
  const { config, onSelectImage, onSaveImage, onBeforeProcess } = props;
  const [state, setState] = useState<HDTouchUpFeatureState>(initialState);

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

    if (onBeforeProcess) {
      const canProceed = await onBeforeProcess();
      if (!canProceed) return;
    }

    setState((prev) => ({
      ...prev,
      isProcessing: true,
      progress: 0,
      error: null,
    }));

    config.onProcessingStart?.();

    const imageBase64 = await config.prepareImage(state.imageUri);

    const result = await executeImageFeature(
      "hd-touch-up",
      { imageBase64 },
      { extractResult: config.extractResult, onProgress: handleProgress },
    );

    if (result.success && result.imageUrl) {
      setState((prev) => ({
        ...prev,
        isProcessing: false,
        processedUrl: result.imageUrl!,
        progress: 100,
      }));
      config.onProcessingComplete?.(result as HDTouchUpResult);
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
  }, [state.imageUri, config, handleProgress, onBeforeProcess]);

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
