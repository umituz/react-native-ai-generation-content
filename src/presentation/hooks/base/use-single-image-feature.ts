/**
 * useSingleImageFeature Hook
 * Provider-agnostic hook for single image processing features
 * App provides processRequest callback with their AI provider
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
export interface SingleImageProcessRequest {
  readonly imageUri: string;
  readonly onProgress: OnProgressCallback;
}

/**
 * Configuration for single image feature
 */
export interface UseSingleImageFeatureConfig {
  readonly onSelectImage: OnSelectImageCallback;
  readonly processRequest: (
    request: SingleImageProcessRequest
  ) => Promise<FeatureProcessResult>;
  readonly onSave?: OnSaveCallback;
  readonly onError?: (error: string) => void;
  readonly onSuccess?: (url: string) => void;
}

/**
 * State for single image feature
 */
export interface SingleImageFeatureState extends BaseFeatureState {
  readonly imageUri: string | null;
}

/**
 * Return type for single image feature hook
 */
export interface UseSingleImageFeatureReturn
  extends SingleImageFeatureState,
    BaseFeatureActions {
  readonly selectImage: () => Promise<void>;
  readonly process: () => Promise<void>;
  readonly save: () => Promise<void>;
}

export function useSingleImageFeature(
  config: UseSingleImageFeatureConfig
): UseSingleImageFeatureReturn {
  const [imageUri, setImageUri] = useState<string | null>(null);
  const [processedUrl, setProcessedUrl] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState<string | null>(null);

  const selectImage = useCallback(async (): Promise<void> => {
    try {
      const uri = await config.onSelectImage();
      if (uri) {
        setImageUri(uri);
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
    if (!imageUri) {
      const message = "error.noImage";
      setError(message);
      config.onError?.(message);
      return;
    }

    setIsProcessing(true);
    setProgress(0);
    setError(null);

    try {
      const result = await config.processRequest({
        imageUri,
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
  }, [imageUri, config]);

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
    setImageUri(null);
    setProcessedUrl(null);
    setIsProcessing(false);
    setProgress(0);
    setError(null);
  }, []);

  const clearError = useCallback((): void => {
    setError(null);
  }, []);

  return {
    imageUri,
    processedUrl,
    isProcessing,
    progress,
    error,
    selectImage,
    process,
    save,
    reset,
    clearError,
  };
}
