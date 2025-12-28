/**
 * useReplaceBackgroundFeature Hook
 * Manages replace background feature state and actions
 */

import { useState, useCallback } from "react";
import { executeImageFeature } from "../../../../infrastructure/services";
import type {
  ReplaceBackgroundFeatureState,
  ReplaceBackgroundFeatureConfig,
  ReplaceBackgroundResult,
  ReplaceBackgroundMode,
} from "../../domain/types";

export interface UseReplaceBackgroundFeatureProps {
  config: ReplaceBackgroundFeatureConfig;
  onSelectImage: () => Promise<string | null>;
  onSaveImage: (imageUrl: string) => Promise<void>;
}

export interface UseReplaceBackgroundFeatureReturn extends ReplaceBackgroundFeatureState {
  selectImage: () => Promise<void>;
  setPrompt: (prompt: string) => void;
  setMode: (mode: ReplaceBackgroundMode) => void;
  process: () => Promise<void>;
  save: () => Promise<void>;
  reset: () => void;
}

const initialState: ReplaceBackgroundFeatureState = {
  imageUri: null,
  prompt: "",
  processedUrl: null,
  isProcessing: false,
  progress: 0,
  error: null,
  mode: "replace",
};

export function useReplaceBackgroundFeature(
  props: UseReplaceBackgroundFeatureProps,
): UseReplaceBackgroundFeatureReturn {
  const { config, onSelectImage, onSaveImage } = props;
  const [state, setState] = useState<ReplaceBackgroundFeatureState>({
    ...initialState,
    mode: config.defaultMode || "replace",
  });

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

  const setPrompt = useCallback((prompt: string) => {
    setState((prev) => ({ ...prev, prompt }));
  }, []);

  const setMode = useCallback((mode: ReplaceBackgroundMode) => {
    setState((prev) => ({ ...prev, mode }));
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

    const imageBase64 = await config.prepareImage(state.imageUri);

    const result = await executeImageFeature(
      "replace-background",
      {
        imageBase64,
        prompt: state.prompt || undefined,
        options: { mode: state.mode },
      },
      { extractResult: config.extractResult, onProgress: handleProgress },
    );

    if (result.success && result.imageUrl) {
      setState((prev) => ({
        ...prev,
        isProcessing: false,
        processedUrl: result.imageUrl!,
        progress: 100,
      }));
      config.onProcessingComplete?.(result as ReplaceBackgroundResult);
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
  }, [state.imageUri, state.prompt, state.mode, config, handleProgress]);

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
    setState({
      ...initialState,
      mode: config.defaultMode || "replace",
    });
  }, [config.defaultMode]);

  return {
    ...state,
    selectImage,
    setPrompt,
    setMode,
    process,
    save,
    reset,
  };
}
