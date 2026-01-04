/**
 * usePhotoRestoreFeature Hook
 * Manages photo restore feature state and actions
 */

import { useState, useCallback, useRef } from "react";
import { generateUUID } from "@umituz/react-native-uuid";
import { executeImageFeature } from "../../../../infrastructure/services";
import type {
  PhotoRestoreFeatureState,
  PhotoRestoreFeatureConfig,
  PhotoRestoreResult,
} from "../../domain/types";

export interface UsePhotoRestoreFeatureProps {
  config: PhotoRestoreFeatureConfig;
  onSelectImage: () => Promise<string | null>;
  onSaveImage: (imageUrl: string) => Promise<void>;
  onBeforeProcess?: () => Promise<boolean>;
}

export interface UsePhotoRestoreFeatureReturn extends PhotoRestoreFeatureState {
  selectImage: () => Promise<void>;
  process: () => Promise<void>;
  save: () => Promise<void>;
  reset: () => void;
}

const initialState: PhotoRestoreFeatureState = {
  imageUri: null,
  processedUrl: null,
  isProcessing: false,
  progress: 0,
  error: null,
};

export function usePhotoRestoreFeature(
  props: UsePhotoRestoreFeatureProps,
): UsePhotoRestoreFeatureReturn {
  const { config, onSelectImage, onSaveImage, onBeforeProcess } = props;
  const [state, setState] = useState<PhotoRestoreFeatureState>(initialState);
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

      const result = await executeImageFeature(
        "photo-restore",
        { imageBase64 },
        { extractResult: config.extractResult, onProgress: handleProgress },
      );

      if (result.success && result.imageUrl) {
        setState((prev) => ({
          ...prev,
          isProcessing: false,
          processedUrl: result.imageUrl!,
          progress: 100,
        }));
        config.onProcessingComplete?.({ ...result, creationId } as PhotoRestoreResult & { creationId?: string });
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
  }, [state.imageUri, config, handleProgress, onBeforeProcess]);

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
    setState(initialState);
  }, []);

  return {
    ...state,
    selectImage,
    process,
    save,
    reset,
  };
}
