/**
 * useTextToVideoFeature Hook
 * Single Responsibility: Orchestrate text-to-video generation with callbacks
 */

import { useState, useCallback, useMemo } from "react";
import type {
  TextToVideoFeatureState,
  TextToVideoConfig,
  TextToVideoCallbacks,
  TextToVideoResult,
  TextToVideoOptions,
  TextToVideoInputBuilder,
  TextToVideoResultExtractor,
} from "../../domain/types";
import { executeVideoGeneration } from "./textToVideoExecution";

declare const __DEV__: boolean;

export interface UseTextToVideoFeatureProps {
  config: TextToVideoConfig;
  callbacks: TextToVideoCallbacks;
  userId: string;
  buildInput: TextToVideoInputBuilder;
  extractResult?: TextToVideoResultExtractor;
}

export interface TextToVideoGenerateParams extends TextToVideoOptions {
  prompt?: string;
}

export interface UseTextToVideoFeatureReturn {
  state: TextToVideoFeatureState;
  setPrompt: (prompt: string) => void;
  generate: (params?: TextToVideoGenerateParams) => Promise<TextToVideoResult>;
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
    async (params?: TextToVideoGenerateParams): Promise<TextToVideoResult> => {
      const { prompt: paramPrompt, ...options } = params || {};
      const effectivePrompt = paramPrompt?.trim() || state.prompt.trim();

      if (!effectivePrompt) {
        const error = "Prompt is required";
        setState((prev) => ({ ...prev, error }));
        callbacks.onError?.(error);
        if (__DEV__) {
          console.log("[TextToVideoFeature] Generate failed: Prompt is required");
        }
        return { success: false, error };
      }

      if (paramPrompt) {
        setState((prev) => ({ ...prev, prompt: effectivePrompt }));
      }

      if (callbacks.onAuthCheck && !callbacks.onAuthCheck()) {
        if (__DEV__) {
          console.log("[TextToVideoFeature] Generate failed: Authentication required");
        }
        return { success: false, error: "Authentication required" };
      }

      if (
        callbacks.onCreditCheck &&
        !(await callbacks.onCreditCheck(config.creditCost))
      ) {
        callbacks.onShowPaywall?.(config.creditCost);
        if (__DEV__) {
          console.log("[TextToVideoFeature] Generate failed: Insufficient credits");
        }
        return { success: false, error: "Insufficient credits" };
      }

      if (callbacks.onModeration) {
        const moderationResult = await callbacks.onModeration(effectivePrompt);
        if (!moderationResult.allowed && moderationResult.warnings.length > 0) {
          return new Promise((resolve) => {
            callbacks.onShowModerationWarning?.(
              moderationResult.warnings,
              () => {
                setState((prev) => ({ ...prev, isProcessing: false }));
                resolve({ success: false, error: "Content policy violation" });
              },
              async () => {
                const result = await executeVideoGeneration(
                  effectivePrompt,
                  options,
                  { userId, config, callbacks, buildInput, extractResult },
                  {
                    onStateUpdate: (update) =>
                      setState((prev) => ({ ...prev, ...update })),
                  },
                );
                resolve(result);
              },
            );
          });
        }
      }

      return executeVideoGeneration(
        effectivePrompt,
        options,
        { userId, config, callbacks, buildInput, extractResult },
        { onStateUpdate: (update) => setState((prev) => ({ ...prev, ...update })) },
      );
    },
    [state.prompt, callbacks, config, userId, buildInput, extractResult],
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
