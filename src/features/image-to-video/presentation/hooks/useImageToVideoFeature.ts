/**
 * Image-to-Video Feature Hook
 * Provider-agnostic hook with callbacks integration
 */

import { useState, useCallback, useMemo } from "react";
import { executeImageToVideo } from "../../infrastructure/services";
import type {
  ImageToVideoFeatureState,
  ImageToVideoFeatureConfig,
  ImageToVideoResult,
  ImageToVideoFeatureCallbacks,
  ImageToVideoGenerateParams,
} from "../../domain/types";

declare const __DEV__: boolean;

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

const INITIAL_STATE: ImageToVideoFeatureState = {
  imageUri: null,
  motionPrompt: "",
  videoUrl: null,
  thumbnailUrl: null,
  isProcessing: false,
  progress: 0,
  error: null,
};

export function useImageToVideoFeature(
  props: UseImageToVideoFeatureProps,
): UseImageToVideoFeatureReturn {
  const { config, callbacks, userId } = props;
  const [state, setState] = useState<ImageToVideoFeatureState>(INITIAL_STATE);

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

  const executeGeneration = useCallback(
    async (
      imageUri: string,
      motionPrompt: string,
      options?: Omit<ImageToVideoGenerateParams, "imageUri" | "motionPrompt">,
    ): Promise<ImageToVideoResult> => {
      const creationId = `image-to-video_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`;

      setState((prev) => ({
        ...prev,
        imageUri,
        isProcessing: true,
        progress: 0,
        error: null,
      }));

      if (typeof __DEV__ !== "undefined" && __DEV__) {
         
        console.log("[ImageToVideoFeature] Starting generation, creationId:", creationId);
      }

      config.onProcessingStart?.();

      if (callbacks?.onGenerationStart) {
        callbacks.onGenerationStart({
          creationId,
          type: "image-to-video",
          imageUri,
          metadata: options as Record<string, unknown> | undefined,
        }).catch((err) => {
          if (typeof __DEV__ !== "undefined" && __DEV__) {
             
            console.warn("[ImageToVideoFeature] onGenerationStart failed:", err);
          }
        });
      }

      try {
        const imageBase64 = await config.prepareImage(imageUri);

        if (typeof __DEV__ !== "undefined" && __DEV__) {
           
          console.log("[ImageToVideoFeature] Image prepared, calling executeImageToVideo");
        }

        const result = await executeImageToVideo(
          {
            imageUri,
            imageBase64,
            userId,
            motionPrompt: motionPrompt || undefined,
            options,
          },
          {
            model: config.model,
            buildInput: config.buildInput,
            extractResult: config.extractResult,
            onProgress: (progress) => {
              setState((prev) => ({ ...prev, progress }));
              callbacks?.onProgress?.(progress);
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

          if (callbacks?.onCreditDeduct && config.creditCost) {
            await callbacks.onCreditDeduct(config.creditCost);
          }

          if (callbacks?.onCreationSave) {
            await callbacks.onCreationSave({
              creationId,
              type: "image-to-video",
              videoUrl: result.videoUrl,
              thumbnailUrl: result.thumbnailUrl,
              imageUri,
              metadata: options as Record<string, unknown> | undefined,
            });
          }

          callbacks?.onGenerate?.(result);
        } else {
          const error = result.error || "Generation failed";
          setState((prev) => ({ ...prev, isProcessing: false, error }));
          config.onError?.(error);
          callbacks?.onError?.(error);
        }

        config.onProcessingComplete?.(result);
        return result;
      } catch (err) {
        const errorMessage = err instanceof Error ? err.message : String(err);
        if (typeof __DEV__ !== "undefined" && __DEV__) {
           
          console.error("[ImageToVideoFeature] Generation error:", errorMessage);
        }
        setState((prev) => ({
          ...prev,
          isProcessing: false,
          error: errorMessage,
        }));
        config.onError?.(errorMessage);
        callbacks?.onError?.(errorMessage);
        return { success: false, error: errorMessage };
      }
    },
    [userId, config, callbacks],
  );

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
        if (typeof __DEV__ !== "undefined" && __DEV__) {
           
          console.log("[ImageToVideoFeature] Generate failed: Image is required");
        }
        return { success: false, error };
      }

      if (paramImageUri) {
        setState((prev) => ({ ...prev, imageUri: paramImageUri }));
      }

      if (callbacks?.onAuthCheck && !callbacks.onAuthCheck()) {
        if (typeof __DEV__ !== "undefined" && __DEV__) {
           
          console.log("[ImageToVideoFeature] Generate failed: Authentication required");
        }
        return { success: false, error: "Authentication required" };
      }

      if (callbacks?.onCreditCheck && config.creditCost) {
        const hasCredits = await callbacks.onCreditCheck(config.creditCost);
        if (!hasCredits) {
          callbacks?.onShowPaywall?.(config.creditCost);
          if (typeof __DEV__ !== "undefined" && __DEV__) {
             
            console.log("[ImageToVideoFeature] Generate failed: Insufficient credits");
          }
          return { success: false, error: "Insufficient credits" };
        }
      }

      return executeGeneration(effectiveImageUri, effectiveMotionPrompt, options);
    },
    [state.imageUri, state.motionPrompt, callbacks, config.creditCost, executeGeneration],
  );

  const reset = useCallback(() => {
    setState(INITIAL_STATE);
  }, []);

  const isReady = useMemo(
    () => state.imageUri !== null && !state.isProcessing,
    [state.imageUri, state.isProcessing],
  );

  const canGenerate = useMemo(
    () => isReady && !state.error,
    [isReady, state.error],
  );

  return { state, setImageUri, setMotionPrompt, generate, reset, isReady, canGenerate };
}
