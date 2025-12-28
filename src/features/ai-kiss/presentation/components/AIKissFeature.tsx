/**
 * AIKissFeature Component
 * Self-contained AI kiss video feature UI component
 * Uses hook internally, only requires config and translations
 */

import React, { useCallback } from "react";
import { View, ScrollView, StyleSheet, Dimensions } from "react-native";
import {
  useAppDesignTokens,
  AtomicText,
  AtomicButton,
} from "@umituz/react-native-design-system";
import { DualImagePicker } from "../../../../presentation/components/image-picker/DualImagePicker";
import { ErrorDisplay } from "../../../../presentation/components/display/ErrorDisplay";
import { useAIKissFeature } from "../hooks";
import type {
  AIKissTranslations,
  AIKissFeatureConfig,
} from "../../domain/types";

export interface AIKissFeatureProps {
  config: AIKissFeatureConfig;
  translations: AIKissTranslations;
  onSelectSourceImage: () => Promise<string | null>;
  onSelectTargetImage: () => Promise<string | null>;
  onSaveVideo: (videoUrl: string) => Promise<void>;
  /** Custom video player renderer - required for video playback */
  renderVideoPlayer: (props: { videoUrl: string; size: number }) => React.ReactNode;
  renderProcessingModal?: (props: {
    visible: boolean;
    progress: number;
  }) => React.ReactNode;
}

export const AIKissFeature: React.FC<AIKissFeatureProps> = ({
  config,
  translations,
  onSelectSourceImage,
  onSelectTargetImage,
  onSaveVideo,
  renderVideoPlayer,
  renderProcessingModal,
}) => {
  const tokens = useAppDesignTokens();

  const feature = useAIKissFeature({
    config,
    onSelectSourceImage,
    onSelectTargetImage,
    onSaveVideo,
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

  if (feature.processedVideoUrl) {
    const screenWidth = Dimensions.get("window").width;
    const videoSize = screenWidth - 48;

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

        <View style={styles.resultVideoContainer}>
          {renderVideoPlayer({ videoUrl: feature.processedVideoUrl, size: videoSize })}
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
  resultVideoContainer: {
    alignItems: "center",
    marginHorizontal: 24,
    marginBottom: 24,
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
