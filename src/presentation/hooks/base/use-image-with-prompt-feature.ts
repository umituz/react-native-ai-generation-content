/**
 * useImageWithPromptFeature Hook
 * Provider-agnostic hook for image + prompt processing features
 * Examples: Inpainting, Style Transfer, Background Replacement
 */

import { useCallback, useState } from "react";
import type {
  BaseFeatureState,
  BaseFeatureActions,
  FeatureProcessResult,
  OnProgressCallback,
  OnSelectImageCallback,
  OnSaveCallback,
} from "./types";
import { createFeatureStateHandlers, executeProcess, executeSave } from "./utils/feature-state.factory";

/**
 * Request passed to processRequest callback
 */
export interface ImageWithPromptProcessRequest {
  readonly imageUri: string;
  readonly prompt: string;
  readonly onProgress: OnProgressCallback;
}

/**
 * Configuration for image with prompt feature
 */
export interface UseImageWithPromptFeatureConfig {
  readonly onSelectImage: OnSelectImageCallback;
  readonly processRequest: (
    request: ImageWithPromptProcessRequest
  ) => Promise<FeatureProcessResult>;
  readonly onSave?: OnSaveCallback;
  readonly onError?: (error: string) => void;
  readonly onSuccess?: (url: string) => void;
  readonly requirePrompt?: boolean;
}

/**
 * State for image with prompt feature
 */
export interface ImageWithPromptFeatureState extends BaseFeatureState {
  readonly imageUri: string | null;
  readonly prompt: string;
}

/**
 * Return type for image with prompt feature hook
 */
export interface UseImageWithPromptFeatureReturn
  extends ImageWithPromptFeatureState,
    BaseFeatureActions {
  readonly selectImage: () => Promise<void>;
  readonly setPrompt: (prompt: string) => void;
  readonly process: () => Promise<void>;
  readonly save: () => Promise<void>;
}

const initialState: ImageWithPromptFeatureState = {
  imageUri: null,
  prompt: "",
  processedUrl: null,
  isProcessing: false,
  progress: 0,
  error: null,
};

export function useImageWithPromptFeature(
  config: UseImageWithPromptFeatureConfig,
): UseImageWithPromptFeatureReturn {
  const [state, setState] = useState<ImageWithPromptFeatureState>(initialState);

  const { reset, clearError } = createFeatureStateHandlers({
    setState,
    initialState,
  });

  const selectImage = useCallback(async (): Promise<void> => {
    try {
      const uri = await config.onSelectImage();
      if (uri) {
        setState((prev) => ({
          ...prev,
          imageUri: uri,
          error: null,
          processedUrl: null,
        }));
      }
    } catch (err) {
      const message = err instanceof Error ? err.message : "error.selectImage";
      setState((prev) => ({ ...prev, error: message }));
      config.onError?.(message);
    }
  }, [config]);

  const setPrompt = useCallback((prompt: string) => {
    setState((prev) => ({ ...prev, prompt }));
  }, []);

  const process = useCallback(async (): Promise<void> => {
    if (!state.imageUri) {
      const message = "error.noImage";
      setState((prev) => ({ ...prev, error: message }));
      config.onError?.(message);
      return;
    }

    if (config.requirePrompt && !state.prompt.trim()) {
      const message = "error.noPrompt";
      setState((prev) => ({ ...prev, error: message }));
      config.onError?.(message);
      return;
    }

    const result = await executeProcess<FeatureProcessResult>({
      canProcess: () => {
        if (!state.imageUri) return false;
        if (config.requirePrompt) return !!state.prompt.trim();
        return true;
      },
      setError: (error: string | null) => setState((prev) => ({ ...prev, error })),
      setProcessing: (isProcessing: boolean) => setState((prev) => ({ ...prev, isProcessing })),
      onError: config.onError,
      processFn: () =>
        config.processRequest({
          imageUri: state.imageUri!,
          prompt: state.prompt.trim(),
          onProgress: (progress) => setState((prev) => ({ ...prev, progress })),
        }),
      onSuccess: (result: FeatureProcessResult) => {
        if (result.outputUrl) {
          setState((prev) => ({ ...prev, processedUrl: result.outputUrl ?? null }));
          config.onSuccess?.(result.outputUrl);
        } else {
          const message = result.error || "error.processing";
          setState((prev) => ({ ...prev, error: message }));
          config.onError?.(message);
        }
      },
    });

    if (!result) {
      setState((prev) => ({ ...prev, progress: 0 }));
    }
  }, [state.imageUri, state.prompt, config]);

  const save = useCallback(async (): Promise<void> => {
    await executeSave({
      processedUrl: state.processedUrl,
      onSave: config.onSave,
      setError: (error) => setState((prev) => ({ ...prev, error })),
      onError: config.onError,
    });
  }, [state.processedUrl, config]);

  return {
    ...state,
    selectImage,
    setPrompt,
    process,
    save,
    reset,
    clearError,
  };
}
