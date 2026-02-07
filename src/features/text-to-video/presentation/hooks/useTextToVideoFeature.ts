/**
 * useTextToVideoFeature Hook
 * Simplified hook for text-to-video generation
 */

import { useState, useCallback, useMemo, useRef } from "react";
import {
  useGenerationOrchestrator,
  type GenerationStrategy,
} from "../../../../presentation/hooks/generation";
import { DEFAULT_ALERT_MESSAGES } from "../../../../presentation/constants/alert-messages";
import { generateCreationId } from "../../../../infrastructure/utils/id-generator.util";
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

interface VideoGenerationInput {
  prompt: string;
  options?: TextToVideoOptions;
  creationId: string;
}

export function useTextToVideoFeature(props: UseTextToVideoFeatureProps): UseTextToVideoFeatureReturn {
  const { config, callbacks, userId, buildInput, extractResult } = props;
  const [state, setState] = useState<TextToVideoFeatureState>(INITIAL_STATE);

  const currentCreationIdRef = useRef("");

  const strategy: GenerationStrategy<VideoGenerationInput, TextToVideoResult> = useMemo(
    () => ({
      execute: async (input) => {
        if (typeof __DEV__ !== "undefined" && __DEV__) {
          console.log("[TextToVideo] Executing generation:", input.prompt.slice(0, 100));
        }

        currentCreationIdRef.current = input.creationId;

        callbacks.onGenerationStart?.({
          creationId: input.creationId,
          type: "text-to-video",
          prompt: input.prompt,
          metadata: input.options as Record<string, unknown> | undefined,
        }).catch((err) => {
          if (typeof __DEV__ !== "undefined" && __DEV__) {
            console.warn("[TextToVideo] onGenerationStart failed:", err);
          }
        });

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

        const videoResult: TextToVideoResult = {
          success: true,
          videoUrl: result.videoUrl,
          thumbnailUrl: result.thumbnailUrl,
        };

        setState((prev) => ({
          ...prev,
          videoUrl: videoResult.videoUrl ?? null,
          thumbnailUrl: videoResult.thumbnailUrl ?? null,
        }));

        return videoResult;
      },
      getCreditCost: () => config.creditCost,
      save: async (result) => {
        if (result.success && result.videoUrl && currentCreationIdRef.current) {
          await callbacks.onCreationSave?.({
            creationId: currentCreationIdRef.current,
            type: "text-to-video",
            videoUrl: result.videoUrl,
            thumbnailUrl: result.thumbnailUrl,
            prompt: state.prompt,
          });
        }
      },
    }),
    [config, callbacks, buildInput, extractResult, userId, state.prompt, currentCreationIdRef],
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
          creationId: generateCreationId("text-to-video"),
        };
        const result = await orchestrator.generate(input);
        const videoResult = result as TextToVideoResult | undefined;
        setState((prev) => ({ ...prev, isProcessing: false }));
        return { success: true, videoUrl: videoResult?.videoUrl || undefined };
      } catch (error) {
        const message = error instanceof Error ? error.message : "Generation failed";
        setState((prev) => ({ ...prev, isProcessing: false, error: message }));
        return { success: false, error: message };
      }
    },
    [state.prompt, orchestrator],
  );

  const reset = useCallback(() => {
    setState(INITIAL_STATE);
  }, []);

  const isReady = !orchestrator.isGenerating && !state.isProcessing;
  const canGenerate = isReady && state.prompt.trim().length > 0;

  return { state, setPrompt, generate, reset, isReady, canGenerate };
}
