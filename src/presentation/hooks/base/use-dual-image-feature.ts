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
    request: DualImageProcessRequest
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

export function useDualImageFeature(
  config: UseDualImageFeatureConfig
): UseDualImageFeatureReturn {
  const [firstImageUri, setFirstImageUri] = useState<string | null>(null);
  const [secondImageUri, setSecondImageUri] = useState<string | null>(null);
  const [processedUrl, setProcessedUrl] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState<string | null>(null);

  const selectFirstImage = useCallback(async (): Promise<void> => {
    try {
      const uri = await config.onSelectFirstImage();
      if (uri) {
        setFirstImageUri(uri);
        setError(null);
        setProcessedUrl(null);
      }
    } catch (err) {
      const message = err instanceof Error ? err.message : "error.selectImage";
      setError(message);
      config.onError?.(message);
    }
  }, [config]);

  const selectSecondImage = useCallback(async (): Promise<void> => {
    try {
      const uri = await config.onSelectSecondImage();
      if (uri) {
        setSecondImageUri(uri);
        setError(null);
        setProcessedUrl(null);
      }
    } catch (err) {
      const message = err instanceof Error ? err.message : "error.selectImage";
      setError(message);
      config.onError?.(message);
    }
  }, [config]);

  const process = useCallback(async (): Promise<void> => {
    if (!firstImageUri || !secondImageUri) {
      const message = "error.noImages";
      setError(message);
      config.onError?.(message);
      return;
    }

    setIsProcessing(true);
    setProgress(0);
    setError(null);

    try {
      const result = await config.processRequest({
        firstImageUri,
        secondImageUri,
        onProgress: setProgress,
      });

      if (result.success && result.outputUrl) {
        setProcessedUrl(result.outputUrl);
        config.onSuccess?.(result.outputUrl);
      } else {
        const message = result.error || "error.processing";
        setError(message);
        config.onError?.(message);
      }
    } catch (err) {
      const message = err instanceof Error ? err.message : "error.processing";
      setError(message);
      config.onError?.(message);
    } finally {
      setIsProcessing(false);
      setProgress(0);
    }
  }, [firstImageUri, secondImageUri, config]);

  const save = useCallback(async (): Promise<void> => {
    if (!processedUrl || !config.onSave) {
      return;
    }

    try {
      await config.onSave(processedUrl);
    } catch (err) {
      const message = err instanceof Error ? err.message : "error.save";
      setError(message);
      config.onError?.(message);
    }
  }, [processedUrl, config]);

  const reset = useCallback((): void => {
    setFirstImageUri(null);
    setSecondImageUri(null);
    setProcessedUrl(null);
    setIsProcessing(false);
    setProgress(0);
    setError(null);
  }, []);

  const clearError = useCallback((): void => {
    setError(null);
  }, []);

  return {
    firstImageUri,
    secondImageUri,
    processedUrl,
    isProcessing,
    progress,
    error,
    selectFirstImage,
    selectSecondImage,
    process,
    save,
    reset,
    clearError,
  };
}
