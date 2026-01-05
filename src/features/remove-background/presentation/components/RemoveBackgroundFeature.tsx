/**
 * RemoveBackgroundFeature Component
 * Self-contained remove background feature UI component
 * Uses centralized SingleImageFeatureLayout for consistent UX
 */

import React, { useMemo } from "react";
import { Image, StyleSheet } from "react-native";
import { PhotoUploadCard } from "../../../../presentation/components/PhotoUploadCard";
import { SingleImageFeatureLayout } from "../../../../presentation/layouts";
import type { ProcessingModalRenderProps } from "../../../../presentation/layouts";
import { useRemoveBackgroundFeature } from "../hooks";
import type {
  RemoveBackgroundTranslations,
  RemoveBackgroundFeatureConfig,
} from "../../domain/types";

export interface RemoveBackgroundFeatureProps {
  config: RemoveBackgroundFeatureConfig;
  translations: RemoveBackgroundTranslations & {
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

export const RemoveBackgroundFeature: React.FC<RemoveBackgroundFeatureProps> = ({
  config,
  translations,
  onSelectImage,
  onSaveImage,
  onBeforeProcess,
  renderProcessingModal,
}) => {
  const feature = useRemoveBackgroundFeature({
    config,
    onSelectImage,
    onSaveImage,
    onBeforeProcess,
  });

  const modalTranslations = useMemo(
    () => ({
      title: translations.modalTitle || "Processing",
      message: translations.modalMessage || "AI is removing the background...",
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
      renderResult={({ imageUrl, imageSize }) => (
        <Image
          source={{ uri: imageUrl }}
          style={[styles.resultImage, { width: imageSize, height: imageSize }]}
          resizeMode="contain"
        />
      )}
    />
  );
};

const styles = StyleSheet.create({
  resultImage: {
    borderRadius: 16,
  },
});
