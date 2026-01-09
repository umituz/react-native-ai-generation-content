/**
 * usePartnerStep Hook
 * Manages partner photo upload step logic
 */

import { useState, useCallback } from "react";
import { Alert } from "react-native";
import * as ImagePicker from "expo-image-picker";
import * as FileSystem from "expo-file-system";
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
      const maxFileSizeMB = config.maxFileSizeMB ?? 10;
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
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

      const base64 = await FileSystem.readAsStringAsync(asset.uri, {
        encoding: "base64",
      });

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
  }, [config, translations]);

  const canContinue = state.image !== null;

  return {
    ...state,
    setName,
    setDescription,
    handlePickImage,
    canContinue,
  };
};

export type UsePartnerStepReturn = ReturnType<typeof usePartnerStep>;
