/**
 * PhotoRestoreFeature Component
 * Self-contained photo restore feature UI component
 * Uses centralized SingleImageFeatureLayout for consistent UX
 */

import React, { useMemo } from "react";
import { PhotoUploadCard } from "../../../../presentation/components/PhotoUploadCard";
import { SingleImageFeatureLayout } from "../../../../presentation/layouts";
import type { ProcessingModalRenderProps } from "../../../../presentation/layouts";
import { PhotoRestoreResultView } from "./PhotoRestoreResultView";
import { usePhotoRestoreFeature } from "../hooks";
import type {
  PhotoRestoreTranslations,
  PhotoRestoreFeatureConfig,
} from "../../domain/types";

export interface PhotoRestoreFeatureProps {
  config: PhotoRestoreFeatureConfig;
  translations: PhotoRestoreTranslations & {
    modalTitle?: string;
    modalMessage?: string;
    modalHint?: string;
    modalBackgroundHint?: string;
  };
  onSelectImage: () => Promise<string | null>;
  onSaveImage: (imageUrl: string) => Promise<void>;
  onBeforeProcess?: () => Promise<boolean>;
  renderProcessingModal?: (props: ProcessingModalRenderProps) => React.ReactNode;
}

export const PhotoRestoreFeature: React.FC<PhotoRestoreFeatureProps> = ({
  config,
  translations,
  onSelectImage,
  onSaveImage,
  onBeforeProcess,
  renderProcessingModal,
}) => {
  const feature = usePhotoRestoreFeature({
    config,
    onSelectImage,
    onSaveImage,
    onBeforeProcess,
  });

  const modalTranslations = useMemo(
    () => ({
      title: translations.modalTitle || "Processing",
      message: translations.modalMessage || "AI is restoring your photo...",
      hint: translations.modalHint || "This may take a moment",
      backgroundHint: translations.modalBackgroundHint || "Continue in background",
    }),
    [translations],
  );

  return (
    <SingleImageFeatureLayout
      feature={feature}
      translations={translations}
      modalTranslations={modalTranslations}
      renderProcessingModal={renderProcessingModal}
      renderInput={({ imageUri, onSelect, isDisabled, isProcessing }) => (
        <PhotoUploadCard
          imageUri={imageUri}
          onPress={onSelect}
          isValidating={isProcessing}
          disabled={isDisabled}
          translations={{
            tapToUpload: translations.uploadTitle,
            selectPhoto: translations.uploadSubtitle,
            change: translations.uploadChange,
            analyzing: translations.uploadAnalyzing,
          }}
          config={{
            aspectRatio: 1,
            borderRadius: 24,
            showValidationStatus: false,
            allowChange: true,
          }}
        />
      )}
      renderCustomResult={({ processedUrl, originalImageUri, onSave, onReset }) => (
        <PhotoRestoreResultView
          originalUri={originalImageUri}
          processedUri={processedUrl}
          translations={{
            successText: translations.successText,
            saveButtonText: translations.saveButtonText,
            tryAnotherText: translations.tryAnotherText,
            beforeLabel: translations.beforeLabel,
            afterLabel: translations.afterLabel,
          }}
          onSave={onSave}
          onReset={onReset}
        />
      )}
    />
  );
};
