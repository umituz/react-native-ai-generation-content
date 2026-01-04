/**
 * FaceSwapFeature Component
 * Self-contained face swap feature UI component
 * Uses hook internally, only requires config and translations
 */

import React, { useCallback } from "react";
import { View, ScrollView, StyleSheet, Image } from "react-native";
import { useAppDesignTokens, useResponsive } from "@umituz/react-native-design-system";
import { DualImagePicker } from "../../../../presentation/components/image-picker/DualImagePicker";
import { AIGenerationForm } from "../../../../presentation/components/AIGenerationForm";
import { AIGenerationResult } from "../../../../presentation/components/display/AIGenerationResult";
import { useFaceSwapFeature } from "../hooks";
import type {
  FaceSwapTranslations,
  FaceSwapFeatureConfig,
} from "../../domain/types";

export interface FaceSwapFeatureProps {
  config: FaceSwapFeatureConfig;
  translations: FaceSwapTranslations;
  onSelectSourceImage: () => Promise<string | null>;
  onSelectTargetImage: () => Promise<string | null>;
  onSaveImage: (imageUrl: string) => Promise<void>;
  renderProcessingModal?: (props: {
    visible: boolean;
    progress: number;
  }) => React.ReactNode;
}

export const FaceSwapFeature: React.FC<FaceSwapFeatureProps> = ({
  config,
  translations,
  onSelectSourceImage,
  onSelectTargetImage,
  onSaveImage,
  renderProcessingModal,
}) => {
  const tokens = useAppDesignTokens();
  const { width: screenWidth, horizontalPadding } = useResponsive();
  const imageSize = screenWidth - horizontalPadding * 2;

  const feature = useFaceSwapFeature({
    config,
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
            />
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
