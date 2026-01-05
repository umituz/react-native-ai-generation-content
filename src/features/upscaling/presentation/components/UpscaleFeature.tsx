/**
 * UpscaleFeature Component
 * Self-contained upscale feature UI component
 * Uses centralized SingleImageFeatureLayout for consistent UX
 */

import React, { useMemo } from "react";
import { PhotoUploadCard } from "../../../../presentation/components/PhotoUploadCard";
import { SingleImageFeatureLayout } from "../../../../presentation/layouts";
import type { ProcessingModalRenderProps } from "../../../../presentation/layouts";
import { UpscaleResultView } from "./UpscaleResultView";
import { useUpscaleFeature } from "../hooks";
import type {
  UpscaleTranslations,
  UpscaleFeatureConfig,
} from "../../domain/types";

export interface UpscaleFeatureProps {
  config: UpscaleFeatureConfig;
  translations: UpscaleTranslations & {
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

export const UpscaleFeature: React.FC<UpscaleFeatureProps> = ({
  config,
  translations,
  onSelectImage,
  onSaveImage,
  onBeforeProcess,
  renderProcessingModal,
}) => {
  const feature = useUpscaleFeature({
    config,
    onSelectImage,
    onSaveImage,
    onBeforeProcess,
  });

  const modalTranslations = useMemo(
    () => ({
      title: translations.modalTitle || "Processing",
      message: translations.modalMessage || "AI is upscaling your image...",
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
      description={translations.description}
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
        <UpscaleResultView
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
