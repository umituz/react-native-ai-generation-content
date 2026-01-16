/**
 * AIFeatureWizard
 * Auto-configured wizard based on feature mode
 */

import React, { useCallback, useMemo } from "react";
import { View, StyleSheet } from "react-native";
import { useAppDesignTokens } from "@umituz/react-native-design-system";
import { useFlow, resetFlowStore } from "../../../../infrastructure/flow";
import { StepType } from "../../../../domain/entities/flow-config.types";
import type { StepDefinition } from "../../../../domain/entities/flow-config.types";
import { PartnerStepScreen } from "../../../partner-upload";
import { GeneratingStepContent } from "../../../couple-future/presentation/components/GeneratingStepContent";
import {
  getFeatureMode,
  getFeatureFlow,
  type FeatureMode,
  type PrebuiltStepType,
  type FeatureWizardConfig,
} from "../../domain/types";

/** Wizard translations interface */
export interface AIFeatureWizardTranslations {
  readonly generator: {
    readonly title: string;
    readonly waitMessage: string;
    readonly hint?: string;
  };
  readonly imageUpload?: {
    readonly title: string;
    readonly subtitle: string;
    readonly continue: string;
    readonly tapToUpload: string;
    readonly selectPhoto: string;
    readonly change: string;
  };
  readonly partnerA?: {
    readonly title: string;
    readonly subtitle: string;
    readonly continue: string;
    readonly tapToUpload: string;
    readonly selectPhoto: string;
    readonly change: string;
  };
  readonly partnerB?: {
    readonly title: string;
    readonly subtitle: string;
    readonly continue: string;
    readonly tapToUpload: string;
    readonly selectPhoto: string;
    readonly change: string;
  };
  readonly prompt?: {
    readonly title?: string;
    readonly placeholder: string;
    readonly label?: string;
  };
}

/** Wizard callbacks */
export interface AIFeatureWizardCallbacks {
  readonly onGenerationStart?: () => void;
  readonly onGenerationSuccess?: (result: unknown) => void;
  readonly onGenerationError?: (error: string) => void;
  readonly onImageUpload?: (image: { uri: string; base64: string; mimeType: string }) => void;
  readonly onPartnerAUpload?: (image: { uri: string; base64: string; mimeType: string }) => void;
  readonly onPartnerBUpload?: (image: { uri: string; base64: string; mimeType: string }) => void;
  readonly requireFeature?: (callback: () => void) => boolean;
}

/** Wizard props */
export interface AIFeatureWizardProps {
  readonly featureId: string;
  readonly config?: Partial<FeatureWizardConfig>;
  readonly translations: AIFeatureWizardTranslations;
  readonly callbacks?: AIFeatureWizardCallbacks;
  readonly t: (key: string) => string;
}

const mapPrebuiltStepToStepType = (step: PrebuiltStepType): StepType => {
  const mapping: Record<PrebuiltStepType, StepType> = {
    image_upload: StepType.PARTNER_UPLOAD,
    partner_a_upload: StepType.PARTNER_UPLOAD,
    partner_b_upload: StepType.PARTNER_UPLOAD,
    prompt_input: StepType.TEXT_INPUT,
    style_selector: StepType.FEATURE_SELECTION,
    duration_selector: StepType.FEATURE_SELECTION,
    scenario_selection: StepType.SCENARIO_SELECTION,
    scenario_preview: StepType.SCENARIO_PREVIEW,
    generating: StepType.GENERATING,
    result: StepType.RESULT_PREVIEW,
  };
  return mapping[step];
};

const createStepDefinitions = (
  featureId: string,
  mode: FeatureMode,
): readonly StepDefinition[] => {
  const flow = getFeatureFlow(mode);
  return flow.map((step) => ({
    id: step.toUpperCase(),
    type: mapPrebuiltStepToStepType(step),
    required: true,
  }));
};

export const AIFeatureWizard: React.FC<AIFeatureWizardProps> = ({
  featureId,
  config,
  translations,
  callbacks,
  t,
}) => {
  const tokens = useAppDesignTokens();
  const mode = config?.mode ?? getFeatureMode(featureId);

  const stepDefinitions = useMemo(
    () => createStepDefinitions(featureId, mode),
    [featureId, mode],
  );

  const flow = useFlow({ steps: stepDefinitions });

  const handleImageContinue = useCallback(
    (image: { uri: string; base64: string; mimeType: string }, _name?: string) => {
      flow.setPartnerImage("single", image);
      callbacks?.onImageUpload?.(image);
      flow.startGeneration();
      callbacks?.onGenerationStart?.();
    },
    [flow, callbacks],
  );

  const handlePartnerAContinue = useCallback(
    (image: { uri: string; base64: string; mimeType: string }, _name?: string) => {
      flow.setPartnerImage("A", image);
      callbacks?.onPartnerAUpload?.(image);
      flow.nextStep();
    },
    [flow, callbacks],
  );

  const handlePartnerBContinue = useCallback(
    (image: { uri: string; base64: string; mimeType: string }, _name?: string) => {
      flow.setPartnerImage("B", image);
      callbacks?.onPartnerBUpload?.(image);
      flow.startGeneration();
      callbacks?.onGenerationStart?.();
    },
    [flow, callbacks],
  );

  const renderCurrentStep = useCallback(() => {
    const step = flow.currentStep;
    if (!step) return null;

    switch (step.id) {
      case "IMAGE_UPLOAD":
        return (
          <PartnerStepScreen
            key="image"
            translations={translations.imageUpload as never}
            t={t}
            initialName=""
            config={{ showPhotoTips: true, maxFileSizeMB: 10, maxNameLength: 30 }}
            onBack={flow.previousStep}
            onContinue={handleImageContinue as never}
          />
        );

      case "PARTNER_A_UPLOAD":
        return (
          <PartnerStepScreen
            key="a"
            translations={translations.partnerA as never}
            t={t}
            initialName=""
            config={{ showPhotoTips: true, maxFileSizeMB: 10, maxNameLength: 30 }}
            onBack={flow.previousStep}
            onContinue={handlePartnerAContinue as never}
          />
        );

      case "PARTNER_B_UPLOAD":
        return (
          <PartnerStepScreen
            key="b"
            translations={translations.partnerB as never}
            t={t}
            initialName=""
            config={{ showPhotoTips: true, maxFileSizeMB: 10, maxNameLength: 30 }}
            onBack={flow.previousStep}
            onContinue={handlePartnerBContinue as never}
          />
        );

      case "GENERATING":
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
    translations,
    t,
    handleImageContinue,
    handlePartnerAContinue,
    handlePartnerBContinue,
  ]);

  return (
    <View style={[styles.container, { backgroundColor: tokens.colors.backgroundPrimary }]}>
      {renderCurrentStep()}
    </View>
  );
};

export { resetFlowStore as resetAIFeatureWizard };

const styles = StyleSheet.create({
  container: { flex: 1 },
});
