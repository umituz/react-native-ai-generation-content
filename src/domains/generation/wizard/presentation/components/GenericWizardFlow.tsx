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
import type { WizardFeatureConfig } from "../../domain/entities/wizard-config.types";
import { buildFlowStepsFromWizard } from "../../infrastructure/builders/dynamic-step-builder";
import { useWizardGeneration, type WizardScenarioData } from "../hooks/useWizardGeneration";
import type { AlertMessages } from "../../../../../presentation/hooks/generation/types";
import type { UploadedImage } from "../../../../../presentation/hooks/generation/useAIGenerateState";
import type { Creation } from "../../../../creations/domain/entities/Creation";
import { useResultActions } from "../../../../result-preview/presentation/hooks/useResultActions";
import { validateScenario } from "../utilities/validateScenario";
import { WizardStepRenderer } from "./WizardStepRenderer";

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

  const handlePhotoContinue = useCallback((stepId: string, image: UploadedImage) => {
    setCustomData(stepId, image);

    if (currentStepIndex === flowSteps.length - 2) {
      if (onGenerationStart) {
        onGenerationStart({ ...customData, [stepId]: image }, () => {
          nextStep();
        });
      }
      return;
    }

    nextStep();
  }, [currentStepIndex, flowSteps.length, customData, setCustomData, nextStep, onGenerationStart]);

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
        onNext={nextStep}
        onBack={handleBack}
        onPhotoContinue={handlePhotoContinue}
        onDownload={handleDownload}
        onShare={handleShare}
        onTryAgain={onTryAgain}
        t={t}
        renderPreview={renderPreview}
        renderGenerating={renderGenerating}
        renderResult={renderResult}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
