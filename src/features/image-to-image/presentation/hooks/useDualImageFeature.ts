/**
 * useDualImageFeature Hook Factory
 * Base hook for dual image processing features (e.g., face-swap)
 */

import { useState, useCallback } from "react";
import { executeImageFeature } from "../../../../infrastructure/services";
import type {
  BaseDualImageState,
  BaseDualImageHookProps,
  BaseDualImageHookReturn,
  DualImageConfig,
  BaseImageResult,
} from "../../domain/types";

const INITIAL_STATE: BaseDualImageState = {
  sourceImageUri: null,
  targetImageUri: null,
  processedUrl: null,
  isProcessing: false,
  progress: 0,
  error: null,
};

export interface DualImageFeatureOptions<TConfig extends DualImageConfig> {
  buildInput?: (
    sourceBase64: string,
    targetBase64: string,
    config: TConfig,
  ) => Record<string, unknown>;
}

export function useDualImageFeature<
  TConfig extends DualImageConfig = DualImageConfig,
  TResult extends BaseImageResult = BaseImageResult,
>(
  props: BaseDualImageHookProps<TConfig>,
  options?: DualImageFeatureOptions<TConfig>,
): BaseDualImageHookReturn {
  const { config, onSelectSourceImage, onSelectTargetImage, onSaveImage, onBeforeProcess } = props;
  const [state, setState] = useState<BaseDualImageState>(INITIAL_STATE);

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

    // Check if processing is allowed (credit check, etc.)
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

    try {
      const [sourceBase64, targetBase64] = await Promise.all([
        config.prepareImage(state.sourceImageUri),
        config.prepareImage(state.targetImageUri),
      ]);

      const input = options?.buildInput
        ? options.buildInput(sourceBase64, targetBase64, config)
        : { sourceImageBase64: sourceBase64, targetImageBase64: targetBase64 };

      const result = await executeImageFeature(
        config.featureType,
        input,
        { extractResult: config.extractResult, onProgress: handleProgress },
      );

      if (result.success && result.imageUrl) {
        setState((prev) => ({
          ...prev,
          isProcessing: false,
          processedUrl: result.imageUrl!,
          progress: 100,
        }));
        config.onProcessingComplete?.(result as TResult);
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
    } catch (error) {
      const message = error instanceof Error ? error.message : String(error);
      setState((prev) => ({
        ...prev,
        isProcessing: false,
        error: message,
        progress: 0,
      }));
      config.onError?.(message);
    }
  }, [state.sourceImageUri, state.targetImageUri, config, options, handleProgress, onBeforeProcess]);

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
    setState(INITIAL_STATE);
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
