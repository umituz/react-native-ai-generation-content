/**
 * useDualImageFeature Hook
 * Provider-agnostic hook for dual image processing features
 * Examples: AI Hug, AI Kiss, Face Swap
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
export interface DualImageProcessRequest {
  readonly firstImageUri: string;
  readonly secondImageUri: string;
  readonly onProgress: OnProgressCallback;
}

/**
 * Configuration for dual image feature
 */
export interface UseDualImageFeatureConfig {
  readonly onSelectFirstImage: OnSelectImageCallback;
  readonly onSelectSecondImage: OnSelectImageCallback;
  readonly processRequest: (
    request: DualImageProcessRequest,
  ) => Promise<FeatureProcessResult>;
  readonly onSave?: OnSaveCallback;
  readonly onError?: (error: string) => void;
  readonly onSuccess?: (url: string) => void;
}

/**
 * State for dual image feature
 */
export interface DualImageFeatureState extends BaseFeatureState {
  readonly firstImageUri: string | null;
  readonly secondImageUri: string | null;
}

/**
 * Return type for dual image feature hook
 */
export interface UseDualImageFeatureReturn
  extends DualImageFeatureState,
    BaseFeatureActions {
  readonly selectFirstImage: () => Promise<void>;
  readonly selectSecondImage: () => Promise<void>;
  readonly process: () => Promise<void>;
  readonly save: () => Promise<void>;
}

const initialState: DualImageFeatureState = {
  firstImageUri: null,
  secondImageUri: null,
  processedUrl: null,
  isProcessing: false,
  progress: 0,
  error: null,
};

export function useDualImageFeature(
  config: UseDualImageFeatureConfig,
): UseDualImageFeatureReturn {
  const [state, setState] = useState<DualImageFeatureState>(initialState);

  const { reset, clearError } = createFeatureStateHandlers({
    setState,
    initialState,
  });

  const selectFirstImage = useCallback(async (): Promise<void> => {
    try {
      const uri = await config.onSelectFirstImage();
      if (uri) {
        setState((prev) => ({
          ...prev,
          firstImageUri: uri,
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

  const selectSecondImage = useCallback(async (): Promise<void> => {
    try {
      const uri = await config.onSelectSecondImage();
      if (uri) {
        setState((prev) => ({
          ...prev,
          secondImageUri: uri,
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

  const process = useCallback(async (): Promise<void> => {
    if (!state.firstImageUri || !state.secondImageUri) {
      const message = "error.noImages";
      setState((prev) => ({ ...prev, error: message }));
      config.onError?.(message);
      return;
    }

    const result = await executeProcess<FeatureProcessResult>({
      canProcess: () => !!state.firstImageUri && !!state.secondImageUri,
      setError: (error: string | null) => setState((prev) => ({ ...prev, error })),
      setProcessing: (isProcessing: boolean) => setState((prev) => ({ ...prev, isProcessing })),
      onError: config.onError,
      processFn: () =>
        config.processRequest({
          firstImageUri: state.firstImageUri!,
          secondImageUri: state.secondImageUri!,
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
  }, [state.firstImageUri, state.secondImageUri, config]);

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
    selectFirstImage,
    selectSecondImage,
    process,
    save,
    reset,
    clearError,
  };
}
