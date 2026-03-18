/**
 * Generic Photo Upload State Hook
 * Manages photo upload state for wizard steps
 * Uses design system's useMedia hook for media picking with built-in validation
 */

import { useState } from "react";
import type { UsePhotoUploadStateProps, UsePhotoUploadStateReturn } from "./types";
import { usePhotoUploadStateLogic } from "./usePhotoUploadStateLogic";

export const usePhotoUploadState = ({
  config,
  translations,
  initialImage,
  stepId,
  onError,
}: UsePhotoUploadStateProps): UsePhotoUploadStateReturn => {
  const [image, setImage] = useState<UploadedImage | null>(initialImage || null);

  const { handlePickImage, clearImage, isLoading } = usePhotoUploadStateLogic(
    config,
    translations,
    initialImage,
    stepId,
    onError,
    setImage,
  );

  const canContinue = image !== null && !isLoading;

  return {
    image,
    handlePickImage,
    canContinue,
    clearImage,
  };
};

export type { PhotoUploadConfig, PhotoUploadTranslations, PhotoUploadError, UsePhotoUploadStateProps, UsePhotoUploadStateReturn } from "./types";
