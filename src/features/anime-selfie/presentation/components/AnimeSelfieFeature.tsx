import React, { useMemo } from "react";
import { Image, StyleSheet } from "react-native";
import { PhotoUploadCard } from "../../../../presentation/components/PhotoUploadCard";
import { SingleImageFeatureLayout } from "../../../../presentation/layouts";
import type { SingleImageInputRenderProps, ResultRenderProps } from "../../../../presentation/layouts";
import { useAnimeSelfieFeature } from "../hooks";
import type { AnimeSelfieTranslations, AnimeSelfieFeatureConfig } from "../../domain/types";

export interface AnimeSelfieFeatureProps {
  config: AnimeSelfieFeatureConfig;
  translations: AnimeSelfieTranslations & {
    modalTitle?: string;
    modalMessage?: string;
    modalHint?: string;
    modalBackgroundHint?: string;
  };
  onSelectImage: () => Promise<string | null>;
  onSaveImage: (imageUrl: string) => Promise<void>;
  onBeforeProcess?: () => Promise<boolean>;
}

export const AnimeSelfieFeature: React.FC<AnimeSelfieFeatureProps> = ({
  config,
  translations,
  onSelectImage,
  onSaveImage,
  onBeforeProcess,
}) => {
  const feature = useAnimeSelfieFeature({
    config,
    onSelectImage,
    onSaveImage,
    onBeforeProcess,
  });

  const modalTranslations = useMemo(
    () => ({
      title: translations.modalTitle || "Processing",
      message: translations.modalMessage || "AI is transforming your photo...",
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
      renderInput={({ imageUri, onSelect, isDisabled, isProcessing }: SingleImageInputRenderProps) => (
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
      renderResult={({ imageUrl, imageSize }: ResultRenderProps) => (
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
