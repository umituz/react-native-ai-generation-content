/**
 * RemoveObjectFeature Component
 * Self-contained remove object feature UI component
 * Uses hook internally, only requires config and translations
 */

import React, { useCallback, useMemo } from "react";
import { View, ScrollView, StyleSheet, Image, TextInput } from "react-native";
import {
  useAppDesignTokens,
  useResponsive,
  AtomicText,
} from "@umituz/react-native-design-system";
import { PhotoUploadCard } from "../../../../presentation/components/PhotoUploadCard";
import { AIGenerationForm } from "../../../../presentation/components/AIGenerationForm";
import { AIGenerationResult } from "../../../../presentation/components/display/AIGenerationResult";
import { useRemoveObjectFeature } from "../hooks";
import type {
  RemoveObjectTranslations,
  RemoveObjectFeatureConfig,
} from "../../domain/types";

export interface RemoveObjectFeatureProps {
  config: RemoveObjectFeatureConfig;
  translations: RemoveObjectTranslations;
  onSelectImage: () => Promise<string | null>;
  onSaveImage: (imageUrl: string) => Promise<void>;
  renderProcessingModal?: (props: {
    visible: boolean;
    progress: number;
  }) => React.ReactNode;
}

export const RemoveObjectFeature: React.FC<RemoveObjectFeatureProps> = ({
  config,
  translations,
  onSelectImage,
  onSaveImage,
  renderProcessingModal,
}) => {
  const tokens = useAppDesignTokens();
  const { width: screenWidth, horizontalPadding } = useResponsive();
  const imageSize = screenWidth - horizontalPadding * 2;

  const feature = useRemoveObjectFeature({
    config,
    onSelectImage,
    onSaveImage,
  });

  const photoTranslations = useMemo(
    () => ({
      tapToUpload: translations.uploadTitle,
      selectPhoto: translations.uploadSubtitle,
      change: translations.uploadChange,
      analyzing: translations.uploadAnalyzing,
    }),
    [translations],
  );

  const handleProcess = useCallback(() => {
    void feature.process();
  }, [feature]);

  const handleSave = useCallback(() => {
    void feature.save();
  }, [feature]);

  const handleSelectImage = useCallback(() => {
    void feature.selectImage();
  }, [feature]);

  if (feature.processedUrl) {
    return (
      <ScrollView
        style={[styles.container, { backgroundColor: tokens.colors.backgroundPrimary }]}
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        <AIGenerationResult
          successText={translations.successText}
          primaryAction={{
            label: translations.saveButtonText,
            onPress: handleSave,
          }}
          secondaryAction={{
            label: translations.tryAnotherText,
            onPress: feature.reset,
          }}
        >
          <Image
            source={{ uri: feature.processedUrl }}
            style={[styles.resultImage, { width: imageSize, height: imageSize }]}
            resizeMode="contain"
          />
        </AIGenerationResult>
      </ScrollView>
    );
  }

  return (
    <>
      <ScrollView
        style={[styles.container, { backgroundColor: tokens.colors.backgroundPrimary }]}
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        <AIGenerationForm
          onGenerate={handleProcess}
          isGenerating={feature.isProcessing}
          progress={feature.progress}
          translations={{
            generateButton: translations.processButtonText,
            generatingButton: translations.processingText,
            progressTitle: translations.processingText,
          }}
        >
          <PhotoUploadCard
            imageUri={feature.imageUri}
            onPress={handleSelectImage}
            isValidating={feature.isProcessing}
            disabled={feature.isProcessing}
            translations={photoTranslations}
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
              value={feature.prompt}
              onChangeText={feature.setPrompt}
              placeholder={translations.promptPlaceholder}
              placeholderTextColor={tokens.colors.textTertiary}
              multiline
              numberOfLines={3}
              editable={!feature.isProcessing}
            />
            <AtomicText
              type="bodySmall"
              style={[styles.promptHint, { color: tokens.colors.textTertiary }]}
            >
              {translations.maskSubtitle}
            </AtomicText>
          </View>
        </AIGenerationForm>
      </ScrollView>

      {renderProcessingModal?.({ visible: feature.isProcessing, progress: feature.progress })}
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    paddingVertical: 16,
  },
  description: {
    textAlign: "center",
    marginHorizontal: 24,
    marginBottom: 24,
    lineHeight: 24,
  },
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
  successText: {
    textAlign: "center",
    marginBottom: 24,
  },
  resultImageContainer: {
    alignItems: "center",
    marginHorizontal: 24,
    marginBottom: 24,
  },
  resultImage: {
    borderRadius: 16,
  },
  resultActions: {
    marginHorizontal: 24,
    gap: 12,
  },
  buttonContainer: {
    marginHorizontal: 24,
    marginTop: 8,
  },
});
