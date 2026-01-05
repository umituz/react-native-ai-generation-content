/**
 * DualImageVideoFeatureLayout
 * Centralized layout for dual-image video features (ai-kiss, ai-hug)
 * Handles: Modal, ScrollView, AIGenerationForm, AIGenerationResult
 */

import React, { useCallback } from "react";
import { ScrollView, StyleSheet } from "react-native";
import {
  useAppDesignTokens,
  AtomicText,
} from "@umituz/react-native-design-system";
import { AIGenerationForm } from "../components/AIGenerationForm";
import { AIGenerationResult } from "../components/display/AIGenerationResult";
import { GenerationProgressModal } from "../components/GenerationProgressModal";
import type { DualImageVideoFeatureLayoutProps } from "./types";

export const DualImageVideoFeatureLayout: React.FC<DualImageVideoFeatureLayoutProps> = ({
  feature,
  translations,
  modalTranslations,
  modalIcon = "sparkles",
  renderInput,
  description,
  renderProcessingModal,
  children,
}) => {
  const tokens = useAppDesignTokens();

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

  // Result view (video features show result without embedded content)
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
            sourceImageUri: feature.sourceImageUri,
            targetImageUri: feature.targetImageUri,
            onSelectSource: handleSelectSource,
            onSelectTarget: handleSelectTarget,
            isDisabled: feature.isProcessing,
            isProcessing: feature.isProcessing,
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
