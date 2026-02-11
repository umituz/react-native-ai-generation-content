import { useState, useCallback, useMemo, useRef } from "react";
import { useGenerationOrchestrator } from "../../../../presentation/hooks/generation";
import { createImageToVideoStrategy } from "./imageToVideoStrategy";
import type {
  UseImageToVideoFeatureProps,
  UseImageToVideoFeatureReturn,
  INITIAL_STATE,
  DEFAULT_ALERT_MESSAGES,
} from "./image-to-video-feature.types";

export type {
  UseImageToVideoFeatureProps,
  UseImageToVideoFeatureReturn,
} from "./image-to-video-feature.types";

export function useImageToVideoFeature(props: UseImageToVideoFeatureProps): UseImageToVideoFeatureReturn {
  const { config, callbacks, userId } = props;
  const [state, setState] = useState(INITIAL_STATE);
  const creationIdRef = useRef("");

  const updateState = useCallback((videoUrl: string | null, thumbnailUrl: string | null) => {
    setState((prev) => ({ ...prev, videoUrl, thumbnailUrl }));
  }, []);

  const strategy = useMemo(
    () =>
      createImageToVideoStrategy({
        config,
        callbacks,
        buildInput: config.buildInput,
        extractResult: config.extractResult,
        userId,
        currentPrompt: state.motionPrompt || "",
        creationIdRef,
        updateState,
      }),
    [config, callbacks, userId, state.motionPrompt, updateState],
  );

  const orchestrator = useGenerationOrchestrator(strategy, {
    userId,
    alertMessages: DEFAULT_ALERT_MESSAGES,
    onCreditsExhausted: () => callbacks.onShowPaywall?.(config.creditCost ?? 0),
    onSuccess: (result) => {
      config.onProcessingComplete?.();
      callbacks.onGenerate?.(result);
    },
    onError: (err) => {
      config.onProcessingError?.(err.message);
      callbacks.onError?.(err.message);
    },
  });

  const setImageUri = useCallback((imageUri: string) => {
    setState((prev) => ({ ...prev, imageUri, error: null }));
  }, []);

  const setMotionPrompt = useCallback((motionPrompt: string) => {
    setState((prev) => ({ ...prev, motionPrompt, error: null }));
  }, []);

  const generate = useCallback(
    async (params?: any) => {
      const imageUri = params?.imageUri || state.imageUri;
      if (!imageUri) {
        const error = "Image is required";
        setState((prev) => ({ ...prev, error }));
        return { success: false, error };
      }

      setState((prev) => ({ ...prev, isProcessing: true, error: null }));

      try {
        const result = await orchestrator.generate({
          imageUrl: imageUri,
          prompt: state.motionPrompt || "",
          options: params,
          creationId: `image-to-video-${Date.now()}`,
        });
        setState((prev) => ({ ...prev, isProcessing: false }));
        return result;
      } catch (error) {
        const message = error instanceof Error ? error.message : "Generation failed";
        setState((prev) => ({ ...prev, isProcessing: false, error: message }));
        return { success: false, error: message };
      }
    },
    [state.imageUri, state.motionPrompt, orchestrator],
  );

  const reset = useCallback(() => setState(INITIAL_STATE), []);

  return {
    state,
    setImageUri,
    setMotionPrompt,
    generate,
    reset,
    isReady: !orchestrator.isGenerating && !state.isProcessing,
    canGenerate: !orchestrator.isGenerating && !state.isProcessing && !!state.imageUri,
  };
}
