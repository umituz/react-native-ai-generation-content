/**
 * CoupleFutureWizard
 * Complete wizard component for couple future generation flow
 */

import React, { useCallback, useMemo, useEffect } from "react";
import { View, StyleSheet } from "react-native";
import { useAppDesignTokens } from "@umituz/react-native-design-system";
import { useFlow, resetFlowStore } from "../../../../infrastructure/flow";
import { StepType } from "../../../../domain/entities/flow-config.types";
import type { StepDefinition } from "../../../../domain/entities/flow-config.types";
import type { CoupleFutureWizardProps } from "../../domain/wizard.types";
import { PartnerStepScreen } from "../../../partner-upload";
import { ScenarioPreviewScreen } from "../../../scenarios";
import { GeneratingStepContent } from "./GeneratingStepContent";

const createStepDefinitions = (
  config: CoupleFutureWizardProps["config"],
): readonly StepDefinition[] => {
  return config.steps.map((step) => ({
    id: step.id,
    type: step.type,
    required: step.enabled !== false,
  }));
};

export const CoupleFutureWizard: React.FC<CoupleFutureWizardProps> = ({
  config,
  translations,
  data,
  callbacks,
  t,
}) => {
  const tokens = useAppDesignTokens();

  const stepDefinitions = useMemo(
    () => createStepDefinitions(config),
    [config],
  );

  // Determine initial step: skip SCENARIO_SELECTION if scenario is pre-selected
  const initialStepIndex = useMemo(() => {
    return data.selectedScenario ? 1 : 0;
  }, [data.selectedScenario]);

  const flow = useFlow({
    steps: stepDefinitions,
    initialStepIndex,
  });

  // Notify parent app when step changes
  useEffect(() => {
    if (flow.currentStep && callbacks?.onStepChange) {
      if (typeof __DEV__ !== "undefined" && __DEV__) {
        console.log("[CoupleFutureWizard] Step changed", {
          stepId: flow.currentStep.id,
          stepType: flow.currentStep.type,
          currentStepIndex: flow.currentStepIndex,
        });
      }
      callbacks.onStepChange(flow.currentStep.id, flow.currentStep.type);
    }
  }, [flow.currentStep, flow.currentStepIndex, callbacks]);

  const handleScenarioPreviewContinue = useCallback(() => {
    if (typeof __DEV__ !== "undefined" && __DEV__) {
      console.log("[CoupleFutureWizard] Preview Continue clicked");
    }
    // No auth check needed here - just proceed to photo upload
    flow.nextStep();
  }, [flow]);

  const handlePartnerAContinue = useCallback(
    (image: { uri: string; base64: string; mimeType: string }, name?: string) => {
      flow.setPartnerImage("A", image);
      if (name) flow.setPartnerName("A", name);
      callbacks?.onPartnerUpload?.("A", image);
      flow.nextStep();
    },
    [flow, callbacks],
  );

  const handlePartnerBContinue = useCallback(
    (image: { uri: string; base64: string; mimeType: string }, name?: string) => {
      flow.setPartnerImage("B", image);
      if (name) flow.setPartnerName("B", name);
      callbacks?.onPartnerUpload?.("B", image);

      // Check auth/credits BEFORE starting generation (this consumes a credit)
      const checkFeature = callbacks?.requireFeature;
      if (checkFeature) {
        checkFeature(() => {
          flow.startGeneration();
          callbacks?.onGenerationStart?.();
        });
      } else {
        flow.startGeneration();
        callbacks?.onGenerationStart?.();
      }
    },
    [flow, callbacks],
  );

  const renderCurrentStep = useCallback(() => {
    const step = flow.currentStep;
    if (!step) return null;

    switch (step.type) {
      case StepType.SCENARIO_SELECTION:
        return null; // Rendered by parent via CategoryNavigationContainer

      case StepType.SCENARIO_PREVIEW:
        const scenario = flow.selectedCategory || data.selectedScenario;
        const handlePreviewBack = () => {
          // If we came from CategoryNavigationContainer, reset to SCENARIO step
          if (data.selectedScenario && !flow.selectedCategory) {
            callbacks?.onBackToScenarioSelection?.();
          } else {
            flow.previousStep();
          }
        };
        return (
          <ScenarioPreviewScreen
            scenario={scenario as never}
            translations={translations.scenarioPreview as never}
            onBack={handlePreviewBack}
            onContinue={handleScenarioPreviewContinue}
            t={t}
          />
        );

      case StepType.PARTNER_UPLOAD:
        const isPartnerA = step.id.includes("A") || step.id === "PARTNER_A";
        const partnerTranslations = isPartnerA
          ? translations.partnerA
          : translations.partnerB;
        const partnerConfig = isPartnerA ? config.partnerA : config.partnerB;

        return (
          <PartnerStepScreen
            key={isPartnerA ? "a" : "b"}
            translations={partnerTranslations as never}
            t={t}
            initialName=""
            config={{
              showFaceDetection: partnerConfig?.showFaceDetection ?? false,
              showNameInput: partnerConfig?.showNameInput ?? false,
              showPhotoTips: partnerConfig?.showPhotoTips ?? true,
              maxFileSizeMB: 10,
              maxNameLength: 30,
            }}
            onBack={flow.previousStep}
            onContinue={isPartnerA ? handlePartnerAContinue as never : handlePartnerBContinue as never}
          />
        );

      case StepType.GENERATING:
        return (
          <GeneratingStepContent
            progress={flow.generationProgress}
            title={translations.generator.title}
            message={translations.generator.waitMessage}
            hint={translations.generator.hint}
          />
        );

      default:
        return null;
    }
  }, [
    flow,
    config,
    translations,
    t,
    handleScenarioPreviewContinue,
    handlePartnerAContinue,
    handlePartnerBContinue,
  ]);

  return (
    <View style={[styles.container, { backgroundColor: tokens.colors.backgroundPrimary }]}>
      {renderCurrentStep()}
    </View>
  );
};

export { resetFlowStore as resetCoupleFutureWizard };

const styles = StyleSheet.create({
  container: { flex: 1 },
});
