/**
 * Image-to-Video Feature Hook
 * Provider-agnostic hook for image-to-video generation
 */

import { useState, useCallback } from "react";
import { executeImageToVideo } from "../../infrastructure/services";
import type {
  ImageToVideoFeatureState,
  ImageToVideoFeatureConfig,
  ImageToVideoResult,
  ImageToVideoOptions,
} from "../../domain/types";

export interface UseImageToVideoFeatureProps {
  config: ImageToVideoFeatureConfig;
  userId: string;
}

export interface UseImageToVideoFeatureReturn {
  state: ImageToVideoFeatureState;
  setImageUri: (uri: string) => void;
  setMotionPrompt: (prompt: string) => void;
  generate: (options?: ImageToVideoOptions) => Promise<ImageToVideoResult>;
  reset: () => void;
  isReady: boolean;
}

const initialState: ImageToVideoFeatureState = {
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
  const { config, userId } = props;
  const [state, setState] = useState<ImageToVideoFeatureState>(initialState);

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
    async (options?: ImageToVideoOptions): Promise<ImageToVideoResult> => {
      if (!state.imageUri) {
        const error = "Image is required";
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

      const imageBase64 = await config.prepareImage(state.imageUri);

      const result = await executeImageToVideo(
        {
          imageUri: state.imageUri,
          imageBase64,
          userId,
          motionPrompt: state.motionPrompt || undefined,
          options,
        },
        {
          model: config.model,
          buildInput: config.buildInput,
          extractResult: config.extractResult,
          onProgress: (progress) => {
            setState((prev) => ({ ...prev, progress }));
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
      } else {
        const error = result.error || "Generation failed";
        setState((prev) => ({ ...prev, isProcessing: false, error }));
        config.onError?.(error);
      }

      config.onProcessingComplete?.(result);
      return result;
    },
    [state.imageUri, state.motionPrompt, userId, config],
  );

  const reset = useCallback(() => {
    setState(initialState);
  }, []);

  const isReady = state.imageUri !== null && !state.isProcessing;

  return { state, setImageUri, setMotionPrompt, generate, reset, isReady };
}
