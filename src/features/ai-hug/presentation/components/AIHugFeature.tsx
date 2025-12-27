/**
 * AIHugFeature Component
 * Self-contained AI hug feature UI component
 * Uses hook internally, only requires config and translations
 */

import React, { useCallback } from "react";
import { View, ScrollView, StyleSheet, Image, Dimensions } from "react-native";
import {
  useAppDesignTokens,
  AtomicText,
  AtomicButton,
} from "@umituz/react-native-design-system";
import { DualImagePicker } from "../../../../presentation/components/image-picker/DualImagePicker";
import { ErrorDisplay } from "../../../../presentation/components/display/ErrorDisplay";
import { useAIHugFeature } from "../hooks";
import type {
  AIHugTranslations,
  AIHugFeatureConfig,
} from "../../domain/types";

export interface AIHugFeatureProps {
  /** Feature configuration with provider-specific settings */
  config: AIHugFeatureConfig;
  /** User ID for the generation request */
  userId: string;
  /** Translations for all UI text */
  translations: AIHugTranslations;
  /** Source image picker callback */
  onSelectSourceImage: () => Promise<string | null>;
  /** Target image picker callback */
  onSelectTargetImage: () => Promise<string | null>;
  /** Save image callback */
  onSaveImage: (imageUrl: string) => Promise<void>;
  /** Optional custom processing modal renderer */
  renderProcessingModal?: (props: {
    visible: boolean;
    progress: number;
  }) => React.ReactNode;
}

export const AIHugFeature: React.FC<AIHugFeatureProps> = ({
  config,
  userId,
  translations,
  onSelectSourceImage,
  onSelectTargetImage,
  onSaveImage,
  renderProcessingModal,
}) => {
  const tokens = useAppDesignTokens();

  const feature = useAIHugFeature({
    config,
    userId,
    onSelectSourceImage,
    onSelectTargetImage,
    onSaveImage,
  });

  const handleProcess = useCallback(() => {
    void feature.process();
  }, [feature]);

  const handleSave = useCallback(() => {
    void feature.save();
  }, [feature]);

  const handleSelectSource = useCallback(() => {
    void feature.selectSourceImage();
  }, [feature]);

  const handleSelectTarget = useCallback(() => {
    void feature.selectTargetImage();
  }, [feature]);

  const canProcess = feature.sourceImageUri && feature.targetImageUri && !feature.isProcessing;

  if (feature.processedUrl) {
    const screenWidth = Dimensions.get("window").width;
    const imageSize = screenWidth - 48;

    return (
      <ScrollView
        style={[styles.container, { backgroundColor: tokens.colors.backgroundPrimary }]}
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        <AtomicText
          type="headlineMedium"
          style={[styles.successText, { color: tokens.colors.success }]}
        >
          {translations.successText}
        </AtomicText>

        <View style={styles.resultImageContainer}>
          <Image
            source={{ uri: feature.processedUrl }}
            style={[styles.resultImage, { width: imageSize, height: imageSize }]}
            resizeMode="contain"
          />
        </View>

        <View style={styles.resultActions}>
          <AtomicButton
            title={translations.saveButtonText}
            onPress={handleSave}
            variant="primary"
            size="lg"
          />
          <AtomicButton
            title={translations.tryAnotherText}
            onPress={feature.reset}
            variant="secondary"
            size="lg"
          />
        </View>
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
        <AtomicText
          type="bodyLarge"
          style={[styles.description, { color: tokens.colors.textSecondary }]}
        >
          {translations.description}
        </AtomicText>

        <View style={styles.pickerContainer}>
          <DualImagePicker
            sourceImageUri={feature.sourceImageUri}
            targetImageUri={feature.targetImageUri}
            isDisabled={feature.isProcessing}
            onSelectSource={handleSelectSource}
            onSelectTarget={handleSelectTarget}
            sourcePlaceholder={translations.sourceUploadTitle}
            targetPlaceholder={translations.targetUploadTitle}
            layout="horizontal"
            variant="portrait"
          />
        </View>

        <ErrorDisplay error={feature.error} />

        <View style={styles.buttonContainer}>
          <AtomicButton
            title={
              feature.isProcessing
                ? translations.processingText
                : translations.processButtonText
            }
            onPress={handleProcess}
            disabled={!canProcess}
            variant="primary"
            size="lg"
          />
        </View>
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
  pickerContainer: {
    marginHorizontal: 16,
    marginBottom: 16,
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
