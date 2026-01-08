/**
 * useSingleImageFeature Hook Factory
 * Base hook for single image processing features
 */

import { useState, useCallback, useRef } from "react";
import { generateUUID } from "@umituz/react-native-design-system";
import { executeImageFeature } from "../../../../infrastructure/services";
import type {
  BaseSingleImageState,
  BaseSingleImageHookProps,
  BaseSingleImageHookReturn,
  SingleImageConfig,
  BaseImageResult,
} from "../../domain/types";

const INITIAL_STATE: BaseSingleImageState = {
  imageUri: null,
  processedUrl: null,
  isProcessing: false,
  progress: 0,
  error: null,
};

export interface SingleImageFeatureOptions<TConfig extends SingleImageConfig> {
  buildInput?: (imageBase64: string, config: TConfig) => Record<string, unknown>;
}

export function useSingleImageFeature<
  TConfig extends SingleImageConfig = SingleImageConfig,
  TResult extends BaseImageResult = BaseImageResult,
>(
  props: BaseSingleImageHookProps<TConfig>,
  options?: SingleImageFeatureOptions<TConfig>,
): BaseSingleImageHookReturn {
  const { config, onSelectImage, onSaveImage, onBeforeProcess } = props;
  const [state, setState] = useState<BaseSingleImageState>(INITIAL_STATE);
  const creationIdRef = useRef<string | null>(null);

  const selectImage = useCallback(async () => {
    try {
      const uri = await onSelectImage();
      if (uri) {
        setState((prev) => ({ ...prev, imageUri: uri, error: null }));
        config.onImageSelect?.(uri);
      }
    } catch (error) {
      const message = error instanceof Error ? error.message : String(error);
      setState((prev) => ({ ...prev, error: message }));
    }
  }, [onSelectImage, config]);

  const handleProgress = useCallback((progress: number) => {
    setState((prev) => ({ ...prev, progress }));
  }, []);

  const process = useCallback(async () => {
    if (!state.imageUri) return;

    if (onBeforeProcess) {
      const canProceed = await onBeforeProcess();
      if (!canProceed) return;
    }

    const creationId = generateUUID();
    creationIdRef.current = creationId;

    setState((prev) => ({
      ...prev,
      isProcessing: true,
      progress: 0,
      error: null,
    }));

    config.onProcessingStart?.({ creationId, imageUri: state.imageUri });

    try {
      const imageBase64 = await config.prepareImage(state.imageUri);

      const input = options?.buildInput
        ? options.buildInput(imageBase64, config)
        : { imageBase64 };

      const result = await executeImageFeature(
        config.featureType,
        input,
        { extractResult: config.extractResult, onProgress: handleProgress },
      );

      if (result.success && result.imageUrl) {
        setState((prev) => ({
          ...prev,
          isProcessing: false,
          processedUrl: result.imageUrl!,
          progress: 100,
        }));
        config.onProcessingComplete?.({ ...result, creationId } as unknown as TResult);
      } else {
        const errorMessage = result.error || "Processing failed";
        setState((prev) => ({
          ...prev,
          isProcessing: false,
          error: errorMessage,
          progress: 0,
        }));
        config.onError?.(errorMessage, creationId);
      }
    } catch (error) {
      const message = error instanceof Error ? error.message : String(error);
      setState((prev) => ({
        ...prev,
        isProcessing: false,
        error: message,
        progress: 0,
      }));
      config.onError?.(message, creationIdRef.current ?? undefined);
    }
  }, [state.imageUri, config, options, handleProgress, onBeforeProcess]);

  const save = useCallback(async () => {
    if (!state.processedUrl) return;

    try {
      await onSaveImage(state.processedUrl);
    } catch (error) {
      const message = error instanceof Error ? error.message : String(error);
      setState((prev) => ({ ...prev, error: message }));
    }
  }, [state.processedUrl, onSaveImage]);

  const reset = useCallback(() => {
    setState(INITIAL_STATE);
  }, []);

  return {
    ...state,
    selectImage,
    process,
    save,
    reset,
  };
}
