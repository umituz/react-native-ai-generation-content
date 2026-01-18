/**
 * Generic Wizard Flow Component
 * Config-driven wizard for AI generation features
 */

import React, { useMemo, useCallback, useEffect, useRef, useState } from "react";
import { View, StyleSheet } from "react-native";
import { useAppDesignTokens } from "@umituz/react-native-design-system";
import { useFlow } from "../../../infrastructure/flow/useFlow";
import { StepType, type StepDefinition } from "../../../../../domain/entities/flow-config.types";
import type { WizardFeatureConfig } from "../../domain/entities/wizard-config.types";
import { buildFlowStepsFromWizard } from "../../infrastructure/builders/dynamic-step-builder";
import { useWizardGeneration, type WizardScenarioData } from "../hooks/useWizardGeneration";
import type { AlertMessages } from "../../../../../presentation/hooks/generation/types";
import type { UploadedImage } from "../../../../../presentation/hooks/generation/useAIGenerateState";
import type { Creation } from "../../../../creations/domain/entities/Creation";
import { useResultActions } from "../../../../result-preview/presentation/hooks/useResultActions";
import { validateScenario } from "../utilities/validateScenario";
import { WizardStepRenderer } from "./WizardStepRenderer";
import { StarRatingPicker } from "../../../../result-preview/presentation/components/StarRatingPicker";

declare const __DEV__: boolean;

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
  readonly onRate?: (creationId: string, rating: number, description: string) => Promise<boolean>;
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
  onRate,
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
  const [showRatingPicker, setShowRatingPicker] = useState(false);
  const [hasRated, setHasRated] = useState(false);
  const prevStepIdRef = useRef<string | undefined>(undefined);

  const flowSteps = useMemo<StepDefinition[]>(() => {
    return buildFlowStepsFromWizard(featureConfig, {
      includePreview: true,
      includeGenerating: true,
    });
  }, [featureConfig]);

  const flow = useFlow({ steps: flowSteps, initialStepIndex: 0 });
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

  const validatedScenario = useMemo(() => validateScenario(scenario), [scenario]);

  const handleProgressChange = useCallback((progress: number) => {
    updateProgress(progress);
  }, [updateProgress]);

  const handleGenerationComplete = useCallback((result: unknown) => {
    if (typeof __DEV__ !== "undefined" && __DEV__) {
      console.log("[GenericWizardFlow] Generation completed");
    }
    setResult(result);
    setCurrentCreation(result as Creation);
    nextStep();
    onGenerationComplete?.(result);
  }, [setResult, nextStep, onGenerationComplete]);

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

  useEffect(() => {
    if (currentStep && onStepChange) {
      const currentStepId = currentStep.id;
      if (prevStepIdRef.current !== currentStepId) {
        prevStepIdRef.current = currentStepId;
        onStepChange(currentStep.id, currentStep.type);
      }
    }
  }, [currentStep, currentStepIndex, onStepChange]);

  const handleBack = useCallback(() => {
    if (currentStepIndex === 0) {
      onBack?.();
    } else {
      previousStep();
    }
  }, [currentStepIndex, previousStep, onBack]);

  // Wrapper for nextStep that checks onGenerationStart before transitioning to GENERATING
  const handleNextStep = useCallback(() => {
    const nextIndex = currentStepIndex + 1;
    const nextStepDef = flowSteps[nextIndex];

    // If next step is GENERATING, we must call onGenerationStart for feature gating
    if (nextStepDef?.type === StepType.GENERATING) {
      if (typeof __DEV__ !== "undefined" && __DEV__) {
        console.log("[GenericWizardFlow] About to enter GENERATING step, calling onGenerationStart");
      }
      if (onGenerationStart) {
        onGenerationStart(customData, () => {
          if (typeof __DEV__ !== "undefined" && __DEV__) {
            console.log("[GenericWizardFlow] onGenerationStart callback invoked, proceeding to generation");
          }
          nextStep();
        });
        return;
      }
    }

    nextStep();
  }, [currentStepIndex, flowSteps, customData, onGenerationStart, nextStep]);

  const handlePhotoContinue = useCallback((stepId: string, image: UploadedImage) => {
    setCustomData(stepId, image);
    // Use handleNextStep which handles onGenerationStart check
    handleNextStep();
  }, [setCustomData, handleNextStep]);

  const handleOpenRatingPicker = useCallback(() => {
    setShowRatingPicker(true);
  }, []);

  const handleSubmitRating = useCallback(async (rating: number, description: string) => {
    if (!currentCreation?.id || !onRate) return;
    const success = await onRate(currentCreation.id, rating, description);
    if (success) setHasRated(true);
    setShowRatingPicker(false);
  }, [currentCreation, onRate]);

  const showRatingButton = Boolean(onRate) && !hasRated;

  return (
    <View style={[styles.container, { backgroundColor: tokens.colors.backgroundPrimary }]}>
      <WizardStepRenderer
        step={currentStep}
        scenario={scenario}
        customData={customData}
        generationProgress={generationProgress}
        generationResult={generationResult}
        isSaving={isSaving}
        isSharing={isSharing}
        showRating={showRatingButton}
        onNext={handleNextStep}
        onBack={handleBack}
        onPhotoContinue={handlePhotoContinue}
        onDownload={handleDownload}
        onShare={handleShare}
        onRate={handleOpenRatingPicker}
        onTryAgain={onTryAgain}
        t={t}
        renderPreview={renderPreview}
        renderGenerating={renderGenerating}
        renderResult={renderResult}
      />
      <StarRatingPicker
        visible={showRatingPicker}
        onClose={() => setShowRatingPicker(false)}
        onRate={handleSubmitRating}
        title={t("result.rateTitle")}
        submitLabel={t("common.submit")}
        cancelLabel={t("common.cancel")}
        descriptionPlaceholder={t("result.feedbackPlaceholder")}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
