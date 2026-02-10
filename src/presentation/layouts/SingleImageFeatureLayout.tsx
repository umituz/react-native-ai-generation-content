/**
 * SingleImageFeatureLayout
 * Centralized layout for all single-image processing features
 * Handles: ScrollView, AIGenerationForm, AIGenerationResult, GenerationProgressContent
 * Note: No Modal wrapper - shows fullscreen progress when processing (FutureUS pattern)
 */

import React, { useCallback } from "react";
import { View, ScrollView } from "react-native";
import {
  useAppDesignTokens,
  useResponsive,
  AtomicText,
} from "@umituz/react-native-design-system";
import { AIGenerationForm } from "../components/AIGenerationForm";
import { AIGenerationResult } from "../components/display/AIGenerationResult";
import { GenerationProgressContent } from "../components/GenerationProgressContent";
import { layoutStyles } from "./layout-styles";
import { useProgressDismiss } from "../hooks/useProgressDismiss";
import type { SingleImageFeatureLayoutProps } from "./types";

export const SingleImageFeatureLayout: React.FC<SingleImageFeatureLayoutProps> = ({
  feature,
  translations,
  modalTranslations,
  modalIcon = "sparkles",
  renderInput,
  renderResult,
  renderCustomResult,
  description,
  children,
}) => {
  const tokens = useAppDesignTokens();
  const { width: screenWidth, horizontalPadding } = useResponsive();
  const imageSize = screenWidth - horizontalPadding * 2;

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

  const handleSelectImage = useCallback(() => {
    void feature.selectImage();
  }, [feature]);

  // Processing view - fullscreen (FutureUS pattern, no Modal)
  // Show only if processing AND not dismissed (user can dismiss and generation continues)
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

  // Custom result view (for comparison sliders, etc.)
  if (feature.processedUrl && renderCustomResult && feature.imageUri) {
    return (
      <ScrollView
        style={[layoutStyles.container, { backgroundColor: tokens.colors.backgroundPrimary }]}
        contentContainerStyle={layoutStyles.content}
        showsVerticalScrollIndicator={false}
      >
        {renderCustomResult({
          processedUrl: feature.processedUrl,
          originalImageUri: feature.imageUri,
          imageSize,
          onSave: handleSave,
          onReset: feature.reset,
        })}
      </ScrollView>
    );
  }

  // Standard result view with AIGenerationResult wrapper
  if (feature.processedUrl && renderResult) {
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
        >
          {renderResult({ imageUrl: feature.processedUrl, imageSize })}
        </AIGenerationResult>
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
        isDisabled={!feature.imageUri}
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
          imageUri: feature.imageUri,
          onSelect: handleSelectImage,
          isDisabled: feature.isProcessing,
          isProcessing: feature.isProcessing,
        })}
      </AIGenerationForm>
    </ScrollView>
  );
};
