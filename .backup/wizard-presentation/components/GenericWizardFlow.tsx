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

import React, { useMemo, useCallback, useEffect, useRef } from "react";
import { View, StyleSheet } from "react-native";
import { useAppDesignTokens } from "@umituz/react-native-design-system";
import { useFlow } from "../../../infrastructure/flow/useFlow";
import { StepType } from "../../../../../domain/entities/flow-config.types";
import type { StepDefinition } from "../../../../../domain/entities/flow-config.types";
import { renderStep } from "../../infrastructure/renderers/step-renderer";
import type { WizardFeatureConfig } from "../../domain/entities/wizard-config.types";
import { buildFlowStepsFromWizard } from "../../infrastructure/builders/dynamic-step-builder";
import { useWizardGeneration, type WizardScenarioData } from "../hooks/useWizardGeneration";
import type { AlertMessages } from "../../../../../presentation/hooks/generation/types";

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
  } = flow;

  // Handle progress change - memoized to prevent infinite loops
  const handleProgressChange = useCallback(
    (progress: number) => {
      updateProgress(progress);
    },
    [updateProgress],
  );

  // Ensure scenario has required fields - use feature config as fallback
  const validatedScenario = useMemo(() => {
    if (typeof __DEV__ !== "undefined" && __DEV__) {
      console.log("[GenericWizardFlow] Validating scenario", {
        hasScenario: !!scenario,
        scenarioId: scenario?.id,
        hasAiPrompt: scenario?.aiPrompt !== undefined,
        hasModel: !!scenario?.model,
        scenarioModel: scenario?.model,
        outputType: scenario?.outputType,
      });
    }

    if (scenario && scenario.id && scenario.aiPrompt !== undefined) {
      if (typeof __DEV__ !== "undefined" && __DEV__) {
        console.log("[GenericWizardFlow] Scenario validation passed", {
          scenarioId: scenario.id,
          model: scenario.model,
          outputType: scenario.outputType,
        });
      }
      return scenario;
    }

    // Fallback to feature config
    if (typeof __DEV__ !== "undefined" && __DEV__) {
      console.warn("[GenericWizardFlow] Scenario missing required fields, using fallback", {
        hasScenario: !!scenario,
        scenarioId: scenario?.id,
        featureConfigId: featureConfig.id,
      });
    }

    return {
      id: featureConfig.id,
      aiPrompt: "",
      outputType: "image" as const, // Default to image for safety
      title: featureConfig.id,
    };
  }, [scenario, featureConfig.id]);

  // Generation hook - handles AI generation automatically
  const generationHook = useWizardGeneration({
    scenario: validatedScenario,
    wizardData: customData,
    userId,
    isGeneratingStep: currentStep?.type === StepType.GENERATING,
    alertMessages,
    onSuccess: onGenerationComplete,
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

  // Handle step continue
  const handleStepContinue = useCallback(
    (stepData: Record<string, unknown>) => {
      if (typeof __DEV__ !== "undefined" && __DEV__) {
        console.log("[GenericWizardFlow] Step continue", {
          stepId: currentStep?.id,
          data: stepData,
        });
      }

      // Store step data in custom data
      Object.entries(stepData).forEach(([key, value]) => {
        setCustomData(key, value);
      });

      // Check if this is the last step before generating
      if (currentStepIndex === flowSteps.length - 2) {
        // Next step is GENERATING
        // Notify parent and provide callback to proceed to generating
        // Parent will call proceedToGenerating() after feature gate passes
        if (onGenerationStart) {
          onGenerationStart(customData, () => {
            if (typeof __DEV__ !== "undefined" && __DEV__) {
              console.log("[GenericWizardFlow] Proceeding to GENERATING step");
            }
            nextStep();
          });
        }
        // DON'T call nextStep() here - parent will call it via proceedToGenerating callback
        return;
      }

      // Move to next step (for all non-generation steps)
      nextStep();
    },
    [currentStep, currentStepIndex, customData, setCustomData, nextStep, flowSteps.length, onGenerationStart],
  );

  // Handle back
  const handleBack = useCallback(() => {
    if (currentStepIndex === 0) {
      onBack?.();
    } else {
      previousStep();
    }
  }, [currentStepIndex, previousStep, onBack]);

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

    // Special steps with custom renderers
    switch (step.type) {
      case StepType.SCENARIO_PREVIEW:
        // Preview continues to next step automatically
        return renderPreview?.(nextStep) || null;

      case StepType.GENERATING:
        return renderGenerating?.(generationProgress) || null;

      case StepType.RESULT_PREVIEW:
        return renderResult?.(generationResult) || null;

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
    currentStep,
    generationProgress,
    generationResult,
    nextStep,
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
