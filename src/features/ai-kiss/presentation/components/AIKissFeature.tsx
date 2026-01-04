/**
 * AIKissFeature Component
 * Self-contained AI kiss video feature UI component
 * Uses hook internally, only requires config and translations
 */

import React, { useCallback } from "react";
import { View, ScrollView, StyleSheet } from "react-native";
import { useAppDesignTokens } from "@umituz/react-native-design-system";
import { DualImagePicker } from "../../../../presentation/components/image-picker/DualImagePicker";
import { AIGenerationForm } from "../../../../presentation/components/AIGenerationForm";
import { AIGenerationResult } from "../../../../presentation/components/display/AIGenerationResult";
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
  /** Called before processing starts. Return false to cancel. */
  onBeforeProcess?: () => Promise<boolean>;
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
  onBeforeProcess,
  renderProcessingModal,
}) => {
  const tokens = useAppDesignTokens();

  const feature = useAIKissFeature({
    config,
    onSelectSourceImage,
    onSelectTargetImage,
    onSaveVideo,
    onBeforeProcess,
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

  if (feature.processedVideoUrl) {
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
          translations={{
            generateButton: translations.processButtonText,
            generatingButton: translations.processingText,
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
  pickerContainer: {
    marginHorizontal: 16,
    marginBottom: 16,
  },
});
