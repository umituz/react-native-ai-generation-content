/**
 * PhotoRestoreFeature Component
 * Self-contained photo restore feature UI component
 * Uses hook internally, only requires config and translations
 */

import React, { useCallback, useMemo } from "react";
import { ScrollView, StyleSheet } from "react-native";
import { useAppDesignTokens } from "@umituz/react-native-design-system";
import { PhotoUploadCard } from "../../../../presentation/components/PhotoUploadCard";
import { AIGenerationForm } from "../../../../presentation/components/AIGenerationForm";
import { PhotoRestoreResultView } from "./PhotoRestoreResultView";
import { usePhotoRestoreFeature } from "../hooks";
import type {
  PhotoRestoreTranslations,
  PhotoRestoreFeatureConfig,
} from "../../domain/types";

export interface PhotoRestoreFeatureProps {
  /** Feature configuration with provider-specific settings */
  config: PhotoRestoreFeatureConfig;
  /** Translations for all UI text */
  translations: PhotoRestoreTranslations;
  /** Image picker callback */
  onSelectImage: () => Promise<string | null>;
  /** Save image callback */
  onSaveImage: (imageUrl: string) => Promise<void>;
  /** Called before processing starts. Return false to cancel. */
  onBeforeProcess?: () => Promise<boolean>;
  /** Optional custom processing modal renderer */
  renderProcessingModal?: (props: {
    visible: boolean;
    progress: number;
  }) => React.ReactNode;
}

export const PhotoRestoreFeature: React.FC<PhotoRestoreFeatureProps> = ({
  config,
  translations,
  onSelectImage,
  onSaveImage,
  onBeforeProcess,
  renderProcessingModal,
}) => {
  const tokens = useAppDesignTokens();

  const feature = usePhotoRestoreFeature({
    config,
    onSelectImage,
    onSaveImage,
    onBeforeProcess,
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
        <PhotoRestoreResultView
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
