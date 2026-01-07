/**
 * Image-to-Video Feature Hook
 * Provider-agnostic hook with callbacks integration
 */

import { useState, useCallback, useMemo } from "react";
import { useGenerationExecution } from "./useGenerationExecution";
import { validateImageToVideoGeneration } from "./useImageToVideoValidation";
import { INITIAL_IMAGE_TO_VIDEO_STATE } from "./useImageToVideoFeature.constants";
import type {
  UseImageToVideoFeatureProps,
  UseImageToVideoFeatureReturn,
} from "./useImageToVideoFeature.types";
import type {
  ImageToVideoFeatureState,
  ImageToVideoGenerateParams,
  ImageToVideoResult,
} from "../../domain/types";

declare const __DEV__: boolean;

export function useImageToVideoFeature(
  props: UseImageToVideoFeatureProps,
): UseImageToVideoFeatureReturn {
  const { config, callbacks, userId } = props;
  const [state, setState] = useState<ImageToVideoFeatureState>(INITIAL_IMAGE_TO_VIDEO_STATE);

  const executeGeneration = useGenerationExecution({
    userId,
    config,
    callbacks,
    setState,
  });

  const setImageUri = useCallback(
    (uri: string) => {
      setState((prev) => ({ ...prev, imageUri: uri, error: null }));
      config.onImageSelect?.(uri);
    },
    [config],
  );

  const setMotionPrompt = useCallback((prompt: string) => {
    setState((prev) => ({ ...prev, motionPrompt: prompt }));
  }, []);

  const generate = useCallback(
    async (params?: ImageToVideoGenerateParams): Promise<ImageToVideoResult> => {
      const { imageUri: paramImageUri, motionPrompt: paramMotionPrompt, ...options } = params || {};
      const effectiveImageUri = paramImageUri || state.imageUri;
      const effectiveMotionPrompt = paramMotionPrompt ?? state.motionPrompt;

      if (typeof __DEV__ !== "undefined" && __DEV__) {
        console.log("[ImageToVideoFeature] generate called, hasImage:", !!effectiveImageUri);
      }

      if (paramImageUri) {
        setState((prev) => ({ ...prev, imageUri: paramImageUri }));
      }

      const validation = await validateImageToVideoGeneration(
        effectiveImageUri,
        callbacks,
        config.creditCost,
      );

      if (!validation.shouldProceed) {
        return validation;
      }

      return executeGeneration(effectiveImageUri, effectiveMotionPrompt, options);
    },
    [state.imageUri, state.motionPrompt, callbacks, config.creditCost, executeGeneration],
  );

  const reset = useCallback(() => {
    setState(INITIAL_IMAGE_TO_VIDEO_STATE);
  }, []);

  const isReady = useMemo(
    () => state.imageUri !== null && !state.isProcessing,
    [state.imageUri, state.isProcessing],
  );

  const canGenerate = useMemo(
    () => isReady && !state.error,
    [isReady, state.error],
  );

  return { state, setImageUri, setMotionPrompt, generate, reset, isReady, canGenerate };
}

export type { UseImageToVideoFeatureProps, UseImageToVideoFeatureReturn } from "./useImageToVideoFeature.types";
