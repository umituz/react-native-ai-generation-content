/**
 * Generic Wizard Flow Component
 * ONE wizard to rule them all!
 *
 * Works for:
 * - Couple features (romantic-kiss, ai-hug, etc.)
 * - Face swap
 * - Image-to-video
 * - Text-to-video
 * - ANY future feature!
 *
 * NO feature-specific code here - everything driven by configuration!
 */

import React, { useMemo, useCallback, useEffect, useRef, useState } from "react";
import { View, StyleSheet } from "react-native";
import { useAppDesignTokens } from "@umituz/react-native-design-system";
import { useFlow } from "../../../infrastructure/flow/useFlow";
import { StepType, type StepDefinition } from "../../../../../domain/entities/flow-config.types";
import type { WizardFeatureConfig, WizardStepConfig } from "../../domain/entities/wizard-config.types";
import { buildFlowStepsFromWizard } from "../../infrastructure/builders/dynamic-step-builder";
import { useWizardGeneration, type WizardScenarioData } from "../hooks/useWizardGeneration";
import type { AlertMessages } from "../../../../../presentation/hooks/generation/types";
import type { UploadedImage } from "../../../../../presentation/hooks/generation/useAIGenerateState";
import { GenericPhotoUploadScreen } from "../screens/GenericPhotoUploadScreen";
import { GeneratingScreen } from "../screens/GeneratingScreen";
import { ScenarioPreviewScreen } from "../../../../scenarios/presentation/screens/ScenarioPreviewScreen";
import { ResultPreviewScreen } from "../../../../result-preview/presentation/components/ResultPreviewScreen";
import { useResultActions } from "../../../../result-preview/presentation/hooks/useResultActions";
import type { Creation } from "../../../../creations/domain/entities/Creation";

export interface GenericWizardFlowProps {
  readonly featureConfig: WizardFeatureConfig;
  readonly scenario?: WizardScenarioData;
  readonly userId?: string;
  readonly alertMessages?: AlertMessages;
  readonly onStepChange?: (stepId: string, stepType: StepType | string) => void;
  readonly onGenerationStart?: (data: Record<string, unknown>, proceedToGenerating: () => void) => void;
  readonly onGenerationComplete?: (result: unknown) => void;
  readonly onGenerationError?: (error: string) => void;
  readonly onCreditsExhausted?: () => void;
  readonly onBack?: () => void;
  readonly onTryAgain?: () => void;
  readonly t: (key: string) => string;
  readonly translations?: Record<string, string>;
  readonly renderPreview?: (onContinue: () => void) => React.ReactElement | null;
  readonly renderGenerating?: (progress: number) => React.ReactElement | null;
  readonly renderResult?: (result: unknown) => React.ReactElement | null;
}

