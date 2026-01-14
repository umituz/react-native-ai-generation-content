import React, { useMemo } from "react";
import { View, Image, StyleSheet } from "react-native";
import { AtomicInput } from "@umituz/react-native-design-system";
import { PhotoUploadCard } from "../../../../presentation/components/PhotoUploadCard";
import { SingleImageWithPromptFeatureLayout } from "../../../../presentation/layouts";
import type { SingleImageWithPromptInputRenderProps, ResultRenderProps } from "../../../../presentation/layouts";
import { useReplaceBackgroundFeature } from "../hooks";
import type { ReplaceBackgroundTranslations, ReplaceBackgroundFeatureConfig } from "../../domain/types";

export interface ReplaceBackgroundFeatureProps {
  config: ReplaceBackgroundFeatureConfig;
  translations: ReplaceBackgroundTranslations & {
    modalTitle?: string;
    modalMessage?: string;
    modalHint?: string;
    modalBackgroundHint?: string;
  };
  onSelectImage: () => Promise<string | null>;
  onSaveImage: (imageUrl: string) => Promise<void>;
  onBeforeProcess?: () => Promise<boolean>;
}

export const ReplaceBackgroundFeature: React.FC<ReplaceBackgroundFeatureProps> = ({
  config,
  translations,
  onSelectImage,
  onSaveImage,
  onBeforeProcess,
}) => {
  const feature = useReplaceBackgroundFeature({
    config,
    onSelectImage,
    onSaveImage,
    onBeforeProcess,
  });

  const modalTranslations = useMemo(
    () => ({
      title: translations.modalTitle || "Processing",
      message: translations.modalMessage || "AI is replacing the background...",
      hint: translations.modalHint || "This may take a moment",
      backgroundHint: translations.modalBackgroundHint || "Continue in background",
    }),
    [translations],
  );

  return (
    <SingleImageWithPromptFeatureLayout
      feature={feature}
      translations={translations}
      modalTranslations={modalTranslations}
      renderInput={({ imageUri, onSelect, isDisabled, isProcessing, prompt, onPromptChange }: SingleImageWithPromptInputRenderProps) => (
        <>
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

          <View style={styles.promptContainer}>
            <AtomicInput
              value={prompt}
              onChangeText={onPromptChange}
              placeholder={translations.promptPlaceholder}
              multiline
              numberOfLines={3}
              disabled={isProcessing}
            />
          </View>
        </>
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
  promptContainer: {
    marginHorizontal: 24,
    marginTop: 16,
    marginBottom: 8,
  },
  resultImage: {
    borderRadius: 16,
  },
});
