/**
 * useAIKissFeature Hook
 * Manages AI kiss feature state and actions
 */

import { useState, useCallback } from "react";
import { executeAIKiss } from "../../infrastructure/services";
import type {
  AIKissFeatureState,
  AIKissFeatureConfig,
  AIKissResult,
} from "../../domain/types";

declare const __DEV__: boolean;

export interface UseAIKissFeatureProps {
  config: AIKissFeatureConfig;
  userId: string;
  onSelectSourceImage: () => Promise<string | null>;
  onSelectTargetImage: () => Promise<string | null>;
  onSaveImage: (imageUrl: string) => Promise<void>;
}

export interface UseAIKissFeatureReturn extends AIKissFeatureState {
  selectSourceImage: () => Promise<void>;
  selectTargetImage: () => Promise<void>;
  process: () => Promise<void>;
  save: () => Promise<void>;
  reset: () => void;
}

const initialState: AIKissFeatureState = {
  sourceImageUri: null,
  targetImageUri: null,
  processedUrl: null,
  isProcessing: false,
  progress: 0,
  error: null,
};

export function useAIKissFeature(
  props: UseAIKissFeatureProps,
): UseAIKissFeatureReturn {
  const { config, userId, onSelectSourceImage, onSelectTargetImage, onSaveImage } = props;
  const [state, setState] = useState<AIKissFeatureState>(initialState);

  const selectSourceImage = useCallback(async () => {
    try {
      const uri = await onSelectSourceImage();
      if (uri) {
        setState((prev) => ({ ...prev, sourceImageUri: uri, error: null }));
        config.onSourceImageSelect?.(uri);
      }
    } catch (error) {
      const message = error instanceof Error ? error.message : String(error);
      setState((prev) => ({ ...prev, error: message }));
    }
  }, [onSelectSourceImage, config]);

  const selectTargetImage = useCallback(async () => {
    try {
      const uri = await onSelectTargetImage();
      if (uri) {
        setState((prev) => ({ ...prev, targetImageUri: uri, error: null }));
        config.onTargetImageSelect?.(uri);
      }
    } catch (error) {
      const message = error instanceof Error ? error.message : String(error);
      setState((prev) => ({ ...prev, error: message }));
    }
  }, [onSelectTargetImage, config]);

  const handleProgress = useCallback((progress: number) => {
    setState((prev) => ({ ...prev, progress }));
  }, []);

  const process = useCallback(async () => {
    if (!state.sourceImageUri || !state.targetImageUri) return;

    setState((prev) => ({
      ...prev,
      isProcessing: true,
      progress: 0,
      error: null,
    }));

    config.onProcessingStart?.();

    if (__DEV__) {
      // eslint-disable-next-line no-console
      console.log("[useAIKissFeature] Starting AI kiss process");
    }

    const sourceImageBase64 = await config.prepareImage(state.sourceImageUri);
    const targetImageBase64 = await config.prepareImage(state.targetImageUri);

    const result: AIKissResult = await executeAIKiss(
      {
        sourceImageUri: state.sourceImageUri,
        targetImageUri: state.targetImageUri,
        sourceImageBase64,
        targetImageBase64,
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
  }, [state.sourceImageUri, state.targetImageUri, userId, config, handleProgress]);

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
    selectSourceImage,
    selectTargetImage,
    process,
    save,
    reset,
  };
}
