/**
 * SingleImageWithPromptFeatureLayout
 * Centralized layout for single-image + prompt processing features
 * (e.g., replace-background, remove-object)
 * Handles: Modal, ScrollView, AIGenerationForm, AIGenerationResult
 */

import React, { useCallback } from "react";
import { ScrollView, StyleSheet } from "react-native";
import {
  useAppDesignTokens,
  useResponsive,
  AtomicText,
} from "@umituz/react-native-design-system";
import { AIGenerationForm } from "../components/AIGenerationForm";
import { AIGenerationResult } from "../components/display/AIGenerationResult";
import { GenerationProgressModal } from "../components/GenerationProgressModal";
import type { SingleImageWithPromptFeatureLayoutProps } from "./types";

export const SingleImageWithPromptFeatureLayout: React.FC<SingleImageWithPromptFeatureLayoutProps> = ({
  feature,
  translations,
  modalTranslations,
  modalIcon = "sparkles",
  renderInput,
  renderResult,
  description,
  renderProcessingModal,
  children,
}) => {
  const tokens = useAppDesignTokens();
  const { width: screenWidth, horizontalPadding } = useResponsive();
  const imageSize = screenWidth - horizontalPadding * 2;

  const handleProcess = useCallback(() => {
    void feature.process();
  }, [feature]);

  const handleSave = useCallback(() => {
    void feature.save();
  }, [feature]);

  const handleSelectImage = useCallback(() => {
    void feature.selectImage();
  }, [feature]);

  const handlePromptChange = useCallback(
    (prompt: string) => {
      feature.setPrompt(prompt);
    },
    [feature],
  );

  // Default modal
  const defaultModal = (
    <GenerationProgressModal
      visible={feature.isProcessing}
      progress={feature.progress}
      icon={modalIcon}
      title={modalTranslations.title}
      message={modalTranslations.message}
      hint={modalTranslations.hint}
      backgroundHint={modalTranslations.backgroundHint}
      onClose={() => {}}
    />
  );

  // Result view
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
          {renderResult({ imageUrl: feature.processedUrl, imageSize })}
        </AIGenerationResult>
      </ScrollView>
    );
  }

  // Input view
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
          {description && (
            <AtomicText
              type="bodyLarge"
              style={[styles.description, { color: tokens.colors.textSecondary }]}
            >
              {description}
            </AtomicText>
          )}

          {children}

          {renderInput({
            imageUri: feature.imageUri,
            onSelect: handleSelectImage,
            isDisabled: feature.isProcessing,
            isProcessing: feature.isProcessing,
            prompt: feature.prompt,
            onPromptChange: handlePromptChange,
          })}
        </AIGenerationForm>
      </ScrollView>

      {renderProcessingModal
        ? renderProcessingModal({ visible: feature.isProcessing, progress: feature.progress })
        : defaultModal}
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
});
