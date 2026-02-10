/**
 * DualImageVideoFeatureLayout
 * Centralized layout for dual-image video features
 * Handles: ScrollView, AIGenerationForm, AIGenerationResult, GenerationProgressContent
 * Note: No Modal wrapper - shows fullscreen progress when processing (FutureUS pattern)
 */

import React, { useCallback } from "react";
import { View, ScrollView } from "react-native";
import {
  useAppDesignTokens,
  AtomicText,
} from "@umituz/react-native-design-system";
import { AIGenerationForm } from "../components/AIGenerationForm";
import { AIGenerationResult } from "../components/display/AIGenerationResult";
import { GenerationProgressContent } from "../components/GenerationProgressContent";
import { layoutStyles } from "./layout-styles";
import { useProgressDismiss } from "../hooks/useProgressDismiss";
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

  // Background generation: user can dismiss progress but generation continues
  const { isProgressDismissed, handleDismissProgress } = useProgressDismiss(
    feature.isProcessing
  );

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
  // Show only if processing AND not dismissed
  if (feature.isProcessing && !isProgressDismissed) {
    return (
      <View
        style={[
          layoutStyles.processingContainer,
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
          onClose={handleDismissProgress}
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
        style={[layoutStyles.container, { backgroundColor: tokens.colors.backgroundPrimary }]}
        contentContainerStyle={layoutStyles.content}
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
      style={[layoutStyles.container, { backgroundColor: tokens.colors.backgroundPrimary }]}
      contentContainerStyle={layoutStyles.content}
      showsVerticalScrollIndicator={false}
    >
      <AIGenerationForm
        onGenerate={handleProcess}
        isGenerating={feature.isProcessing}
        isDisabled={!feature.sourceImageUri || !feature.targetImageUri}
        translations={{
          generateButton: translations.processButtonText,
          generatingButton: translations.processingText,
          progressTitle: translations.processingText,
        }}
      >
        {description && (
          <AtomicText
            type="bodyLarge"
            style={[layoutStyles.description, { color: tokens.colors.textSecondary }]}
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

