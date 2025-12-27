/**
 * Text-to-Image Feature Hook
 * Provider-agnostic hook for text-to-image generation
 */

import { useState, useCallback } from "react";
import { executeTextToImage } from "../../infrastructure/services";
import type {
  TextToImageFeatureState,
  TextToImageFeatureConfig,
  TextToImageResult,
  TextToImageOptions,
} from "../../domain/types";

export interface UseTextToImageFeatureProps {
  config: TextToImageFeatureConfig;
  userId: string;
}

export interface UseTextToImageFeatureReturn {
  state: TextToImageFeatureState;
  setPrompt: (prompt: string) => void;
  generate: (options?: TextToImageOptions) => Promise<TextToImageResult>;
  reset: () => void;
  isReady: boolean;
}

const initialState: TextToImageFeatureState = {
  prompt: "",
  imageUrl: null,
  imageUrls: [],
  isProcessing: false,
  progress: 0,
  error: null,
};

export function useTextToImageFeature(
  props: UseTextToImageFeatureProps,
): UseTextToImageFeatureReturn {
  const { config, userId } = props;
  const [state, setState] = useState<TextToImageFeatureState>(initialState);

  const setPrompt = useCallback(
    (prompt: string) => {
      setState((prev) => ({ ...prev, prompt, error: null }));
      config.onPromptChange?.(prompt);
    },
    [config],
  );

  const generate = useCallback(
    async (options?: TextToImageOptions): Promise<TextToImageResult> => {
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

      const result = await executeTextToImage(
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

      if (result.success && result.imageUrl) {
        setState((prev) => ({
          ...prev,
          imageUrl: result.imageUrl ?? null,
          imageUrls: result.imageUrls ?? [],
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
