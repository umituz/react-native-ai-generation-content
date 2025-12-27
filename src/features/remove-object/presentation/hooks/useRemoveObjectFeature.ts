/**
 * useRemoveObjectFeature Hook
 * Manages remove object feature state and actions
 */

import { useState, useCallback } from "react";
import { executeRemoveObject } from "../../infrastructure/services";
import type {
  RemoveObjectFeatureState,
  RemoveObjectFeatureConfig,
  RemoveObjectResult,
} from "../../domain/types";

declare const __DEV__: boolean;

export interface UseRemoveObjectFeatureProps {
  config: RemoveObjectFeatureConfig;
  userId: string;
  onSelectImage: () => Promise<string | null>;
  onSelectMask?: () => Promise<string | null>;
  onSaveImage: (imageUrl: string) => Promise<void>;
}

export interface UseRemoveObjectFeatureReturn extends RemoveObjectFeatureState {
  selectImage: () => Promise<void>;
  selectMask: () => Promise<void>;
  setPrompt: (prompt: string) => void;
  process: () => Promise<void>;
  save: () => Promise<void>;
  reset: () => void;
}

const initialState: RemoveObjectFeatureState = {
  imageUri: null,
  maskUri: null,
  prompt: "",
  processedUrl: null,
  isProcessing: false,
  progress: 0,
  error: null,
};

export function useRemoveObjectFeature(
  props: UseRemoveObjectFeatureProps,
): UseRemoveObjectFeatureReturn {
  const { config, userId, onSelectImage, onSelectMask, onSaveImage } = props;
  const [state, setState] = useState<RemoveObjectFeatureState>(initialState);

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

  const selectMask = useCallback(async () => {
    if (!onSelectMask) return;

    try {
      const uri = await onSelectMask();
      if (uri) {
        setState((prev) => ({ ...prev, maskUri: uri, error: null }));
        config.onMaskSelect?.(uri);
      }
    } catch (error) {
      const message = error instanceof Error ? error.message : String(error);
      setState((prev) => ({ ...prev, error: message }));
    }
  }, [onSelectMask, config]);

  const setPrompt = useCallback((prompt: string) => {
    setState((prev) => ({ ...prev, prompt }));
  }, []);

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
      console.log("[useRemoveObjectFeature] Starting object removal process");
    }

    const imageBase64 = await config.prepareImage(state.imageUri);
    const maskBase64 = state.maskUri
      ? await config.prepareImage(state.maskUri)
      : undefined;

    const result: RemoveObjectResult = await executeRemoveObject(
      {
        imageUri: state.imageUri,
        imageBase64,
        maskBase64,
        prompt: state.prompt || undefined,
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
  }, [state.imageUri, state.maskUri, state.prompt, userId, config, handleProgress]);

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
    selectMask,
    setPrompt,
    process,
    save,
    reset,
  };
}
