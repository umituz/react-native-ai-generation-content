/**
 * useTextToVideoFeature Hook
 * Uses centralized orchestrator for auth, credits, moderation, and error handling
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

  // Strategy for orchestrator
  const strategy: GenerationStrategy<VideoGenerationInput, TextToVideoResult> = useMemo(
    () => ({
      execute: async (input, onProgress) => {
        if (typeof __DEV__ !== "undefined" && __DEV__) {
          console.log("[TextToVideo] Executing generation:", input.prompt.slice(0, 100));
        }

        // Notify generation start
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
            onProgress: (progress) => {
              setState((prev) => ({ ...prev, progress }));
              onProgress?.(progress);
              callbacks.onProgress?.(progress);
            },
          },
        );

        if (!result.success || !result.videoUrl) {
          throw new Error(result.error || "Generation failed");
        }

        // Update state with result
        setState((prev) => ({
          ...prev,
          videoUrl: result.videoUrl ?? null,
          thumbnailUrl: result.thumbnailUrl ?? null,
        }));

        return result;
      },
      getCreditCost: () => config.creditCost,
      save: async (result, uid) => {
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

  // Use orchestrator with optional callbacks for credits
  const orchestrator = useGenerationOrchestrator(strategy, {
    userId,
    alertMessages: DEFAULT_ALERT_MESSAGES,
    auth: callbacks.onAuthCheck
      ? { isAuthenticated: callbacks.onAuthCheck, onAuthRequired: () => {} }
      : undefined,
    credits: callbacks.onCreditCheck
      ? {
          checkCredits: async (cost) => (await callbacks.onCreditCheck?.(cost)) ?? true,
          deductCredits: async (cost) => { await callbacks.onCreditDeduct?.(cost); },
          onCreditsExhausted: () => callbacks.onShowPaywall?.(config.creditCost),
        }
      : undefined,
    moderation: callbacks.onModeration
      ? {
          checkContent: async (input) => {
            const result = await callbacks.onModeration!((input as VideoGenerationInput).prompt);
            return result;
          },
          onShowWarning: callbacks.onShowModerationWarning,
        }
      : undefined,
    onSuccess: (result) => {
      const videoResult = result as TextToVideoResult;
      if (typeof __DEV__ !== "undefined" && __DEV__) {
        console.log("[TextToVideo] Success!", videoResult.videoUrl?.slice(0, 50));
      }
      callbacks.onGenerate?.(videoResult);
    },
    onError: (err) => {
      if (typeof __DEV__ !== "undefined" && __DEV__) {
        console.log("[TextToVideo] Error:", err.message);
      }
      setState((prev) => ({ ...prev, error: err.message }));
      callbacks.onError?.(err.message);
    },
  });

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
        return { success: false, error };
      }

      if (paramPrompt) {
        setState((prev) => ({ ...prev, prompt: effectivePrompt }));
      }

      setState((prev) => ({ ...prev, isProcessing: true, progress: 0, error: null }));

      const creationId = generateCreationId();
      await orchestrator.generate({ prompt: effectivePrompt, options, creationId });

      setState((prev) => ({ ...prev, isProcessing: false }));

      // Return result based on state
      if (orchestrator.error) {
        return { success: false, error: orchestrator.error.message };
      }

      return orchestrator.result || { success: false, error: "No result" };
    },
    [state.prompt, callbacks, orchestrator],
  );

  const reset = useCallback(() => {
    setState(INITIAL_STATE);
    orchestrator.reset();
  }, [orchestrator]);

  const isReady = useMemo(() => state.prompt.trim().length > 0 && !state.isProcessing, [state.prompt, state.isProcessing]);
  const canGenerate = useMemo(() => isReady && !state.error, [isReady, state.error]);

  return { state, setPrompt, generate, reset, isReady, canGenerate };
}
