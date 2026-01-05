/**
 * RemoveObjectFeature Component
 * Self-contained remove object feature UI component
 * Uses centralized SingleImageWithPromptFeatureLayout for consistent UX
 */

import React, { useMemo } from "react";
import { View, Image, StyleSheet, TextInput } from "react-native";
import {
  useAppDesignTokens,
  AtomicText,
} from "@umituz/react-native-design-system";
import { PhotoUploadCard } from "../../../../presentation/components/PhotoUploadCard";
import { SingleImageWithPromptFeatureLayout } from "../../../../presentation/layouts";
import type { ProcessingModalRenderProps } from "../../../../presentation/layouts";
import { useRemoveObjectFeature } from "../hooks";
import type {
  RemoveObjectTranslations,
  RemoveObjectFeatureConfig,
} from "../../domain/types";

export interface RemoveObjectFeatureProps {
  config: RemoveObjectFeatureConfig;
  translations: RemoveObjectTranslations & {
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

export const RemoveObjectFeature: React.FC<RemoveObjectFeatureProps> = ({
  config,
  translations,
  onSelectImage,
  onSaveImage,
  onBeforeProcess,
  renderProcessingModal,
}) => {
  const tokens = useAppDesignTokens();

  const feature = useRemoveObjectFeature({
    config,
    onSelectImage,
    onSaveImage,
    onBeforeProcess,
  });

  const modalTranslations = useMemo(
    () => ({
      title: translations.modalTitle || "Processing",
      message: translations.modalMessage || "AI is removing objects...",
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
      renderProcessingModal={renderProcessingModal}
      renderInput={({ imageUri, onSelect, isDisabled, isProcessing, prompt, onPromptChange }) => (
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
            <AtomicText
              type="labelMedium"
              style={[styles.promptLabel, { color: tokens.colors.textPrimary }]}
            >
              {translations.maskTitle}
            </AtomicText>
            <TextInput
              style={[
                styles.promptInput,
                {
                  backgroundColor: tokens.colors.backgroundSecondary,
                  color: tokens.colors.textPrimary,
                  borderColor: tokens.colors.border,
                },
              ]}
              value={prompt}
              onChangeText={onPromptChange}
              placeholder={translations.promptPlaceholder}
              placeholderTextColor={tokens.colors.textTertiary}
              multiline
              numberOfLines={3}
              editable={!isProcessing}
            />
            <AtomicText
              type="bodySmall"
              style={[styles.promptHint, { color: tokens.colors.textTertiary }]}
            >
              {translations.maskSubtitle}
            </AtomicText>
          </View>
        </>
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
  promptContainer: {
    marginHorizontal: 24,
    marginTop: 16,
    marginBottom: 8,
  },
  promptLabel: {
    marginBottom: 8,
  },
  promptInput: {
    borderWidth: 1,
    borderRadius: 12,
    padding: 12,
    minHeight: 80,
    textAlignVertical: "top",
    fontSize: 16,
  },
  promptHint: {
    marginTop: 8,
  },
  resultImage: {
    borderRadius: 16,
  },
});
