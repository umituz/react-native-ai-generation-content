import { useState, useCallback, useMemo, useRef } from "react";
import { useGenerationOrchestrator } from "../../../../presentation/hooks/generation";
import { DEFAULT_ALERT_MESSAGES } from "../../../../presentation/constants/alert-messages";
import { generateCreationId } from "../../../../infrastructure/utils/id-generator.util";
import { createTextToVideoStrategy } from "./textToVideoStrategy";
import type {
  TextToVideoFeatureState,
  TextToVideoConfig,
  TextToVideoCallbacks,
  TextToVideoResult,
  TextToVideoOptions,
  TextToVideoInputBuilder,
  TextToVideoResultExtractor,
} from "../../domain/types";

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

export function useTextToVideoFeature(props: UseTextToVideoFeatureProps): UseTextToVideoFeatureReturn {
  const { config, callbacks, userId, buildInput, extractResult } = props;
  const [state, setState] = useState<TextToVideoFeatureState>(INITIAL_STATE);
  const creationIdRef = useRef("");

  const updateState = useCallback((videoUrl: string | null, thumbnailUrl: string | null) => {
    setState((prev) => ({ ...prev, videoUrl, thumbnailUrl }));
  }, []);

  const strategy = useMemo(
    () =>
      createTextToVideoStrategy({
        config,
        callbacks,
        buildInput,
        extractResult,
        userId,
        currentPrompt: state.prompt,
        creationIdRef,
        updateState,
      }),
    [config, callbacks, buildInput, extractResult, userId, state.prompt, updateState],
  );

  const orchestrator = useGenerationOrchestrator(strategy, {
    userId,
    alertMessages: DEFAULT_ALERT_MESSAGES,
    onCreditsExhausted: () => callbacks.onShowPaywall?.(config.creditCost),
    onSuccess: (result) => callbacks.onGenerate?.(result as TextToVideoResult),
    onError: (err) => callbacks.onError?.(err.message),
  });

  const setPrompt = useCallback((prompt: string) => {
    setState((prev) => ({ ...prev, prompt, error: null }));
  }, []);

  const generate = useCallback(
    async (params?: TextToVideoGenerateParams): Promise<TextToVideoResult> => {
      const prompt = params?.prompt || state.prompt;
      if (!prompt.trim()) {
        const error = "Prompt is required";
        setState((prev) => ({ ...prev, error }));
        return { success: false, error };
      }

      setState((prev) => ({ ...prev, isProcessing: true, error: null, progress: 0 }));

      try {
        const result = await orchestrator.generate({
          prompt: prompt.trim(),
          options: params,
          creationId: generateCreationId("text-to-video"),
        });
        setState((prev) => ({ ...prev, isProcessing: false }));
        return { success: true, videoUrl: (result as TextToVideoResult)?.videoUrl };
      } catch (error) {
        const message = error instanceof Error ? error.message : "Generation failed";
        setState((prev) => ({ ...prev, isProcessing: false, error: message }));
        return { success: false, error: message };
      }
    },
    [state.prompt, orchestrator],
  );

  const reset = useCallback(() => setState(INITIAL_STATE), []);

  return {
    state,
    setPrompt,
    generate,
    reset,
    isReady: !orchestrator.isGenerating && !state.isProcessing,
    canGenerate: !orchestrator.isGenerating && !state.isProcessing && state.prompt.trim().length > 0,
  };
}
