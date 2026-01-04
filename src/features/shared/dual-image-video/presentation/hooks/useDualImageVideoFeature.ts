/**
 * useDualImageVideoFeature Hook
 * Base hook for video features that take two images (ai-hug, ai-kiss, etc.)
 * DRY: Consolidates common logic from useAIHugFeature and useAIKissFeature
 */

import { useState, useCallback } from "react";
import { executeVideoFeature } from "../../../../../infrastructure/services";
import type {
  DualImageVideoFeatureState,
  UseDualImageVideoFeatureProps,
  UseDualImageVideoFeatureReturn,
} from "../../domain/types/dual-image-video.types";

const initialState: DualImageVideoFeatureState = {
  sourceImageUri: null,
  targetImageUri: null,
  processedVideoUrl: null,
  isProcessing: false,
  progress: 0,
  error: null,
};

export function useDualImageVideoFeature(
  props: UseDualImageVideoFeatureProps,
): UseDualImageVideoFeatureReturn {
  const { featureType, config, onSelectSourceImage, onSelectTargetImage, onSaveVideo } = props;
  const [state, setState] = useState<DualImageVideoFeatureState>(initialState);

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

    const sourceImageBase64 = await config.prepareImage(state.sourceImageUri);
    const targetImageBase64 = await config.prepareImage(state.targetImageUri);

    const result = await executeVideoFeature(
      featureType,
      { sourceImageBase64, targetImageBase64 },
      { extractResult: config.extractResult, onProgress: handleProgress },
    );

    if (result.success && result.videoUrl) {
      setState((prev) => ({
        ...prev,
        isProcessing: false,
        processedVideoUrl: result.videoUrl!,
        progress: 100,
      }));
      config.onProcessingComplete?.({ success: true, videoUrl: result.videoUrl });
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
  }, [state.sourceImageUri, state.targetImageUri, featureType, config, handleProgress]);

  const save = useCallback(async () => {
    if (!state.processedVideoUrl) return;

    try {
      await onSaveVideo(state.processedVideoUrl);
    } catch (error) {
      const message = error instanceof Error ? error.message : String(error);
      setState((prev) => ({ ...prev, error: message }));
    }
  }, [state.processedVideoUrl, onSaveVideo]);

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
