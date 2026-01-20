/**
 * useTextToVideoFeature Hook
 * Simplified hook for text-to-video generation
 */

import { useState, useCallback, useMemo } from "react";
import {
  useGenerationOrchestrator,
  type GenerationStrategy,
  type AlertMessages,
} from "../../../../presentation/hooks/generation";
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

const DEFAULT_ALERT_MESSAGES: AlertMessages = {
  networkError: "No internet connection. Please check your network.",
  policyViolation: "Content not allowed. Please try again.",
  saveFailed: "Failed to save. Please try again.",
  creditFailed: "Credit operation failed. Please try again.",
  unknown: "An error occurred. Please try again.",
};

interface VideoGenerationInput {
  prompt: string;
  options?: TextToVideoOptions;
  creationId: string;
}

function generateCreationId(): string {
  return `text-to-video_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`;
}

export function useTextToVideoFeature(props: UseTextToVideoFeatureProps): UseTextToVideoFeatureReturn {
  const { config, callbacks, userId, buildInput, extractResult } = props;
  const [state, setState] = useState<TextToVideoFeatureState>(INITIAL_STATE);

  const strategy: GenerationStrategy<VideoGenerationInput, TextToVideoResult> = useMemo(
    () => ({
      execute: async (input) => {
        if (typeof __DEV__ !== "undefined" && __DEV__) {
          console.log("[TextToVideo] Executing generation:", input.prompt.slice(0, 100));
        }

        callbacks.onGenerationStart?.({
          creationId: input.creationId,
          type: "text-to-video",
          prompt: input.prompt,
          metadata: input.options as Record<string, unknown> | undefined,
        }).catch(() => {});

        const result = await executeTextToVideo(
          { prompt: input.prompt, userId, options: input.options },
          {
            model: config.model,
            buildInput,
            extractResult,
          },
        );

        if (!result.success || !result.videoUrl) {
          throw new Error(result.error || "Generation failed");
        }

        setState((prev) => ({
          ...prev,
          videoUrl: result.videoUrl ?? null,
          thumbnailUrl: result.thumbnailUrl ?? null,
        }));

        return result;
      },
      getCreditCost: () => config.creditCost,
      save: async (result) => {
        if (result.success && result.videoUrl) {
          await callbacks.onCreationSave?.({
            creationId: generateCreationId(),
            type: "text-to-video",
            videoUrl: result.videoUrl,
            thumbnailUrl: result.thumbnailUrl,
            prompt: state.prompt,
          });
        }
      },
    }),
    [config, callbacks, buildInput, extractResult, userId, state.prompt],
  );

  const orchestrator = useGenerationOrchestrator(strategy, {
    userId,
    alertMessages: DEFAULT_ALERT_MESSAGES,
    onCreditsExhausted: () => callbacks.onShowPaywall?.(config.creditCost),
    onSuccess: (result) => {
      const videoResult = result as TextToVideoResult;
      callbacks.onGenerate?.(videoResult);
    },
    onError: (err) => {
      callbacks.onError?.(err.message);
    },
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
        const input: VideoGenerationInput = {
          prompt: prompt.trim(),
          options: params,
          creationId: generateCreationId(),
        };
        await orchestrator.generate(input);
        setState((prev) => ({ ...prev, isProcessing: false }));
        return { success: true, videoUrl: state.videoUrl || undefined };
      } catch (error) {
        const message = error instanceof Error ? error.message : "Generation failed";
        setState((prev) => ({ ...prev, isProcessing: false, error: message }));
        return { success: false, error: message };
      }
    },
    [state.prompt, state.videoUrl, orchestrator],
  );

  const reset = useCallback(() => {
    setState(INITIAL_STATE);
  }, []);

  const isReady = !orchestrator.isGenerating && !state.isProcessing;
  const canGenerate = isReady && state.prompt.trim().length > 0;

  return { state, setPrompt, generate, reset, isReady, canGenerate };
}
