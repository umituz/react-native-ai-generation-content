/**
 * MemeGeneratorFeature Component
 *
 * Unified Text-to-Image feature component for Meme Generation.
 * Integrates PromptInput, StyleSelector, and Generation logic using useTextToImageFeature.
 */

import React, { useMemo, useCallback } from "react";
import { View, ScrollView, StyleSheet, KeyboardAvoidingView, Platform } from "react-native";
import { useAppDesignTokens, AtomicCard, AtomicText } from "@umituz/react-native-design-system";
import { getAuthService } from "../../../../infrastructure/config";
import { useTextToImageFeature } from "../../../text-to-image/presentation/hooks/useTextToImageFeature";
import { PromptInput } from "../../../../presentation/components/PromptInput";
import { GenerateButton } from "../../../../presentation/components/buttons/GenerateButton";
import { GridSelector } from "../../../../presentation/components/selectors/GridSelector";
import { GenerationResultContent } from "../../../../presentation/components/result/GenerationResultContent";

// Constants (Using default provided styles if config doesn't override)
import { DEFAULT_IMAGE_STYLES } from "../../../text-to-image/domain/constants/styles.constants";

export interface MemeGeneratorFeatureProps {
  config: any; // AIFeatureConfig merged with extraConfig
  translations: any;
  onSaveImage: (url: string) => Promise<void>;
  onBeforeProcess?: () => Promise<boolean>;
}

export const MemeGeneratorFeature: React.FC<MemeGeneratorFeatureProps> = ({
  config,
  translations,
  onSaveImage,
  onBeforeProcess,
}) => {
  const tokens = useAppDesignTokens();
  const authService = getAuthService();
  const userId = authService.getUserId() || "anonymous";

  // Config can override styles, or use defaults
  const stylesList = config.styles || DEFAULT_IMAGE_STYLES || [];
  
  // Transform styles for GridSelector
  const styleOptions = useMemo(() => stylesList.map((s: any) => ({
      value: s.id,
      label: s.name,
      emoji: s.emoji || s.icon, // Handle different formats
      description: s.description
  })), [stylesList]);

  const { state, setPrompt, generate, reset, isReady } = useTextToImageFeature({
    config: {
        model: config.model || "fal-ai/nano-banana-edit", 
        buildInput: config.buildInput,
        extractResult: config.extractResult,
        ...config
    },
    userId,
  });

  const [selectedStyle, setSelectedStyle] = React.useState<string | null>(null);

  const handleGenerate = useCallback(async () => {
    if (onBeforeProcess) {
      const canProceed = await onBeforeProcess();
      if (!canProceed) return;
    }
    
    // Append style logic handled via buildInput or here
    // For now simple pass
    await generate();
  }, [generate, onBeforeProcess]);

  const handleSave = useCallback(() => {
    if (state.imageUrl) {
        onSaveImage(state.imageUrl);
    }
  }, [state.imageUrl, onSaveImage]);

  const styles = StyleSheet.create({
    container: {
      flex: 1,
    },
    content: {
      padding: tokens.spacing.lg,
      gap: tokens.spacing.xl,
      paddingBottom: 100,
    },
    section: {
        gap: tokens.spacing.md,
    },
  });

  if (state.imageUrl) {
     return (
        <GenerationResultContent
            result={{ imageUrl: state.imageUrl }}
            onSave={handleSave}
            onRetry={reset}
            translations={{
                share: "Share",
                sharing: "Sharing...",
                save: translations.saveButtonText || "Save to Gallery",
                retry: translations.tryAnotherText || "Create Another",
                aiGenerated: translations.successText || "Your meme is ready!",
            }}
        />
     );
  }

  return (
    <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.container}
    >
      <ScrollView contentContainerStyle={styles.content} keyboardShouldPersistTaps="handled">

        {/* Prompt Input */}
        <View style={styles.section}>
            <AtomicText type="labelLarge" style={{color: tokens.colors.textPrimary}}>
                {translations.description || "Describe your meme idea"}
            </AtomicText>
            <PromptInput
                value={state.prompt}
                onChangeText={setPrompt}
                placeholder={translations.promptPlaceholder || "Enter your funny idea..."}
                isDisabled={state.isProcessing}
                minHeight={100}
            />
        </View>

        {/* Style Selector */}
        {styleOptions.length > 0 && (
            <GridSelector
                title={translations.styleLabel || "Choose a Style"}
                options={styleOptions}
                selectedValue={selectedStyle}
                onSelect={setSelectedStyle}
                disabled={state.isProcessing}
                columns={3}
            />
        )}

        {/* Generate Button */}
        <GenerateButton
            onPress={handleGenerate}
            isProcessing={state.isProcessing}
            isDisabled={!isReady}
            text={translations.processButtonText || "Generate Meme"}
        />

        {/* Error Display */}
        {state.error && (
            <AtomicCard style={{backgroundColor: tokens.colors.errorContainer}}>
                <AtomicText style={{color: tokens.colors.error}}>
                    {state.error}
                </AtomicText>
            </AtomicCard>
        )}
      </ScrollView>
    </KeyboardAvoidingView>
  );
};
