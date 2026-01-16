/**
 * Generic Photo Upload State Hook
 * Manages photo upload state for wizard steps
 * NO feature-specific logic - works for ANY photo upload
 */

import { useState, useCallback } from "react";
import * as ImagePicker from "expo-image-picker";
import { Alert } from "react-native";
import type { UploadedImage } from "../../../../../presentation/hooks/generation/useAIGenerateState";

export interface PhotoUploadConfig {
  readonly maxFileSizeMB?: number;
}

export interface PhotoUploadTranslations {
  readonly fileTooLarge: string;
  readonly maxFileSize: string;
  readonly error: string;
  readonly uploadFailed: string;
}

export interface UsePhotoUploadStateProps {
  readonly config?: PhotoUploadConfig;
  readonly translations: PhotoUploadTranslations;
}

export interface UsePhotoUploadStateReturn {
  readonly image: UploadedImage | null;
  readonly handlePickImage: () => Promise<void>;
  readonly canContinue: boolean;
}

const DEFAULT_MAX_FILE_SIZE_MB = 10;

export const usePhotoUploadState = ({
  config,
  translations,
}: UsePhotoUploadStateProps): UsePhotoUploadStateReturn => {
  const [image, setImage] = useState<UploadedImage | null>(null);

  const maxFileSizeMB = config?.maxFileSizeMB ?? DEFAULT_MAX_FILE_SIZE_MB;

  const handlePickImage = useCallback(async () => {
    try {
      // Request permission
      const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (status !== "granted") {
        Alert.alert(translations.error, "Permission to access media library is required");
        return;
      }

      // Pick image
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: "images" as any,
        allowsEditing: true,
        aspect: [1, 1],
        quality: 0.8,
      });

      if (result.canceled) {
        return;
      }

      const selectedAsset = result.assets[0];
      if (!selectedAsset) {
        return;
      }

      // Check file size
      const fileSize = selectedAsset.fileSize || 0;
      const fileSizeMB = fileSize / (1024 * 1024);

      if (fileSizeMB > maxFileSizeMB) {
        Alert.alert(
          translations.fileTooLarge,
          translations.maxFileSize.replace("{size}", maxFileSizeMB.toString()),
        );
        return;
      }

      // Create uploaded image object
      const uploadedImage: UploadedImage = {
        uri: selectedAsset.uri,
        previewUrl: selectedAsset.uri,
        width: selectedAsset.width,
        height: selectedAsset.height,
        fileSize,
      };

      setImage(uploadedImage);

      if (typeof __DEV__ !== "undefined" && __DEV__) {
        console.log("[usePhotoUploadState] Image selected", {
          width: uploadedImage.width,
          height: uploadedImage.height,
          fileSizeMB: fileSizeMB.toFixed(2),
        });
      }
    } catch (error) {
      if (typeof __DEV__ !== "undefined" && __DEV__) {
        console.error("[usePhotoUploadState] Error picking image", error);
      }
      Alert.alert(translations.error, translations.uploadFailed);
    }
  }, [maxFileSizeMB, translations]);

  const canContinue = image !== null;

  return {
    image,
    handlePickImage,
    canContinue,
  };
};
