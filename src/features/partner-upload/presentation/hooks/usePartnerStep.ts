/**
 * usePartnerStep Hook
 * Manages partner photo upload step logic
 */

import { useState, useCallback } from "react";
import { Alert } from "react-native";
import { useMedia, MediaLibraryPermission, readFileAsBase64 } from "@umituz/react-native-design-system";
import type { UploadedImage } from "../../domain/types";

export interface UsePartnerStepConfig {
  readonly maxFileSizeMB?: number;
  readonly imageQuality?: number;
  readonly allowsEditing?: boolean;
}

export interface UsePartnerStepTranslations {
  readonly fileTooLarge: string;
  readonly maxFileSize: string;
  readonly error: string;
  readonly uploadFailed: string;
  readonly permissionDenied?: string;
  readonly permissionRequired?: string;
}

export interface UsePartnerStepOptions {
  readonly initialName?: string;
  readonly config?: UsePartnerStepConfig;
  readonly translations: UsePartnerStepTranslations;
}

interface PartnerStepState {
  image: UploadedImage | null;
  name: string;
  description: string;
}

const DEFAULT_CONFIG: UsePartnerStepConfig = {
  maxFileSizeMB: 10,
  imageQuality: 0.7,
  allowsEditing: true,
};

export const usePartnerStep = (options: UsePartnerStepOptions) => {
  const { initialName = "", config = DEFAULT_CONFIG, translations } = options;
  const { pickImage, requestMediaLibraryPermission, getMediaLibraryPermissionStatus, isLoading: isPickerLoading } = useMedia();

  const [state, setState] = useState<PartnerStepState>({
    image: null,
    name: initialName,
    description: "",
  });

  const setName = useCallback((name: string) => {
    setState((prev) => ({ ...prev, name }));
  }, []);

  const setDescription = useCallback((description: string) => {
    setState((prev) => ({ ...prev, description }));
  }, []);

  const handlePickImage = useCallback(async () => {
    try {
      // Check permission first
      let permission = await getMediaLibraryPermissionStatus();
      if (permission !== MediaLibraryPermission.GRANTED) {
        permission = await requestMediaLibraryPermission();
        if (permission !== MediaLibraryPermission.GRANTED) {
          Alert.alert(
            translations.error,
            translations.permissionDenied ?? "Photo library access is required to upload images.",
          );
          return;
        }
      }

      const maxFileSizeMB = config.maxFileSizeMB ?? 10;
      const result = await pickImage({
        allowsEditing: config.allowsEditing ?? true,
        quality: config.imageQuality ?? 0.7,
      });

      if (result.canceled || !result.assets?.[0]) return;

      const asset = result.assets[0];

      if (asset.fileSize && asset.fileSize > maxFileSizeMB * 1024 * 1024) {
        Alert.alert(
          translations.fileTooLarge,
          translations.maxFileSize.replace("{size}", String(maxFileSizeMB)),
        );
        return;
      }

      const base64 = await readFileAsBase64(asset.uri);
      if (!base64) {
        Alert.alert(translations.error, translations.uploadFailed);
        return;
      }

      const uploadedImage: UploadedImage = {
        uri: asset.uri,
        previewUrl: asset.uri,
        base64: `data:image/jpeg;base64,${base64}`,
        width: asset.width,
        height: asset.height,
      };

      setState((prev) => ({
        ...prev,
        image: uploadedImage,
      }));
    } catch {
      Alert.alert(translations.error, translations.uploadFailed);
    }
  }, [config, translations, pickImage, requestMediaLibraryPermission, getMediaLibraryPermissionStatus]);

  const canContinue = state.image !== null;

  return {
    ...state,
    setName,
    setDescription,
    handlePickImage,
    canContinue,
    isLoading: isPickerLoading,
  };
};

export type UsePartnerStepReturn = ReturnType<typeof usePartnerStep>;
