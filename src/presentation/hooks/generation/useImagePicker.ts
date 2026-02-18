/**
 * useImagePicker Hook
 * Reusable hook for picking and preparing images with base64 conversion
 */

import { useState, useCallback } from "react";
import { MediaPickerService, MediaQuality } from "@umituz/react-native-design-system";
import { prepareImage } from "../../../infrastructure/utils/feature-utils";


export interface ImagePickerState {
  readonly uri: string | null;
  readonly base64: string | null;
}

export interface UseImagePickerOptions {
  readonly aspect?: [number, number];
  readonly onError?: (error: Error) => void;
}

export interface UseImagePickerReturn {
  readonly uri: string | null;
  readonly base64: string | null;
  readonly isLoading: boolean;
  pick(): Promise<void>;
  reset(): void;
}

export const useImagePicker = (options: UseImagePickerOptions = {}): UseImagePickerReturn => {
  const { aspect = [1, 1], onError } = options;

  const [uri, setUri] = useState<string | null>(null);
  const [base64, setBase64] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const pick = useCallback(async () => {
    try {
      setIsLoading(true);
      const result = await MediaPickerService.pickSingleImage({
        allowsEditing: true,
        quality: MediaQuality.HIGH,
        aspect,
      });

      if (!result.canceled && result.assets?.[0]) {
        const asset = result.assets[0];
        setUri(asset.uri);
        const preparedBase64 = await prepareImage(asset.uri);
        setBase64(preparedBase64);
      }
    } catch (error) {
      if (typeof __DEV__ !== "undefined" && __DEV__) {
        console.error("[useImagePicker] Error:", error);
      }
      onError?.(error as Error);
    } finally {
      setIsLoading(false);
    }
  }, [aspect, onError]);

  const reset = useCallback(() => {
    setUri(null);
    setBase64(null);
    setIsLoading(false);
  }, []);

  return {
    uri,
    base64,
    isLoading,
    pick,
    reset,
  };
};
