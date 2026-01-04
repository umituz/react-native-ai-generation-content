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
        if (typeof __DEV__ !== "undefined" && __DEV__) {
          // eslint-disable-next-line no-console
          console.log("[TextToVideoFeature] Generate failed: Prompt is required");
        }
        return { success: false, error };
      }

      if (paramPrompt) {
        setState((prev) => ({ ...prev, prompt: effectivePrompt }));
      }

      if (callbacks.onAuthCheck && !callbacks.onAuthCheck()) {
        if (typeof __DEV__ !== "undefined" && __DEV__) {
          // eslint-disable-next-line no-console
          console.log("[TextToVideoFeature] Generate failed: Authentication required");
        }
        return { success: false, error: "Authentication required" };
      }

      if (callbacks.onCreditCheck && !(await callbacks.onCreditCheck(config.creditCost))) {
        callbacks.onShowPaywall?.(config.creditCost);
        if (typeof __DEV__ !== "undefined" && __DEV__) {
          // eslint-disable-next-line no-console
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
                const result = await executeGeneration(effectivePrompt, options);
                resolve(result);
              },
            );
          });
        }
      }

      return executeGeneration(effectivePrompt, options);
    },
    [state.prompt, callbacks, config.creditCost],
  );

  const executeGeneration = useCallback(
    async (prompt: string, options?: TextToVideoOptions): Promise<TextToVideoResult> => {
      // Generate unique creation ID for tracking
      const creationId = `text-to-video_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`;

      setState((prev) => ({
        ...prev,
        isProcessing: true,
        progress: 0,
        error: null,
      }));

      if (typeof __DEV__ !== "undefined" && __DEV__) {
        // eslint-disable-next-line no-console
        console.log("[TextToVideoFeature] Starting generation with prompt:", prompt, "creationId:", creationId);
      }

      // Create "processing" creation at start (fire-and-forget to not block generation)
      if (callbacks.onGenerationStart) {
        callbacks.onGenerationStart({
          creationId,
          type: "text-to-video",
          prompt,
          metadata: options as Record<string, unknown> | undefined,
        }).catch((err) => {
          if (typeof __DEV__ !== "undefined" && __DEV__) {
            // eslint-disable-next-line no-console
            console.warn("[TextToVideoFeature] onGenerationStart failed:", err);
          }
        });
      }

      if (typeof __DEV__ !== "undefined" && __DEV__) {
        // eslint-disable-next-line no-console
        console.log("[TextToVideoFeature] Starting executeTextToVideo...");
      }

      try {
        const result = await executeTextToVideo(
          { prompt, userId, options },
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

          // Deduct credits after successful generation
          if (callbacks.onCreditDeduct) {
            await callbacks.onCreditDeduct(config.creditCost);
          }

          // Update creation to completed after successful generation
          if (callbacks.onCreationSave) {
            await callbacks.onCreationSave({
              creationId,
              type: "text-to-video",
              videoUrl: result.videoUrl,
              thumbnailUrl: result.thumbnailUrl,
              prompt,
              metadata: options as Record<string, unknown> | undefined,
            });
          }

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
      } catch (err) {
        const errorMessage = err instanceof Error ? err.message : String(err);
        if (typeof __DEV__ !== "undefined" && __DEV__) {
          // eslint-disable-next-line no-console
          console.error("[TextToVideoFeature] Generation error:", errorMessage);
        }
        setState((prev) => ({
          ...prev,
          isProcessing: false,
          error: errorMessage,
        }));
        callbacks.onError?.(errorMessage);
        return { success: false, error: errorMessage };
      }
    },
    [userId, config.model, config.creditCost, buildInput, extractResult, callbacks],
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
