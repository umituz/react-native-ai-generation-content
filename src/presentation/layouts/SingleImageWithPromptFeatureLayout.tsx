/**
 * SingleImageWithPromptFeatureLayout
 * Centralized layout for single-image + prompt processing features
 * (e.g., replace-background, remove-object)
 * Handles: ScrollView, AIGenerationForm, AIGenerationResult, GenerationProgressContent
 * Note: No Modal wrapper - shows fullscreen progress when processing (FutureUS pattern)
 */

import React, { useCallback } from "react";
import { View, ScrollView } from "react-native";
import { AtomicText } from "@umituz/react-native-design-system/atoms";
import { useResponsive } from "@umituz/react-native-design-system/responsive";
import { useAppDesignTokens } from "@umituz/react-native-design-system/theme";
import { AIGenerationForm } from "../components/AIGenerationForm";
import { AIGenerationResult } from "../components/display/AIGenerationResult";
import { GenerationProgressContent } from "../components/GenerationProgressContent";
import { layoutStyles } from "./layout-styles";
import { useProgressDismiss } from "../hooks/useProgressDismiss";
import type { SingleImageWithPromptFeatureLayoutProps } from "./types";

export const SingleImageWithPromptFeatureLayout: React.FC<SingleImageWithPromptFeatureLayoutProps> = ({
  feature,
  translations,
  modalTranslations,
  modalIcon = "sparkles",
  renderInput,
  renderResult,
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

  const handlePromptChange = useCallback(
    (prompt: string) => {
      feature.setPrompt(prompt);
    },
    [feature],
  );

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

  // Result view
  if (feature.processedUrl) {
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
          prompt: feature.prompt,
          onPromptChange: handlePromptChange,
        })}
      </AIGenerationForm>
    </ScrollView>
  );
};

