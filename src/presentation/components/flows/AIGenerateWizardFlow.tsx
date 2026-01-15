
import React, { useMemo, useCallback, useEffect } from "react";
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
import { useAIGenerateState, AIGenerateStep } from "../../hooks/generation/useAIGenerateState";
import { getAIFeatureConfig, hasAIFeature } from "../../screens/ai-feature/registry";

export interface AIGenerateWizardFlowProps {
  readonly featureType: string;
  readonly translations: {
    headerTitle: string;
    uploadSubtitle: string;
    uploadSubtitle2: string;
    continue: string;
    tapToUpload: string;
    selectPhoto: string;
    change: string;
    analyzing: string;
    error: string;
    uploadFailed: string;
    aiDisclosure: string;
    heroTitle: string;
    heroSubtitle: string;
    presetsTitle: string;
    showAdvancedLabel: string;
    hideAdvancedLabel: string;
    promptTitle: string;
    promptPlaceholder: string;
    styleTitle: string;
    durationTitle: string;
    generateButton: string;
    generatingButton: string;
    processingTitle: string;
    processingMessage: string;
    processingHint: string;
    successTitle: string;
    saveButton: string;
    tryAgainButton: string;
    fileTooLarge: string;
    maxFileSize: string;
  };
  readonly styleOptions: any[];
  readonly presets: any[];
  readonly durationOptions: number[];
  readonly onGenerate: (data: {
    prompt: string;
    style: string;
    duration: number;
    images: { uri: string }[];
  }) => Promise<string | null>;
  readonly onBack?: () => void;
  readonly t: (key: string) => string;
}

export const AIGenerateWizardFlow: React.FC<AIGenerateWizardFlowProps> = ({
  featureType,
  translations,
  styleOptions,
  presets,
  durationOptions,
  onGenerate,
  onBack: onBackProp,
  t,
}) => {
  const tokens = useAppDesignTokens();
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
    setIsGenerating,
    progress,
    setProgress,
    result,
    setResult,
  } = useAIGenerateState();

  const imageCountRequired = useMemo(() => {
    if (!featureType || !hasAIFeature(featureType)) return 0;
    const config = getAIFeatureConfig(featureType as any);
    if (config.mode === "dual" || config.mode === "dual-video") return 2;
    if (config.mode === "single" || config.mode === "single-with-prompt")
      return 1;
    return 0;
  }, [featureType]);

  useEffect(() => {
    if (currentStep === AIGenerateStep.INFO) {
      if (imageCountRequired > 0) {
        setCurrentStep(AIGenerateStep.UPLOAD_1);
      } else {
        setCurrentStep(AIGenerateStep.CONFIG);
      }
    }
  }, [featureType, imageCountRequired, setCurrentStep, currentStep]);

  const handleBack = useCallback(() => {
    if (currentStep === AIGenerateStep.UPLOAD_1) {
      onBackProp?.();
    } else if (currentStep === AIGenerateStep.UPLOAD_2) {
      setCurrentStep(AIGenerateStep.UPLOAD_1);
    } else if (currentStep === AIGenerateStep.CONFIG) {
      if (imageCountRequired > 1) {
        setCurrentStep(AIGenerateStep.UPLOAD_2);
      } else if (imageCountRequired > 0) {
        setCurrentStep(AIGenerateStep.UPLOAD_1);
      } else {
        onBackProp?.();
      }
    } else if (currentStep === AIGenerateStep.RESULT) {
      setCurrentStep(AIGenerateStep.CONFIG);
    }
  }, [currentStep, setCurrentStep, imageCountRequired, onBackProp]);

  const handleNext = useCallback(() => {
    if (currentStep === AIGenerateStep.UPLOAD_1) {
      if (imageCountRequired > 1) {
        setCurrentStep(AIGenerateStep.UPLOAD_2);
      } else {
        setCurrentStep(AIGenerateStep.CONFIG);
      }
    } else if (currentStep === AIGenerateStep.UPLOAD_2) {
      setCurrentStep(AIGenerateStep.CONFIG);
    }
  }, [currentStep, setCurrentStep, imageCountRequired]);

  const handleGenerate = useCallback(async () => {
    setIsGenerating(true);
    setProgress(10);
    setCurrentStep(AIGenerateStep.GENERATING);

    try {
      const output = await onGenerate({
        prompt,
        style: selectedStyle,
        duration: selectedDuration,
        images,
      });
      setResult(output);
      setCurrentStep(AIGenerateStep.RESULT);
    } catch (error) {
      // Error handling should be added here
      console.error("Generation failed", error);
      setCurrentStep(AIGenerateStep.CONFIG);
    } finally {
      setIsGenerating(false);
      setProgress(0);
    }
  }, [onGenerate, prompt, selectedStyle, selectedDuration, images, setCurrentStep, setIsGenerating, setProgress, setResult]);

  switch (currentStep) {
    case AIGenerateStep.UPLOAD_1:
    case AIGenerateStep.UPLOAD_2: {
      const isStep2 = currentStep === AIGenerateStep.UPLOAD_2;
      return (
        <PartnerStepScreen
          t={t}
          onBack={handleBack}
          onContinue={(img: any) => {
            setStepImage(isStep2 ? 1 : 0, {
              uri: img.uri,
              previewUrl: img.previewUrl || img.uri,
            });
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
          config={{
            showFaceDetection: featureType === "face-swap",
            showNameInput: false,
            showPhotoTips: true,
          }}
        />
      );
    }

    case AIGenerateStep.GENERATING:
      return (
        <ScreenLayout
          header={
            <AIGenScreenHeader
              title={translations.headerTitle}
              onNavigationPress={handleBack}
            />
          }
        >
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
      return (
        <ScreenLayout
          header={
            <AIGenScreenHeader
              title={translations.headerTitle}
              onNavigationPress={handleBack}
            />
          }
        >
          <AIGenerationResult
            successText={translations.successTitle}
            primaryAction={{
              label: translations.saveButton,
              onPress: () => {},
              icon: "download",
            }}
            secondaryAction={{
              label: translations.tryAgainButton,
              onPress: () => setCurrentStep(AIGenerateStep.CONFIG),
              icon: "refresh",
            }}
          >
            <Image
              source={{ uri: result || "" }}
              style={{ width: "100%", aspectRatio: 2 / 3, borderRadius: 16 }}
              resizeMode="cover"
            />
          </AIGenerationResult>
        </ScreenLayout>
      );

    default:
      return (
        <AtomicKeyboardAvoidingView
          offset={Platform.OS === "ios" ? 94 : 0}
        >
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
              presets={presets}
              onPresetPress={handleGenerate as any}
              prompt={prompt}
              onPromptChange={setPrompt}
              styles={styleOptions}
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
              translations={{
                presetsTitle: translations.presetsTitle,
                showAdvancedLabel: translations.showAdvancedLabel,
                hideAdvancedLabel: translations.hideAdvancedLabel,
                promptTitle: translations.promptTitle,
                promptPlaceholder: translations.promptPlaceholder,
                styleTitle: translations.styleTitle,
                durationTitle: translations.durationTitle,
                generateButton: translations.generateButton,
                generatingButton: translations.generatingButton,
              }}
            />
          </ScrollView>
        </AtomicKeyboardAvoidingView>
      );
  }
};
