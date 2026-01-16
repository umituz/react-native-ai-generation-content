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

import React, { useMemo, useCallback, useEffect } from "react";
import { View, StyleSheet } from "react-native";
import { useAppDesignTokens } from "@umituz/react-native-design-system";
import { useFlow } from "../../../../infrastructure/flow/useFlow";
import { StepType } from "../../../../domain/entities/flow-config.types";
import type { StepDefinition } from "../../../../domain/entities/flow-config.types";
import { renderStep } from "../../infrastructure/renderers/step-renderer";
import type { WizardFeatureConfig } from "../../domain/entities/wizard-config.types";
import { buildFlowStepsFromWizard } from "../../infrastructure/builders/dynamic-step-builder";
import { useWizardGeneration, type WizardScenarioData } from "../hooks/useWizardGeneration";
import type { AlertMessages } from "../../../../presentation/hooks/generation/orchestrator.types";

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
  t,
  translations,
  renderPreview,
  renderGenerating,
  renderResult,
}) => {
  const tokens = useAppDesignTokens();

  // Build flow steps from wizard config
  const flowSteps = useMemo<StepDefinition[]>(() => {
    return buildFlowStepsFromWizard(featureConfig, {
      includePreview: !!renderPreview,
      includeGenerating: !!renderGenerating,
    });
  }, [featureConfig, renderPreview, renderGenerating]);

  // Initialize flow
  const flow = useFlow({
    steps: flowSteps,
    initialStepIndex: 0,
  });

  // Generation hook - handles AI generation automatically
  const generationHook = useWizardGeneration({
    scenario: scenario || { id: featureConfig.id, aiPrompt: "" },
    wizardData: flow.customData,
    userId,
    isGeneratingStep: flow.currentStep?.type === StepType.GENERATING,
    alertMessages,
    onSuccess: onGenerationComplete,
    onError: onGenerationError,
    onProgressChange: (progress) => {
      flow.setGenerationProgress(progress);
    },
    onCreditsExhausted,
  });

  // DEBUG logging
  if (typeof __DEV__ !== "undefined" && __DEV__) {
    console.log("[GenericWizardFlow] Render", {
      featureId: featureConfig.id,
      currentStepId: flow.currentStep?.id,
      currentStepType: flow.currentStep?.type,
      stepIndex: flow.currentStepIndex,
      totalSteps: flowSteps.length,
    });
  }

  // Notify parent when step changes
  useEffect(() => {
    if (flow.currentStep && onStepChange) {
      if (typeof __DEV__ !== "undefined" && __DEV__) {
        console.log("[GenericWizardFlow] Step changed", {
          stepId: flow.currentStep.id,
          stepType: flow.currentStep.type,
        });
      }
      onStepChange(flow.currentStep.id, flow.currentStep.type);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [flow.currentStep, flow.currentStepIndex]);

  // Handle step continue
  const handleStepContinue = useCallback(
    (stepData: Record<string, unknown>) => {
      if (typeof __DEV__ !== "undefined" && __DEV__) {
        console.log("[GenericWizardFlow] Step continue", {
          stepId: flow.currentStep?.id,
          data: stepData,
        });
      }

      // Store step data in custom data
      Object.entries(stepData).forEach(([key, value]) => {
        flow.setCustomData(key, value);
      });

      // Check if this is the last step before generating
      if (flow.currentStepIndex === flowSteps.length - 2) {
        // Next step is GENERATING
        // Notify parent and provide callback to proceed to generating
        // Parent will call proceedToGenerating() after feature gate passes
        if (onGenerationStart) {
          onGenerationStart(flow.customData, () => {
            if (typeof __DEV__ !== "undefined" && __DEV__) {
              console.log("[GenericWizardFlow] Proceeding to GENERATING step");
            }
            flow.nextStep();
          });
        }
        // DON'T call flow.nextStep() here - parent will call it via proceedToGenerating callback
        return;
      }

      // Move to next step (for all non-generation steps)
      flow.nextStep();
    },
    [flow, flowSteps.length, onGenerationStart],
  );

  // Handle back
  const handleBack = useCallback(() => {
    if (flow.currentStepIndex === 0) {
      onBack?.();
    } else {
      flow.previousStep();
    }
  }, [flow, onBack]);

  // Render current step
  const renderCurrentStep = useCallback(() => {
    const step = flow.currentStep;
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

    // Special steps with custom renderers
    switch (step.type) {
      case StepType.SCENARIO_PREVIEW:
        // Preview continues to next step automatically
        return renderPreview?.(flow.nextStep) || null;

      case StepType.GENERATING:
        return renderGenerating?.(flow.generationProgress) || null;

      case StepType.RESULT_PREVIEW:
        return renderResult?.(flow.generationResult) || null;

      default:
        // Use generic step renderer
        return renderStep({
          step,
          onContinue: handleStepContinue,
          onBack: handleBack,
          t,
          translations,
        });
    }
  }, [
    flow.currentStep,
    flow.generationProgress,
    flow.generationResult,
    renderPreview,
    renderGenerating,
    renderResult,
    handleStepContinue,
    handleBack,
    t,
    translations,
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
