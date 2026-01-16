
import React from "react";
import { View, ScrollView, Platform, TouchableOpacity, Image } from "react-native";
import {
  useAppDesignTokens,
  AtomicText,
  AtomicIcon,
  ScreenLayout,
  AtomicKeyboardAvoidingView,
} from "@umituz/react-native-design-system";

import { AIGenScreenHeader } from "../headers/AIGenScreenHeader";
import { PartnerStepScreen } from "../../../features/partner-upload/presentation/screens/PartnerStepScreen";
import { AIGenerationConfig } from "../AIGenerationConfig";
import { GenerationProgressContent } from "../GenerationProgressContent";
import { AIGenerationResult } from "../display/AIGenerationResult";
import { AIGenerateStep } from "../../hooks/generation/useAIGenerateState";
import { useAIGenerateWizardFlow } from "./useAIGenerateWizardFlow";
import { AIGenerateWizardFlowProps } from "./AIGenerateWizardFlow.types";
import { VideoResultPlayer } from "../display/VideoResultPlayer";

export const AIGenerateWizardFlow: React.FC<AIGenerateWizardFlowProps> = ({
  featureType,
  translations,
  styleOptions,
  presets,
  durationOptions,
  onGenerate,
  onBack: onBackProp,
  onSave,
  onShare,
  t,
}) => {
  const tokens = useAppDesignTokens();

  // Transform WizardStyleOption[] to StyleOption[] format
  const transformedStyles = React.useMemo(() =>
    styleOptions.map((style) => ({
      id: style.id,
      name: style.label,
      description: undefined,
      icon: style.icon,
    })),
    [styleOptions]
  );

  // Transform PresetOption[] to StylePreset[] format
  const transformedPresets = React.useMemo(() =>
    presets.map((preset) => ({
      id: preset.id,
      name: preset.label,
      emoji: preset.icon || "",
      description: preset.prompt || "",
    })),
    [presets]
  );

  const {
    currentStep,
    setCurrentStep,
    images,
    setStepImage,
    prompt,
    setPrompt,
    selectedStyle,
    setSelectedStyle,
    selectedDuration,
    setSelectedDuration,
    showAdvanced,
    toggleAdvanced,
    isGenerating,
    progress,
    result,
    handleBack,
    handleNext,
    handleGenerate,
  } = useAIGenerateWizardFlow({ featureType, onGenerate, onBack: onBackProp });

  switch (currentStep) {
    case AIGenerateStep.UPLOAD_1:
    case AIGenerateStep.UPLOAD_2: {
      const isStep2 = currentStep === AIGenerateStep.UPLOAD_2;
      return (
        <PartnerStepScreen
          t={t}
          onBack={handleBack}
          onContinue={(img: { uri: string; previewUrl?: string }) => {
            setStepImage(isStep2 ? 1 : 0, { uri: img.uri, previewUrl: img.previewUrl || img.uri });
            handleNext();
          }}
          translations={{
            title: translations.headerTitle,
            subtitle: isStep2 ? translations.uploadSubtitle2 : translations.uploadSubtitle,
            continue: translations.continue,
            tapToUpload: translations.tapToUpload,
            selectPhoto: translations.selectPhoto,
            change: translations.change,
            analyzing: translations.analyzing,
            fileTooLarge: translations.fileTooLarge,
            maxFileSize: translations.maxFileSize,
            error: translations.error,
            uploadFailed: translations.uploadFailed,
            aiDisclosure: translations.aiDisclosure,
          }}
          initialName=""
          config={{ showFaceDetection: featureType === "face-swap", showNameInput: false, showPhotoTips: true }}
        />
      );
    }

    case AIGenerateStep.GENERATING:
      return (
        <ScreenLayout header={<AIGenScreenHeader title={translations.headerTitle} onNavigationPress={handleBack} />}>
          <View style={{ flex: 1, padding: tokens.spacing.xl }}>
            <GenerationProgressContent
              progress={progress}
              title={translations.processingTitle}
              message={translations.processingMessage}
              hint={translations.processingHint}
            />
          </View>
        </ScreenLayout>
      );

    case AIGenerateStep.RESULT:
      const isVideo = ["image-to-video", "text-to-video", "ai-hug", "ai-kiss"].includes(featureType);
      return (
        <ScreenLayout header={<AIGenScreenHeader title={translations.headerTitle} onNavigationPress={handleBack} />}>
          <AIGenerationResult
            successText={translations.successTitle}
            primaryAction={{ 
              label: translations.saveButton, 
              onPress: () => result && onSave?.(result), 
              icon: "download" 
            }}
            secondaryAction={{
              label: translations.tryAgainButton,
              onPress: () => setCurrentStep(AIGenerateStep.CONFIG),
              icon: "refresh",
            }}
            extraActions={[
              {
                label: translations.shareButton,
                onPress: () => result && onShare?.(result),
                icon: "share-variant",
                variant: "outline",
              },
            ]}
          >
            {isVideo && result ? (
               <VideoResultPlayer uri={result} />
            ) : (
              <Image source={{ uri: result || "" }} style={{ width: "100%", aspectRatio: 2 / 3, borderRadius: 16 }} resizeMode="cover" />
            )}
          </AIGenerationResult>
        </ScreenLayout>
      );

    default:
      return (
        <AtomicKeyboardAvoidingView offset={Platform.OS === "ios" ? 94 : 0}>
          <ScrollView
            style={{ backgroundColor: tokens.colors.backgroundPrimary }}
            contentContainerStyle={{ paddingBottom: 100 }}
            showsVerticalScrollIndicator={false}
            keyboardShouldPersistTaps="handled"
          >
            <AIGenScreenHeader
              title={translations.headerTitle}
              onNavigationPress={handleBack}
              rightContent={
                <TouchableOpacity
                  onPress={handleGenerate}
                  disabled={isGenerating || !prompt.trim()}
                  activeOpacity={0.7}
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    backgroundColor: !isGenerating && prompt.trim() ? tokens.colors.primary : tokens.colors.surfaceVariant,
                    paddingHorizontal: tokens.spacing.md,
                    paddingVertical: tokens.spacing.xs,
                    borderRadius: tokens.borders.radius.full,
                    opacity: !isGenerating && prompt.trim() ? 1 : 0.5,
                  }}
                >
                  <AtomicText
                    type="bodyMedium"
                    style={{
                      fontWeight: "800",
                      color: !isGenerating && prompt.trim() ? tokens.colors.onPrimary : tokens.colors.textSecondary,
                      marginRight: 4,
                    }}
                  >
                    {isGenerating ? translations.generatingButton : translations.generateButton}
                  </AtomicText>
                  <AtomicIcon
                    name={isGenerating ? "refresh" : "sparkles"}
                    size="sm"
                    color={!isGenerating && prompt.trim() ? "onPrimary" : "textSecondary"}
                  />
                </TouchableOpacity>
              }
            />
            <AIGenerationConfig
              heroTitle={translations.heroTitle}
              heroSubtitle={translations.heroSubtitle}
              isGenerating={isGenerating}
              progress={progress}
              presets={transformedPresets}
              onPresetPress={() => { void handleGenerate(); }}
              prompt={prompt}
              onPromptChange={setPrompt}
              styles={transformedStyles}
              selectedStyle={selectedStyle}
              onStyleSelect={setSelectedStyle}
              duration={selectedDuration}
              durationOptions={durationOptions}
              onDurationSelect={setSelectedDuration}
              showAdvanced={showAdvanced}
              onAdvancedToggle={toggleAdvanced}
              onGenerate={handleGenerate}
              images={images}
              hideGenerateButton={true}
              translations={translations}
            />
          </ScrollView>
        </AtomicKeyboardAvoidingView>
      );
  }
};
