/**
 * Image-to-Video Feature Hook
 * Uses centralized useGenerationOrchestrator for consistent auth, credits, and error handling
 */

import { useState, useCallback, useMemo } from "react";
import {
  useGenerationOrchestrator,
  type GenerationStrategy,
  type AlertMessages,
} from "../../../../presentation/hooks/generation";
import { executeImageToVideo } from "../../infrastructure/services";
import type {
  ImageToVideoFeatureState,
  ImageToVideoFeatureConfig,
  ImageToVideoResult,
  ImageToVideoFeatureCallbacks,
  ImageToVideoGenerateParams,
} from "../../domain/types";

declare const __DEV__: boolean;

const INITIAL_STATE: ImageToVideoFeatureState = {
  imageUri: null,
  motionPrompt: "",
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

export interface UseImageToVideoFeatureProps {
  config: ImageToVideoFeatureConfig;
  callbacks?: ImageToVideoFeatureCallbacks;
  userId: string;
}

export interface UseImageToVideoFeatureReturn {
  state: ImageToVideoFeatureState;
  setImageUri: (uri: string) => void;
  setMotionPrompt: (prompt: string) => void;
  generate: (params?: ImageToVideoGenerateParams) => Promise<ImageToVideoResult>;
  reset: () => void;
  isReady: boolean;
  canGenerate: boolean;
}

interface VideoGenerationInput {
  imageUri: string;
  imageBase64: string;
  motionPrompt: string;
  options?: Omit<ImageToVideoGenerateParams, "imageUri" | "motionPrompt">;
  creationId: string;
}

function generateCreationId(): string {
  return `image-to-video_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`;
}

export function useImageToVideoFeature(props: UseImageToVideoFeatureProps): UseImageToVideoFeatureReturn {
  const { config, callbacks, userId } = props;
  const [state, setState] = useState<ImageToVideoFeatureState>(INITIAL_STATE);

  const strategy: GenerationStrategy<VideoGenerationInput, ImageToVideoResult> = useMemo(
    () => ({
      execute: async (input) => {
        if (typeof __DEV__ !== "undefined" && __DEV__) {
          console.log("[ImageToVideo] Executing generation, creationId:", input.creationId);
        }

        config.onProcessingStart?.();

        callbacks?.onGenerationStart?.({
          creationId: input.creationId,
          type: "image-to-video",
          imageUri: input.imageUri,
          metadata: input.options as Record<string, unknown> | undefined,
        }).catch(() => {});

        const result = await executeImageToVideo(
          {
            imageUri: input.imageUri,
            imageBase64: input.imageBase64,
            userId,
            motionPrompt: input.motionPrompt || undefined,
            options: input.options,
          },
          {
            model: config.model,
            buildInput: config.buildInput,
            extractResult: config.extractResult,
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
      getCreditCost: () => config.creditCost ?? 0,
      save: async (result) => {
        if (result.success && result.videoUrl && state.imageUri) {
          await callbacks?.onCreationSave?.({
            creationId: generateCreationId(),
            type: "image-to-video",
            videoUrl: result.videoUrl,
            thumbnailUrl: result.thumbnailUrl,
            imageUri: state.imageUri,
          });
        }
      },
    }),
    [config, callbacks, userId, state.imageUri],
  );

  const orchestrator = useGenerationOrchestrator(strategy, {
    userId,
    alertMessages: DEFAULT_ALERT_MESSAGES,
    onCreditsExhausted: () => callbacks?.onShowPaywall?.(config.creditCost ?? 0),
    onSuccess: (result) => {
      const videoResult = result as ImageToVideoResult;
      callbacks?.onGenerate?.(videoResult);
      config.onProcessingComplete?.(videoResult);
    },
    onError: (err) => {
      callbacks?.onError?.(err.message);
      config.onError?.(err.message);
    },
  });

  const setImageUri = useCallback(
    (uri: string) => {
      setState((prev) => ({ ...prev, imageUri: uri, error: null }));
      config.onImageSelect?.(uri);
    },
    [config],
  );

  const setMotionPrompt = useCallback((prompt: string) => {
    setState((prev) => ({ ...prev, motionPrompt: prompt }));
  }, []);

  const generate = useCallback(
    async (params?: ImageToVideoGenerateParams): Promise<ImageToVideoResult> => {
      const { imageUri: paramImageUri, motionPrompt: paramMotionPrompt, ...options } = params || {};
      const effectiveImageUri = paramImageUri || state.imageUri;
      const effectiveMotionPrompt = paramMotionPrompt ?? state.motionPrompt;

      if (typeof __DEV__ !== "undefined" && __DEV__) {
        console.log("[ImageToVideoFeature] generate called, hasImage:", !!effectiveImageUri);
      }

      if (!effectiveImageUri) {
        const error = "Image is required";
        setState((prev) => ({ ...prev, error }));
        callbacks?.onError?.(error);
        return { success: false, error };
      }

      if (paramImageUri) {
        setState((prev) => ({ ...prev, imageUri: paramImageUri }));
      }

      setState((prev) => ({ ...prev, isProcessing: true, error: null, progress: 0 }));

      try {
        const imageBase64 = await config.prepareImage(effectiveImageUri);

        const input: VideoGenerationInput = {
          imageUri: effectiveImageUri,
          imageBase64,
          motionPrompt: effectiveMotionPrompt,
          options,
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
    [state.imageUri, state.motionPrompt, state.videoUrl, config, callbacks, orchestrator],
  );

  const reset = useCallback(() => {
    setState(INITIAL_STATE);
  }, []);

  const isReady = useMemo(() => state.imageUri !== null && !state.isProcessing, [state.imageUri, state.isProcessing]);
  const canGenerate = useMemo(() => isReady && !state.error, [isReady, state.error]);

  return { state, setImageUri, setMotionPrompt, generate, reset, isReady, canGenerate };
}
