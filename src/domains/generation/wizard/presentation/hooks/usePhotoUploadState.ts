/**
 * Generic Photo Upload State Hook
 * Manages photo upload state for wizard steps
 * Uses design system's useMedia hook for media picking with built-in validation
 */

import { useState, useCallback, useEffect } from "react";
import { useMedia, MediaQuality, MediaValidationError, MEDIA_CONSTANTS } from "@umituz/react-native-design-system";
import type { UploadedImage } from "../../../../../presentation/hooks/generation/useAIGenerateState";

export interface PhotoUploadConfig {
  readonly maxFileSizeMB?: number;
}

export interface PhotoUploadTranslations {
  readonly fileTooLarge: string;
  readonly maxFileSize: string;
  readonly error: string;
  readonly uploadFailed: string;
  readonly permissionDenied?: string;
}

export interface PhotoUploadError {
  readonly title: string;
  readonly message: string;
}

export interface UsePhotoUploadStateProps {
  readonly config?: PhotoUploadConfig;
  readonly translations: PhotoUploadTranslations;
  readonly initialImage?: UploadedImage;
  readonly stepId?: string;
  readonly onError?: (error: PhotoUploadError) => void;
}

export interface UsePhotoUploadStateReturn {
  readonly image: UploadedImage | null;
  readonly handlePickImage: () => Promise<void>;
  readonly canContinue: boolean;
  readonly clearImage: () => void;
}

export const usePhotoUploadState = ({
  config,
  translations,
  initialImage,
  stepId,
  onError,
}: UsePhotoUploadStateProps): UsePhotoUploadStateReturn => {
  const [image, setImage] = useState<UploadedImage | null>(initialImage || null);
  const { pickImage, isLoading } = useMedia();

  const maxFileSizeMB = config?.maxFileSizeMB ?? MEDIA_CONSTANTS.MAX_IMAGE_SIZE_MB;

  // Reset state when stepId changes (new step = new photo)
  useEffect(() => {
    if (typeof __DEV__ !== "undefined" && __DEV__) {
      console.log("[usePhotoUploadState] Step changed, resetting image", { stepId, hasInitialImage: !!initialImage });
    }
    setImage(initialImage || null);
  }, [stepId, initialImage]);

  const clearImage = useCallback(() => {
    setImage(null);
  }, []);

  const handlePickImage = useCallback(async () => {
    try {
      const result = await pickImage({
        allowsEditing: true,
        aspect: [1, 1],
        quality: MediaQuality.MEDIUM,
        maxFileSizeMB,
      });

      // Handle validation errors from design system
      if (result.error) {
        if (result.error === MediaValidationError.FILE_TOO_LARGE) {
          onError?.({
            title: translations.fileTooLarge,
            message: translations.maxFileSize.replace("{size}", maxFileSizeMB.toString()),
          });
        } else if (result.error === MediaValidationError.PERMISSION_DENIED) {
          onError?.({
            title: translations.error,
            message: translations.permissionDenied ?? "Permission to access media library is required",
          });
        }
        return;
      }

      if (result.canceled || !result.assets || result.assets.length === 0) {
        return;
      }

      const selectedAsset = result.assets[0];
      if (!selectedAsset) {
        return;
      }

      const uploadedImage: UploadedImage = {
        uri: selectedAsset.uri,
        previewUrl: selectedAsset.uri,
        width: selectedAsset.width,
        height: selectedAsset.height,
        fileSize: selectedAsset.fileSize,
      };

      setImage(uploadedImage);

      if (typeof __DEV__ !== "undefined" && __DEV__) {
        const fileSizeMB = (selectedAsset.fileSize ?? 0) / (1024 * 1024);
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
      onError?.({
        title: translations.error,
        message: translations.uploadFailed,
      });
    }
  }, [pickImage, maxFileSizeMB, translations, onError]);

  const canContinue = image !== null && !isLoading;

  return {
    image,
    handlePickImage,
    canContinue,
    clearImage,
  };
};
