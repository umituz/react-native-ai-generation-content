/**
 * Wizard Flow Content Component
 * Main wizard content with generation logic
 */

import React, { useMemo, useEffect, useRef, useState } from "react";
import { View, StyleSheet } from "react-native";
import { useAppDesignTokens } from "@umituz/react-native-design-system";
import { useFlow } from "../../../infrastructure/flow/useFlow";
import { StepType, type StepDefinition } from "../../../../../domain/entities/flow-config.types";
import type { WizardFeatureConfig } from "../../domain/entities/wizard-feature.types";
import { buildFlowStepsFromWizard } from "../../infrastructure/builders/dynamic-step-builder";
import { useWizardGeneration, type WizardScenarioData } from "../hooks/useWizardGeneration";
import type { AlertMessages } from "../../../../../presentation/hooks/generation/types";
import type { Creation } from "../../../../creations/domain/entities/Creation";
import { createCreationsRepository } from "../../../../creations";
import { useResultActions } from "../../../../result-preview/presentation/hooks/useResultActions";
import { useWizardFlowHandlers } from "../hooks/useWizardFlowHandlers";
import { WizardStepRenderer } from "./WizardStepRenderer";
import { StarRatingPicker } from "../../../../result-preview/presentation/components/StarRatingPicker";

export interface WizardFlowContentProps {
  readonly featureConfig: WizardFeatureConfig;
  readonly scenario?: WizardScenarioData;
  readonly validatedScenario: WizardScenarioData;
  readonly userId?: string;
  readonly alertMessages: AlertMessages;
  /** Credit cost for this generation - REQUIRED, determined by the app */
  readonly creditCost: number;
  readonly skipResultStep?: boolean;
  readonly onStepChange?: (stepId: string, stepType: StepType | string) => void;
  readonly onGenerationStart?: (
    data: Record<string, unknown>,
    proceedToGenerating: () => void,
  ) => void;
  readonly onGenerationComplete?: (result: unknown) => void;
  readonly onGenerationError?: (error: string) => void;
  readonly onCreditsExhausted?: () => void;
  readonly onBack?: () => void;
  readonly onTryAgain?: () => void;
  readonly t: (key: string) => string;
  readonly renderPreview?: (onContinue: () => void) => React.ReactElement | null;
  readonly renderGenerating?: (progress: number) => React.ReactElement | null;
  readonly renderResult?: (result: unknown) => React.ReactElement | null;
}

export const WizardFlowContent: React.FC<WizardFlowContentProps> = (props) => {
  const {
    featureConfig,
    scenario,
    validatedScenario,
    userId,
    alertMessages,
    creditCost,
    skipResultStep = false,
    onStepChange,
    onGenerationStart,
    onGenerationComplete,
    onGenerationError,
    onCreditsExhausted,
    onBack,
    onTryAgain,
    t,
    renderPreview,
    renderGenerating,
    renderResult,
  } = props;

  const tokens = useAppDesignTokens();
  const [currentCreation, setCurrentCreation] = useState<Creation | null>(null);
  const [showRatingPicker, setShowRatingPicker] = useState(false);
  const [hasRated, setHasRated] = useState(false);
  const prevStepIdRef = useRef<string | undefined>(undefined);
  const repository = useMemo(() => createCreationsRepository("creations"), []);

  const flowSteps = useMemo<StepDefinition[]>(
    () =>
      buildFlowStepsFromWizard(featureConfig, {
        includePreview: true,
        includeGenerating: true,
        includeResult: !skipResultStep,
      }),
    [featureConfig, skipResultStep],
  );

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
    setResult,
  } = flow;

  const resultImageUrl = currentCreation?.output?.imageUrl || currentCreation?.uri || "";
  const resultVideoUrl = currentCreation?.output?.videoUrl || "";
  const { isSaving, isSharing, handleDownload, handleShare } = useResultActions({
    imageUrl: resultImageUrl,
    videoUrl: resultVideoUrl,
  });

  const handlers = useWizardFlowHandlers({
    currentStepIndex,
    flowSteps,
    customData,
    skipResultStep,
    userId,
    currentCreation,
    repository,
    t,
    nextStep,
    previousStep,
    setResult,
    setCustomData,
    setCurrentCreation,
    setHasRated,
    setShowRatingPicker,
    onGenerationStart,
    onGenerationComplete,
    onGenerationError,
    onBack,
  });

  useWizardGeneration({
    scenario: validatedScenario,
    wizardData: customData,
    userId,
    isGeneratingStep: currentStep?.type === StepType.GENERATING,
    alertMessages,
    creditCost,
    onSuccess: handlers.handleGenerationComplete,
    onError: handlers.handleGenerationError,
    onCreditsExhausted,
  });

  useEffect(() => {
    if (currentStep && onStepChange && prevStepIdRef.current !== currentStep.id) {
      prevStepIdRef.current = currentStep.id;
      onStepChange(currentStep.id, currentStep.type);
    }
  }, [currentStep, onStepChange]);

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
        showRating={Boolean(userId) && !hasRated}
        onNext={handlers.handleNextStep}
        onBack={handlers.handleBack}
        onPhotoContinue={handlers.handlePhotoContinue}
        onDownload={handleDownload}
        onShare={handleShare}
        onRate={() => setShowRatingPicker(true)}
        onTryAgain={onTryAgain}
        onDismissGenerating={handlers.handleDismissGenerating}
        t={t}
        renderPreview={renderPreview}
        renderGenerating={renderGenerating}
        renderResult={renderResult}
      />
      <StarRatingPicker
        visible={showRatingPicker}
        onClose={() => setShowRatingPicker(false)}
        onRate={handlers.handleSubmitRating}
        title={t("result.rateTitle")}
        submitLabel={t("common.submit")}
        cancelLabel={t("common.cancel")}
        descriptionPlaceholder={t("result.feedbackPlaceholder")}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
});
