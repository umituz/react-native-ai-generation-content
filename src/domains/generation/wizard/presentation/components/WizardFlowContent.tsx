/**
 * Wizard Flow Content Component
 * Main wizard content with generation logic
 */

import React, { useMemo, useEffect, useRef, useState, useCallback } from "react";
import { View, StyleSheet } from "react-native";
import { useAppDesignTokens } from "@umituz/react-native-design-system/theme";
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
import { extractDuration, extractResolution, getConfigDefaultDuration, getConfigDefaultResolution } from "../../infrastructure/utils/credit-value-extractors";
import { WizardStepRenderer } from "./WizardStepRenderer";
import { StarRatingPicker } from "../../../../result-preview/presentation/components/StarRatingPicker";
import type { CreditCalculatorFn } from "../../domain/types/credit-calculation.types";
import type { VideoModelConfig } from "../../../../../domain/interfaces/video-model-config.types";

interface WizardFlowContentProps {
  readonly featureConfig: WizardFeatureConfig;
  readonly scenario?: WizardScenarioData;
  readonly validatedScenario: WizardScenarioData;
  /** Model configuration - encapsulates all model-specific behavior */
  readonly modelConfig?: VideoModelConfig;
  readonly userId?: string;
  readonly alertMessages: AlertMessages;
  /** Credit cost for this generation - REQUIRED, determined by the app */
  readonly creditCost: number;
  /** Calculator function provided by APP - package calls this to get dynamic cost */
  readonly calculateCredits?: CreditCalculatorFn;
  /** Called after successful generation to deduct credits — provided by the app */
  readonly deductCredits?: (cost: number) => Promise<boolean>;
  readonly skipResultStep?: boolean;
  readonly onStepChange?: (stepId: string, stepType: StepType | string) => void;
  readonly onGenerationStart?: (
    data: Record<string, unknown>,
    proceedToGenerating: () => void,
    onError?: (error: string) => void,
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
    modelConfig,
    userId,
    alertMessages,
    creditCost,
    calculateCredits,
    deductCredits,
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

  const flowSteps = useMemo<StepDefinition[]>(() => {
    const steps = buildFlowStepsFromWizard(featureConfig, {
      includePreview: true,
      includeGenerating: true,
      includeResult: !skipResultStep,
    });

    if (typeof __DEV__ !== "undefined" && __DEV__) {
      console.log("[WizardFlowContent] flowSteps built", {
        totalSteps: steps.length,
        steps: steps.map((s, i) => `${i}: ${s.id} (${s.type})`),
      });
    }

    return steps;
  }, [featureConfig, skipResultStep]);

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

  /**
   * Calculate credit cost - CENTRALIZED CALCULATION
   * React Best Practice: Calculate derived state during render (not in useEffect)
   *
   * Flow:
   * 1. Extract values from customData using utility functions
   * 2. Call app's calculator function with normalized values
   * 3. Fallback to static creditCost if calculation incomplete
   */
  const calculatedCreditCost = useMemo(() => {
    // If no calculator provided, use static creditCost
    if (!calculateCredits) {
      return creditCost;
    }

    const outputType = validatedScenario.outputType as "video" | "image";
    const hasImageInput = validatedScenario.inputType !== "text";

    // Extract from customData, fall back to step defaults from wizard config
    // This ensures accurate credit display even before user confirms a selection
    const duration = extractDuration(customData.duration) ?? getConfigDefaultDuration(featureConfig.steps as unknown as Record<string, unknown>[]);
    const resolution = extractResolution(customData.resolution) ?? getConfigDefaultResolution(featureConfig.steps as unknown as Record<string, unknown>[]);

    // Call app's calculator
    const result = calculateCredits({
      duration,
      resolution,
      outputType,
      hasImageInput,
    });

    // Validate: must be a positive finite integer
    if (!Number.isFinite(result) || result <= 0) {
      return creditCost;
    }
    return Math.ceil(result);
  }, [customData, featureConfig.steps, validatedScenario.outputType, validatedScenario.inputType, calculateCredits, creditCost]);

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
    modelConfig,
    wizardData: customData,
    userId,
    isGeneratingStep: currentStep?.type === StepType.GENERATING,
    alertMessages,
    creditCost: calculatedCreditCost,
    deductCredits,
    onSuccess: handlers.handleGenerationComplete,
    onError: handlers.handleGenerationError,
    onCreditsExhausted,
  });

  // Live credit calculator: computes credits for a selection value without store round-trip
  const handleCalculateCreditForSelection = useCallback(
    (stepId: string, value: string | string[]) => {
      if (!calculateCredits) return creditCost;
      const previewData = { ...customData, [stepId]: { selection: value } };
      const outputType = validatedScenario.outputType as "video" | "image";
      const hasImageInput = validatedScenario.inputType !== "text";
      const duration = extractDuration(previewData.duration) ?? getConfigDefaultDuration(featureConfig.steps as unknown as Record<string, unknown>[]);
      const resolution = extractResolution(previewData.resolution) ?? getConfigDefaultResolution(featureConfig.steps as unknown as Record<string, unknown>[]);
      const result = calculateCredits({ duration, resolution, outputType, hasImageInput });
      return Number.isFinite(result) && result > 0 ? Math.ceil(result) : creditCost;
    },
    [customData, featureConfig.steps, calculateCredits, creditCost, validatedScenario.outputType, validatedScenario.inputType],
  );

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
        creditCost={calculatedCreditCost}
        onNext={handlers.handleNextStep}
        onBack={handlers.handleBack}
        onPhotoContinue={handlers.handlePhotoContinue}
        calculateCreditForSelection={calculateCredits ? handleCalculateCreditForSelection : undefined}
        onDownload={handleDownload}
        onShare={handleShare}
        onRate={() => setShowRatingPicker(true)}
        onTryAgain={onTryAgain}
        onDismissGenerating={handlers.handleDismissGenerating}
        t={t}
        alertMessages={alertMessages}
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
