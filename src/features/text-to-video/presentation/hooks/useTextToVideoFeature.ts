/**
 * Text-to-Video Feature Hook
 * Provider-agnostic hook for text-to-video generation
 */

import { useState, useCallback } from "react";
import { executeTextToVideo } from "../../infrastructure/services";
import type {
  TextToVideoFeatureState,
  TextToVideoFeatureConfig,
  TextToVideoResult,
  TextToVideoOptions,
} from "../../domain/types";

export interface UseTextToVideoFeatureProps {
  config: TextToVideoFeatureConfig;
  userId: string;
}

export interface UseTextToVideoFeatureReturn {
  state: TextToVideoFeatureState;
  setPrompt: (prompt: string) => void;
  generate: (options?: TextToVideoOptions) => Promise<TextToVideoResult>;
  reset: () => void;
  isReady: boolean;
}

const initialState: TextToVideoFeatureState = {
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
  const { config, userId } = props;
  const [state, setState] = useState<TextToVideoFeatureState>(initialState);

  const setPrompt = useCallback(
    (prompt: string) => {
      setState((prev) => ({ ...prev, prompt, error: null }));
      config.onPromptChange?.(prompt);
    },
    [config],
  );

  const generate = useCallback(
    async (options?: TextToVideoOptions): Promise<TextToVideoResult> => {
      if (!state.prompt) {
        const error = "Prompt is required";
        setState((prev) => ({ ...prev, error }));
        return { success: false, error };
      }

      setState((prev) => ({
        ...prev,
        isProcessing: true,
        progress: 0,
        error: null,
      }));

      config.onProcessingStart?.();

      const result = await executeTextToVideo(
        { prompt: state.prompt, userId, options },
        {
          model: config.model,
          buildInput: config.buildInput,
          extractResult: config.extractResult,
          onProgress: (progress) => {
            setState((prev) => ({ ...prev, progress }));
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
      } else {
        const error = result.error || "Generation failed";
        setState((prev) => ({
          ...prev,
          isProcessing: false,
          error,
        }));
        config.onError?.(error);
      }

      config.onProcessingComplete?.(result);
      return result;
    },
    [state.prompt, userId, config],
  );

  const reset = useCallback(() => {
    setState(initialState);
  }, []);

  const isReady = state.prompt.length > 0 && !state.isProcessing;

  return { state, setPrompt, generate, reset, isReady };
}
