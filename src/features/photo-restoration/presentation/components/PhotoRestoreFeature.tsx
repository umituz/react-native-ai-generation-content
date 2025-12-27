/**
 * PhotoRestoreFeature Component
 * Main photo restore feature UI component
 */

import React, { useCallback, useMemo } from "react";
import { View, ScrollView, StyleSheet } from "react-native";
import {
  useAppDesignTokens,
  PhotoUploadCard,
  AtomicText,
  AtomicButton,
} from "@umituz/react-native-design-system";
import { PhotoRestoreResultView } from "./PhotoRestoreResultView";
import type {
  PhotoRestoreTranslations,
  PhotoRestoreFeatureConfig,
} from "../../domain/types";

export interface PhotoRestoreFeatureProps {
  imageUri: string | null;
  processedUrl: string | null;
  isProcessing: boolean;
  progress: number;
  error: string | null;
  translations: PhotoRestoreTranslations;
  config?: PhotoRestoreFeatureConfig;
  onSelectImage: () => void;
  onProcess: () => void;
  onSave: () => void;
  onReset: () => void;
  renderProcessingModal?: (props: {
    visible: boolean;
    progress: number;
  }) => React.ReactNode;
}

export const PhotoRestoreFeature: React.FC<PhotoRestoreFeatureProps> = ({
  imageUri,
  processedUrl,
  isProcessing,
  progress,
  error,
  translations,
  onSelectImage,
  onProcess,
  onSave,
  onReset,
  renderProcessingModal,
}) => {
  const tokens = useAppDesignTokens();

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
    onProcess();
  }, [onProcess]);

  if (processedUrl && imageUri) {
    return (
      <ScrollView
        style={[styles.container, { backgroundColor: tokens.colors.backgroundPrimary }]}
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        <PhotoRestoreResultView
          originalUri={imageUri}
          processedUri={processedUrl}
          translations={{
            successText: translations.successText,
            saveButtonText: translations.saveButtonText,
            tryAnotherText: translations.tryAnotherText,
            beforeLabel: translations.beforeLabel,
            afterLabel: translations.afterLabel,
          }}
          onSave={onSave}
          onReset={onReset}
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
          imageUri={imageUri}
          onPress={onSelectImage}
          isValidating={isProcessing}
          disabled={isProcessing}
          translations={photoTranslations}
          config={{
            aspectRatio: 1,
            borderRadius: 24,
            showValidationStatus: false,
            allowChange: true,
          }}
        />

        {error && (
          <View
            style={[
              styles.errorContainer,
              { backgroundColor: `${tokens.colors.error}15` },
            ]}
          >
            <AtomicText type="bodyMedium" style={{ color: tokens.colors.error }}>
              {error}
            </AtomicText>
          </View>
        )}

        <View style={styles.buttonContainer}>
          <AtomicButton
            title={
              isProcessing
                ? translations.processingText
                : translations.processButtonText
            }
            onPress={handleProcess}
            disabled={!imageUri || isProcessing}
            variant="primary"
            size="lg"
          />
        </View>
      </ScrollView>

      {renderProcessingModal?.({ visible: isProcessing, progress })}
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
