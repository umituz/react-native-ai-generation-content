/**
 * useTextToVoiceGeneration Hook
 * Handles text-to-voice generation flow
 */

import { useState, useCallback } from "react";
import { executeTextToVoice } from "../../infrastructure/services";
import type {
  TextToVoiceGenerationState,
  TextToVoiceRequest,
  TextToVoiceResult,
  VoiceGeneration,
  TextToVoiceFeatureConfig,
} from "../../domain/types";

export interface UseTextToVoiceGenerationProps {
  config: TextToVoiceFeatureConfig;
  onSuccess?: (generation: VoiceGeneration) => void;
  onError?: (error: string) => void;
}

export interface UseTextToVoiceGenerationReturn {
  state: TextToVoiceGenerationState;
  generate: (request: TextToVoiceRequest) => Promise<VoiceGeneration | null>;
  resetState: () => void;
}

const initialState: TextToVoiceGenerationState = {
  isGenerating: false,
  progress: 0,
  audioUrl: null,
  error: null,
  requestId: null,
};

export function useTextToVoiceGeneration(
  props: UseTextToVoiceGenerationProps,
): UseTextToVoiceGenerationReturn {
  const { config, onSuccess, onError } = props;
  const [state, setState] = useState<TextToVoiceGenerationState>(initialState);

  const resetState = useCallback(() => {
    setState(initialState);
  }, []);

  const generate = useCallback(
    async (request: TextToVoiceRequest): Promise<VoiceGeneration | null> => {
      if (!request.text.trim()) {
        const error = "Text is required";
        setState((prev) => ({ ...prev, error }));
        onError?.(error);
        return null;
      }

      setState({
        isGenerating: true,
        progress: 0,
        audioUrl: null,
        error: null,
        requestId: null,
      });

      config.onProcessingStart?.();

      const result: TextToVoiceResult = await executeTextToVoice(request, {
        model: config.model,
        buildInput: config.buildInput,
        extractResult: config.extractResult,
        onProgress: (progress) => {
          setState((prev) => ({ ...prev, progress }));
        },
      });

      if (result.success && result.audioUrl) {
        const generation: VoiceGeneration = {
          id: result.requestId || Date.now().toString(),
          text: request.text,
          audioUrl: result.audioUrl,
          provider: config.providerId || "unknown",
          createdAt: new Date().toISOString(),
        };

        setState({
          isGenerating: false,
          progress: 100,
          audioUrl: result.audioUrl,
          error: null,
          requestId: generation.id,
        });

        config.onProcessingComplete?.(result);
        onSuccess?.(generation);

        return generation;
      }

      const error = result.error || "Generation failed";
      setState({
        isGenerating: false,
        progress: 0,
        audioUrl: null,
        error,
        requestId: null,
      });

      config.onError?.(error);
      onError?.(error);
      config.onProcessingComplete?.(result);

      return null;
    },
    [config, onSuccess, onError],
  );

  return { state, generate, resetState };
}
