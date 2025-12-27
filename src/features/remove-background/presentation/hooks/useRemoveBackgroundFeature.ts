/**
 * useRemoveBackgroundFeature Hook
 * Manages remove background feature state and actions
 */

import { useState, useCallback } from "react";
import { executeRemoveBackground } from "../../infrastructure/services";
import type {
  RemoveBackgroundFeatureState,
  RemoveBackgroundFeatureConfig,
  RemoveBackgroundResult,
} from "../../domain/types";

declare const __DEV__: boolean;

export interface UseRemoveBackgroundFeatureProps {
  config: RemoveBackgroundFeatureConfig;
  userId: string;
  onSelectImage: () => Promise<string | null>;
  onSaveImage: (imageUrl: string) => Promise<void>;
}

export interface UseRemoveBackgroundFeatureReturn extends RemoveBackgroundFeatureState {
  selectImage: () => Promise<void>;
  process: () => Promise<void>;
  save: () => Promise<void>;
  reset: () => void;
}

const initialState: RemoveBackgroundFeatureState = {
  imageUri: null,
  processedUrl: null,
  isProcessing: false,
  progress: 0,
  error: null,
};

export function useRemoveBackgroundFeature(
  props: UseRemoveBackgroundFeatureProps,
): UseRemoveBackgroundFeatureReturn {
  const { config, userId, onSelectImage, onSaveImage } = props;
  const [state, setState] = useState<RemoveBackgroundFeatureState>(initialState);

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

    if (__DEV__) {
      // eslint-disable-next-line no-console
      console.log("[useRemoveBackgroundFeature] Starting background removal process");
    }

    const imageBase64 = await config.prepareImage(state.imageUri);

    const result: RemoveBackgroundResult = await executeRemoveBackground(
      {
        imageUri: state.imageUri,
        imageBase64,
        userId,
      },
      {
        model: config.model,
        buildInput: config.buildInput,
        extractResult: config.extractResult,
        onProgress: handleProgress,
      },
    );

    if (result.success && result.imageUrl) {
      const url = result.imageUrl;
      setState((prev) => ({
        ...prev,
        isProcessing: false,
        processedUrl: url,
        progress: 100,
      }));
      config.onProcessingComplete?.(result);
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
  }, [state.imageUri, userId, config, handleProgress]);

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
