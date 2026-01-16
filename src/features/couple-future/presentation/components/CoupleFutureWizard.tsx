/**
 * CoupleFutureWizard
 * Complete wizard component for couple future generation flow
 */

import React, { useCallback, useMemo } from "react";
import { View, StyleSheet } from "react-native";
import { useAppDesignTokens } from "@umituz/react-native-design-system";
import { useFlow, resetFlowStore } from "../../../../infrastructure/flow";
import { StepType } from "../../../../domain/entities/flow-config.types";
import type { StepDefinition } from "../../../../domain/entities/flow-config.types";
import type { CoupleFutureWizardProps, WizardScenarioData } from "../../domain/wizard.types";
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

  const flow = useFlow({ steps: stepDefinitions });

  const handleScenarioSelect = useCallback(
    (scenario: WizardScenarioData) => {
      flow.setCategory(scenario);
      callbacks?.onScenarioSelect?.(scenario);
      flow.nextStep();
    },
    [flow, callbacks],
  );

  const handleScenarioPreviewContinue = useCallback(() => {
    const checkFeature = callbacks?.requireFeature;
    if (checkFeature) {
      checkFeature(() => flow.nextStep());
    } else {
      flow.nextStep();
    }
  }, [flow, callbacks]);

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
      flow.startGeneration();
      callbacks?.onGenerationStart?.();
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
        return (
          <ScenarioPreviewScreen
            scenario={flow.selectedCategory as never}
            translations={translations.scenarioPreview as never}
            onBack={flow.previousStep}
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
