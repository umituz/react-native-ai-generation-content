/**
 * UpscaleFeature Component
 * Self-contained upscale feature UI component
 * Uses hook internally, only requires config and translations
 */

import React, { useCallback, useMemo } from "react";
import { View, ScrollView, StyleSheet } from "react-native";
import {
  useAppDesignTokens,
  AtomicText,
  AtomicButton,
} from "@umituz/react-native-design-system";
import { PhotoUploadCard } from "../../../../presentation/components/PhotoUploadCard";
import { UpscaleResultView } from "./UpscaleResultView";
import { useUpscaleFeature } from "../hooks";
import type {
  UpscaleTranslations,
  UpscaleFeatureConfig,
} from "../../domain/types";

export interface UpscaleFeatureProps {
  /** Feature configuration with provider-specific settings */
  config: UpscaleFeatureConfig;
  /** Translations for all UI text */
  translations: UpscaleTranslations;
  /** Image picker callback */
  onSelectImage: () => Promise<string | null>;
  /** Save image callback */
  onSaveImage: (imageUrl: string) => Promise<void>;
  /** Optional custom processing modal renderer */
  renderProcessingModal?: (props: {
    visible: boolean;
    progress: number;
  }) => React.ReactNode;
}

export const UpscaleFeature: React.FC<UpscaleFeatureProps> = ({
  config,
  translations,
  onSelectImage,
  onSaveImage,
  renderProcessingModal,
}) => {
  const tokens = useAppDesignTokens();

  const feature = useUpscaleFeature({
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

  if (feature.processedUrl && feature.imageUri) {
    return (
      <ScrollView
        style={[styles.container, { backgroundColor: tokens.colors.backgroundPrimary }]}
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        <UpscaleResultView
          originalUri={feature.imageUri}
          processedUri={feature.processedUrl}
          translations={{
            successText: translations.successText,
            saveButtonText: translations.saveButtonText,
            tryAnotherText: translations.tryAnotherText,
            beforeLabel: translations.beforeLabel,
            afterLabel: translations.afterLabel,
          }}
          onSave={handleSave}
          onReset={feature.reset}
        />
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

        {feature.error && (
          <View
            style={[
              styles.errorContainer,
              { backgroundColor: `${tokens.colors.error}15` },
            ]}
          >
            <AtomicText type="bodyMedium" style={{ color: tokens.colors.error }}>
              {feature.error}
            </AtomicText>
          </View>
        )}

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
  errorContainer: {
    marginHorizontal: 24,
    marginBottom: 16,
    padding: 16,
    borderRadius: 12,
  },
  buttonContainer: {
    marginHorizontal: 24,
    marginTop: 8,
  },
});