export const GenericWizardFlow: React.FC<GenericWizardFlowProps> = ({
  featureConfig,
  scenario,
  userId,
  alertMessages,
  onStepChange,
  onGenerationStart,
  onGenerationComplete,
  onGenerationError,
  onCreditsExhausted,
  onBack,
  onTryAgain,
  t,
  translations: _translations,
  renderPreview,
  renderGenerating,
  renderResult,
}) => {
  const tokens = useAppDesignTokens();
  const [currentCreation, setCurrentCreation] = useState<Creation | null>(null);

  const flowSteps = useMemo<StepDefinition[]>(() => {
    return buildFlowStepsFromWizard(featureConfig, {
      includePreview: true,
      includeGenerating: true,
    });
  }, [featureConfig]);

  // Initialize flow and destructure to prevent infinite loops
  const flow = useFlow({
    steps: flowSteps,
    initialStepIndex: 0,
  });

  // Destructure flow to get stable references for useCallback dependencies
  const {
    currentStep,
    currentStepIndex,
    customData,
    generationProgress,
    generationResult,
    nextStep,
    previousStep,
    setCustomData,
    updateProgress,
    setResult,
  } = flow;

  const resultImageUrl = currentCreation?.output?.imageUrl || currentCreation?.uri || "";
  const { isSaving, isSharing, handleDownload, handleShare } = useResultActions({
    imageUrl: resultImageUrl,
  });

  const handleProgressChange = useCallback(
    (progress: number) => {
      updateProgress(progress);
    },
    [updateProgress],
  );

  const handleGenerationComplete = useCallback(
    (result: unknown) => {
      if (typeof __DEV__ !== "undefined" && __DEV__) {
        console.log("[GenericWizardFlow] Generation completed, saving result and advancing to result preview");
      }
      setResult(result);
      setCurrentCreation(result as Creation);
      nextStep();
      onGenerationComplete?.(result);
    },
    [setResult, nextStep, onGenerationComplete],
  );

  // Validate scenario - NO FALLBACK, aiPrompt is REQUIRED
  const validatedScenario = useMemo(() => {
    if (typeof __DEV__ !== "undefined" && __DEV__) {
      console.log("[GenericWizardFlow] Validating scenario", {
        hasScenario: !!scenario,
        scenarioId: scenario?.id,
        hasAiPrompt: !!scenario?.aiPrompt,
        aiPromptValue: scenario?.aiPrompt,
        aiPromptLength: scenario?.aiPrompt?.length,
        hasModel: !!scenario?.model,
        scenarioModel: scenario?.model,
        outputType: scenario?.outputType,
        fullScenario: JSON.stringify(scenario, null, 2),
      });
    }

    if (!scenario || !scenario.id) {
      throw new Error("[GenericWizardFlow] Scenario is required");
    }

    if (!scenario.aiPrompt || scenario.aiPrompt.trim() === "") {
      if (typeof __DEV__ !== "undefined" && __DEV__) {
        console.error("[GenericWizardFlow] CRITICAL: Scenario missing aiPrompt!", {
          scenarioId: scenario.id,
          aiPrompt: scenario.aiPrompt,
          fullScenario: scenario,
        });
      }
      throw new Error(`[GenericWizardFlow] Scenario "${scenario.id}" must have aiPrompt field`);
    }

    if (typeof __DEV__ !== "undefined" && __DEV__) {
      console.log("[GenericWizardFlow] ✅ Scenario validation passed", {
        scenarioId: scenario.id,
        model: scenario.model,
        outputType: scenario.outputType,
        promptLength: scenario.aiPrompt.length,
        promptPreview: scenario.aiPrompt.substring(0, 100),
      });
    }

    return scenario;
  }, [scenario]);

  // Generation hook - handles AI generation automatically
  // Note: Hook is used for its side effects (automatic generation)
  useWizardGeneration({
    scenario: validatedScenario,
    wizardData: customData,
    userId,
    isGeneratingStep: currentStep?.type === StepType.GENERATING,
    alertMessages,
    onSuccess: handleGenerationComplete,
    onError: onGenerationError,
    onProgressChange: handleProgressChange,
    onCreditsExhausted,
  });

  // Track previous step ID to prevent infinite loops
  const prevStepIdRef = useRef<string | undefined>(undefined);

  // DEBUG logging
  if (typeof __DEV__ !== "undefined" && __DEV__) {
    console.log("[GenericWizardFlow] Render", {
      featureId: featureConfig.id,
      currentStepId: currentStep?.id,
      currentStepType: currentStep?.type,
      stepIndex: currentStepIndex,
      totalSteps: flowSteps.length,
    });
  }

  // Notify parent when step changes
  // Only call onStepChange when step ID actually changes (not on every object reference change)
  useEffect(() => {
    if (currentStep && onStepChange) {
      const currentStepId = currentStep.id;
      // Only notify if step ID changed
      if (prevStepIdRef.current !== currentStepId) {
        prevStepIdRef.current = currentStepId;
        if (typeof __DEV__ !== "undefined" && __DEV__) {
          console.log("[GenericWizardFlow] Step changed", {
            stepId: currentStep.id,
            stepType: currentStep.type,
          });
        }
        onStepChange(currentStep.id, currentStep.type);
      }
    }
  }, [currentStep, currentStepIndex, onStepChange]);

  // Handle back
  const handleBack = useCallback(() => {
    if (currentStepIndex === 0) {
      onBack?.();
    } else {
      previousStep();
    }
  }, [currentStepIndex, previousStep, onBack]);

  // Handle photo continue - saves photo and moves to next step
  const handlePhotoContinue = useCallback((stepId: string, image: UploadedImage) => {
    setCustomData(stepId, image);

    // Check if this is the last step before generating
    if (currentStepIndex === flowSteps.length - 2) {
      // Next step is GENERATING - call onGenerationStart
      if (onGenerationStart) {
        onGenerationStart({ ...customData, [stepId]: image }, () => {
          if (typeof __DEV__ !== "undefined" && __DEV__) {
            console.log("[GenericWizardFlow] Proceeding to GENERATING step");
          }
          nextStep();
        });
      }
      return;
    }

    nextStep();
  }, [currentStepIndex, flowSteps.length, customData, setCustomData, nextStep, onGenerationStart]);

  // Render current step
  const renderCurrentStep = useCallback(() => {
    const step = currentStep;
    if (!step) {
      if (typeof __DEV__ !== "undefined" && __DEV__) {
        console.warn("[GenericWizardFlow] No current step!");
      }
      return null;
    }

    if (typeof __DEV__ !== "undefined" && __DEV__) {
      console.log("[GenericWizardFlow] Rendering step", {
        stepId: step.id,
        stepType: step.type,
      });
    }

    switch (step.type) {
      case StepType.SCENARIO_PREVIEW: {
        if (renderPreview) {
          return renderPreview(nextStep);
        }
        return (
          <ScenarioPreviewScreen
            scenario={scenario}
            translations={{
              continueButton: t("common.continue"),
              whatToExpect: t("scenarioPreview.whatToExpect"),
            }}
            onContinue={nextStep}
            onBack={handleBack}
            t={t}
          />
        );
      }

      case StepType.GENERATING: {
        if (renderGenerating) {
          return renderGenerating(generationProgress);
        }
        return (
          <GeneratingScreen
            progress={generationProgress}
            scenario={scenario}
            t={t}
          />
        );
      }

      case StepType.RESULT_PREVIEW: {
        if (renderResult) {
          return renderResult(generationResult);
        }
        const creation = generationResult as Creation;
        const imageUrl = creation?.output?.imageUrl || creation?.uri || "";
        if (!imageUrl) return null;
        return (
          <ResultPreviewScreen
            imageUrl={imageUrl}
            isSaving={isSaving}
            isSharing={isSharing}
            onDownload={handleDownload}
            onShare={handleShare}
            onTryAgain={onTryAgain || onBack || (() => {})}
            onNavigateBack={onTryAgain || onBack || (() => {})}
            translations={{
              title: t("generation.result.title"),
              yourResult: t("generation.result.yourResult"),
              saveButton: t("generation.result.save"),
              saving: t("generation.result.saving"),
              shareButton: t("generation.result.share"),
              sharing: t("generation.result.sharing"),
              tryAnother: t("generation.result.tryAnother"),
            }}
          />
        );
      }

      case StepType.PARTNER_UPLOAD: {
        // Get wizard step config
        const wizardConfig = step.config as WizardStepConfig;

        // Use titleKey from config, fallback to step-specific translation key
        const titleKey = wizardConfig?.titleKey || `wizard.steps.${step.id}.title`;
        const title = t(titleKey);

        // Subtitle from config
        const subtitleKey = wizardConfig?.subtitleKey || `wizard.steps.${step.id}.subtitle`;
        const subtitle = t(subtitleKey);

        // Get existing photo for this step from customData
        const existingPhoto = customData[step.id] as UploadedImage | undefined;

        return (
          <GenericPhotoUploadScreen
            translations={{
              title,
              subtitle,
              continue: t("common.continue"),
              tapToUpload: t("photoUpload.tapToUpload"),
              selectPhoto: t("photoUpload.selectPhoto"),
              change: t("common.change"),
              fileTooLarge: t("common.errors.file_too_large"),
              maxFileSize: t("common.errors.max_file_size"),
              error: t("common.error"),
              uploadFailed: t("common.errors.upload_failed"),
            }}
            t={t}
            onBack={handleBack}
            onContinue={(image) => handlePhotoContinue(step.id, image)}
            existingImage={existingPhoto}
          />
        );
      }

      default:
        // Other step types should be handled by custom render props
        if (typeof __DEV__ !== "undefined" && __DEV__) {
          console.warn("[GenericWizardFlow] Unhandled step type", { stepType: step.type });
        }
        return null;
    }
  }, [
    currentStep,
    customData,
    generationProgress,
    generationResult,
    nextStep,
    renderPreview,
    renderGenerating,
    renderResult,
    handlePhotoContinue,
    handleBack,
    isSaving,
    isSharing,
    handleDownload,
    handleShare,
    onTryAgain,
    onBack,
    scenario,
    t,
  ]);

  return (
    <View style={[styles.container, { backgroundColor: tokens.colors.backgroundPrimary }]}>
      {renderCurrentStep()}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
