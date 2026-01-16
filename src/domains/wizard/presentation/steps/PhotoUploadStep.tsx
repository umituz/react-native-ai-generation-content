/**
 * Generic Photo Upload Step
 * Used by ALL features that need photo uploads
 * (couple, face-swap, image-to-video, etc.)
 */

import React from "react";
import type { PhotoUploadStepConfig } from "../../domain/entities/wizard-config.types";

// Use wizard domain's generic photo upload screen - NO feature-specific references!
import { GenericPhotoUploadScreen } from "../screens/GenericPhotoUploadScreen";
import type { UploadedImage } from "../../../../features/partner-upload/domain/types";

export interface PhotoUploadStepProps {
  readonly config: PhotoUploadStepConfig;
  readonly onContinue: (image: UploadedImage) => void;
  readonly onBack: () => void;
  readonly t: (key: string) => string;
  readonly translations?: Record<string, string>;
}

export const PhotoUploadStep: React.FC<PhotoUploadStepProps> = ({
  config,
  onContinue,
  onBack,
  t,
  translations,
}) => {
  if (typeof __DEV__ !== "undefined" && __DEV__) {
    console.log("[PhotoUploadStep] Rendering", {
      stepId: config.id,
      label: config.label,
    });
  }

  return (
    <GenericPhotoUploadScreen
      translations={{
        title: config.titleKey ? t(config.titleKey) : config.label || "Upload Photo",
        subtitle: config.subtitleKey ? t(config.subtitleKey) : t("photoUpload.subtitle"),
        continue: t("common.continue"),
        tapToUpload: t("photoUpload.tapToUpload"),
        selectPhoto: t("photoUpload.selectPhoto"),
        change: t("common.change"),
        analyzing: t("photoUpload.analyzing"),
        fileTooLarge: t("common.errors.file_too_large"),
        maxFileSize: t("common.errors.max_file_size"),
        error: t("common.error"),
        uploadFailed: t("common.errors.upload_failed"),
        aiDisclosure: t("photoUpload.aiDisclosure"),
      }}
      t={t}
      config={{
        showFaceDetection: config.showFaceDetection ?? false,
        showPhotoTips: config.showPhotoTips ?? true,
        maxFileSizeMB: config.maxFileSizeMB ?? 10,
      }}
      onBack={onBack}
      onContinue={(image) => {
        if (typeof __DEV__ !== "undefined" && __DEV__) {
          console.log("[PhotoUploadStep] Photo uploaded", { stepId: config.id });
        }
        onContinue(image);
      }}
    />
  );
};
