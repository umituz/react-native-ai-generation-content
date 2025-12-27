/**
 * useTextToVideoFeature Hook
 * Single Responsibility: Orchestrate text-to-video generation with callbacks
 */

import { useState, useCallback, useMemo } from "react";
import { executeTextToVideo } from "../../infrastructure/services";
import type {
  TextToVideoFeatureState,
  TextToVideoConfig,
  TextToVideoCallbacks,
  TextToVideoResult,
  TextToVideoOptions,
  TextToVideoInputBuilder,
  TextToVideoResultExtractor,
} from "../../domain/types";

declare const __DEV__: boolean;

export interface UseTextToVideoFeatureProps {
  config: TextToVideoConfig;
  callbacks: TextToVideoCallbacks;
  userId: string;
  buildInput: TextToVideoInputBuilder;
  extractResult?: TextToVideoResultExtractor;
}

export interface UseTextToVideoFeatureReturn {
  state: TextToVideoFeatureState;
  setPrompt: (prompt: string) => void;
  generate: (options?: TextToVideoOptions) => Promise<TextToVideoResult>;
  reset: () => void;
  isReady: boolean;
  canGenerate: boolean;
}

const INITIAL_STATE: TextToVideoFeatureState = {
  prompt: "",
  videoUrl: null,
  thumbnailUrl: null,
  isProcessing: false,
  progress: 0,
  error: null,
};

export function useTextToVideoFeature(
  props: UseTextToVideoFeatureProps,
): UseTextToVideoFeatureReturn {
  const { config, callbacks, userId, buildInput, extractResult } = props;
  const [state, setState] = useState<TextToVideoFeatureState>(INITIAL_STATE);

  const setPrompt = useCallback(
    (prompt: string) => {
      setState((prev) => ({ ...prev, prompt, error: null }));
      callbacks.onPromptChange?.(prompt);
    },
    [callbacks],
  );

  const generate = useCallback(
    async (options?: TextToVideoOptions): Promise<TextToVideoResult> => {
      if (!state.prompt.trim()) {
        const error = "Prompt is required";
        setState((prev) => ({ ...prev, error }));
        callbacks.onError?.(error);
        return { success: false, error };
      }

      if (callbacks.onAuthCheck && !callbacks.onAuthCheck()) {
        return { success: false, error: "Authentication required" };
      }

      if (callbacks.onCreditCheck && !callbacks.onCreditCheck(config.creditCost)) {
        callbacks.onShowPaywall?.(config.creditCost);
        return { success: false, error: "Insufficient credits" };
      }

      if (callbacks.onModeration) {
        const moderationResult = await callbacks.onModeration(state.prompt);
        if (!moderationResult.allowed && moderationResult.warnings.length > 0) {
          return new Promise((resolve) => {
            callbacks.onShowModerationWarning?.(
              moderationResult.warnings,
              () => {
                setState((prev) => ({ ...prev, isProcessing: false }));
                resolve({ success: false, error: "Content policy violation" });
              },
              async () => {
                const result = await executeGeneration(options);
                resolve(result);
              },
            );
          });
        }
      }

      return executeGeneration(options);
    },
    [state.prompt, callbacks, config.creditCost, buildInput, extractResult, userId],
  );

  const executeGeneration = useCallback(
    async (options?: TextToVideoOptions): Promise<TextToVideoResult> => {
      setState((prev) => ({
        ...prev,
        isProcessing: true,
        progress: 0,
        error: null,
      }));

      if (__DEV__) {
        // eslint-disable-next-line no-console
        console.log("[TextToVideoFeature] Starting generation");
      }

      const result = await executeTextToVideo(
        { prompt: state.prompt, userId, options },
        {
          model: config.model,
          buildInput,
          extractResult,
          onProgress: (progress) => {
            setState((prev) => ({ ...prev, progress }));
            callbacks.onProgress?.(progress);
          },
        },
      );

      if (result.success && result.videoUrl) {
        setState((prev) => ({
          ...prev,
          videoUrl: result.videoUrl ?? null,
          thumbnailUrl: result.thumbnailUrl ?? null,
          isProcessing: false,
          progress: 100,
        }));
        callbacks.onGenerate?.(result);
      } else {
        const error = result.error || "Generation failed";
        setState((prev) => ({
          ...prev,
          isProcessing: false,
          error,
        }));
        callbacks.onError?.(error);
      }

      return result;
    },
    [state.prompt, userId, config.model, buildInput, extractResult, callbacks],
  );

  const reset = useCallback(() => {
    setState(INITIAL_STATE);
  }, []);

  const isReady = useMemo(
    () => state.prompt.trim().length > 0 && !state.isProcessing,
    [state.prompt, state.isProcessing],
  );

  const canGenerate = useMemo(
    () => isReady && !state.error,
    [isReady, state.error],
  );

  return { state, setPrompt, generate, reset, isReady, canGenerate };
}
