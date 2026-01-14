/**
 * DualImageVideoFeatureLayout
 * Centralized layout for dual-image video features (ai-kiss, ai-hug)
 * Handles: ScrollView, AIGenerationForm, AIGenerationResult, GenerationProgressContent
 * Note: No Modal wrapper - shows fullscreen progress when processing (FutureUS pattern)
 */

import React, { useCallback } from "react";
import { View, ScrollView, StyleSheet } from "react-native";
import {
  useAppDesignTokens,
  AtomicText,
} from "@umituz/react-native-design-system";
import { AIGenerationForm } from "../components/AIGenerationForm";
import { AIGenerationResult } from "../components/display/AIGenerationResult";
import { GenerationProgressContent } from "../components/GenerationProgressContent";
import type { DualImageVideoFeatureLayoutProps } from "./types";

export const DualImageVideoFeatureLayout: React.FC<DualImageVideoFeatureLayoutProps> = ({
  feature,
  translations,
  modalTranslations,
  modalIcon = "sparkles",
  renderInput,
  description,
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

  // Processing view - fullscreen (FutureUS pattern, no Modal)
  if (feature.isProcessing) {
    return (
      <View
        style={[
          styles.processingContainer,
          { backgroundColor: tokens.colors.backgroundPrimary },
        ]}
      >
        <GenerationProgressContent
          progress={feature.progress}
          icon={modalIcon}
          title={modalTranslations.title}
          message={modalTranslations.message}
          hint={modalTranslations.hint}
          backgroundHint={modalTranslations.backgroundHint}
          backgroundColor={tokens.colors.surface}
          textColor={tokens.colors.textPrimary}
          progressColor={tokens.colors.primary}
        />
      </View>
    );
  }

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
  processingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
