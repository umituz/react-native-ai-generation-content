/**
 * useGenerationExecution Hook
 * Handles the core generation execution logic for image-to-video
 */

import { useCallback } from "react";
import { executeImageToVideo } from "../../infrastructure/services";
import type {
  ImageToVideoFeatureConfig,
  ImageToVideoFeatureCallbacks,
  ImageToVideoResult,
  ImageToVideoGenerateParams,
} from "../../domain/types";

declare const __DEV__: boolean;

interface UseGenerationExecutionParams {
  userId: string;
  config: ImageToVideoFeatureConfig;
  callbacks?: ImageToVideoFeatureCallbacks;
  setState: React.Dispatch<React.SetStateAction<any>>;
}

export function useGenerationExecution({
  userId,
  config,
  callbacks,
  setState,
}: UseGenerationExecutionParams) {
  return useCallback(
    async (
      imageUri: string,
      motionPrompt: string,
      options?: Omit<ImageToVideoGenerateParams, "imageUri" | "motionPrompt">,
    ): Promise<ImageToVideoResult> => {
      const creationId = `image-to-video_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`;

      setState((prev: any) => ({
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
              setState((prev: any) => ({ ...prev, progress }));
              callbacks?.onProgress?.(progress);
            },
          },
        );

        if (result.success && result.videoUrl) {
          setState((prev: any) => ({
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
          setState((prev: any) => ({ ...prev, isProcessing: false, error }));
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
        setState((prev: any) => ({
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
}
