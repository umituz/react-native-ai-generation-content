/**
 * RemoveObjectFeature Component
 * Self-contained remove object feature UI component
 * Uses hook internally, only requires config and translations
 */

import React, { useCallback, useMemo } from "react";
import { View, ScrollView, StyleSheet, Image, Dimensions, TextInput } from "react-native";
import {
  useAppDesignTokens,
  AtomicText,
  AtomicButton,
} from "@umituz/react-native-design-system";
import { PhotoUploadCard } from "../../../../presentation/components/PhotoUploadCard";
import { ErrorDisplay } from "../../../../presentation/components/display/ErrorDisplay";
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

        <ErrorDisplay error={feature.error} />

        <View style={styles.buttonContainer}>
          <AtomicButton
            title={
              feature.isProcessing
                ? translations.processingText
                : translations.processButtonText
            }
            onPress={handleProcess}
            disabled={!feature.imageUri || feature.isProcessing}
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
