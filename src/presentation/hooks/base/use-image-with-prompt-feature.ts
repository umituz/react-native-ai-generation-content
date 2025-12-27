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

export function useImageWithPromptFeature(
  config: UseImageWithPromptFeatureConfig
): UseImageWithPromptFeatureReturn {
  const [imageUri, setImageUri] = useState<string | null>(null);
  const [prompt, setPrompt] = useState<string>("");
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

    if (config.requirePrompt && !prompt.trim()) {
      const message = "error.noPrompt";
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
        prompt: prompt.trim(),
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
  }, [imageUri, prompt, config]);

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
    setPrompt("");
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
    prompt,
    processedUrl,
    isProcessing,
    progress,
    error,
    selectImage,
    setPrompt,
    process,
    save,
    reset,
    clearError,
  };
}
