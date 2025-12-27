/**
 * Text-to-Voice Feature Hook
 * Provider-agnostic hook for text-to-voice generation
 */

import { useState, useCallback } from "react";
import { executeTextToVoice } from "../../infrastructure/services";
import type {
  TextToVoiceFeatureState,
  TextToVoiceFeatureConfig,
  TextToVoiceResult,
  TextToVoiceOptions,
} from "../../domain/types";

export interface UseTextToVoiceFeatureProps {
  config: TextToVoiceFeatureConfig;
  userId: string;
}

export interface UseTextToVoiceFeatureReturn {
  state: TextToVoiceFeatureState;
  setText: (text: string) => void;
  generate: (options?: TextToVoiceOptions) => Promise<TextToVoiceResult>;
  reset: () => void;
  isReady: boolean;
}

const initialState: TextToVoiceFeatureState = {
  text: "",
  audioUrl: null,
  isProcessing: false,
  progress: 0,
  error: null,
};

export function useTextToVoiceFeature(
  props: UseTextToVoiceFeatureProps,
): UseTextToVoiceFeatureReturn {
  const { config, userId } = props;
  const [state, setState] = useState<TextToVoiceFeatureState>(initialState);

  const setText = useCallback(
    (text: string) => {
      setState((prev) => ({ ...prev, text, error: null }));
      config.onTextChange?.(text);
    },
    [config],
  );

  const generate = useCallback(
    async (options?: TextToVoiceOptions): Promise<TextToVoiceResult> => {
      if (!state.text) {
        const error = "Text is required";
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

      const result = await executeTextToVoice(
        { text: state.text, userId, options },
        {
          model: config.model,
          buildInput: config.buildInput,
          extractResult: config.extractResult,
          onProgress: (progress) => {
            setState((prev) => ({ ...prev, progress }));
          },
        },
      );

      if (result.success && result.audioUrl) {
        setState((prev) => ({
          ...prev,
          audioUrl: result.audioUrl ?? null,
          isProcessing: false,
          progress: 100,
        }));
      } else {
        const error = result.error || "Generation failed";
        setState((prev) => ({ ...prev, isProcessing: false, error }));
        config.onError?.(error);
      }

      config.onProcessingComplete?.(result);
      return result;
    },
    [state.text, userId, config],
  );

  const reset = useCallback(() => {
    setState(initialState);
  }, []);

  const isReady = state.text.length > 0 && !state.isProcessing;

  return { state, setText, generate, reset, isReady };
}
