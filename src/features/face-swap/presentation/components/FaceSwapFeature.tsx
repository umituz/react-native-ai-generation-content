import React, { useMemo } from "react";
import { View, Image, StyleSheet } from "react-native";
import { DualImagePicker } from "../../../../presentation/components/image-picker/DualImagePicker";
import { DualImageFeatureLayout } from "../../../../presentation/layouts";
import type { DualImageInputRenderProps, ResultRenderProps } from "../../../../presentation/layouts";
import { useFaceSwapFeature } from "../hooks";
import type { FaceSwapTranslations, FaceSwapFeatureConfig } from "../../domain/types";

export interface FaceSwapFeatureProps {
  config: FaceSwapFeatureConfig;
  translations: FaceSwapTranslations & {
    modalTitle?: string;
    modalMessage?: string;
    modalHint?: string;
    modalBackgroundHint?: string;
  };
  onSelectSourceImage: () => Promise<string | null>;
  onSelectTargetImage: () => Promise<string | null>;
  onSaveImage: (imageUrl: string) => Promise<void>;
  onBeforeProcess?: () => Promise<boolean>;
}

export const FaceSwapFeature: React.FC<FaceSwapFeatureProps> = ({
  config,
  translations,
  onSelectSourceImage,
  onSelectTargetImage,
  onSaveImage,
  onBeforeProcess,
}) => {
  const feature = useFaceSwapFeature({
    config,
    onSelectSourceImage,
    onSelectTargetImage,
    onSaveImage,
    onBeforeProcess,
  });

  const modalTranslations = useMemo(
    () => ({
      title: translations.modalTitle || "Processing",
      message: translations.modalMessage || "AI is swapping faces...",
      hint: translations.modalHint || "This may take a moment",
      backgroundHint: translations.modalBackgroundHint || "Continue in background",
    }),
    [translations],
  );

  return (
    <DualImageFeatureLayout
      feature={feature}
      translations={translations}
      modalTranslations={modalTranslations}
      renderInput={({ sourceImageUri, targetImageUri, onSelectSource, onSelectTarget, isDisabled }: DualImageInputRenderProps) => (
        <View style={styles.pickerContainer}>
          <DualImagePicker
            sourceImageUri={sourceImageUri}
            targetImageUri={targetImageUri}
            isDisabled={isDisabled}
            onSelectSource={onSelectSource}
            onSelectTarget={onSelectTarget}
            sourcePlaceholder={translations.sourceUploadTitle}
            targetPlaceholder={translations.targetUploadTitle}
            layout="horizontal"
          />
        </View>
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
  pickerContainer: {
    marginHorizontal: 16,
    marginBottom: 16,
  },
  resultImage: {
    borderRadius: 16,
  },
});
