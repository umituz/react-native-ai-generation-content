/**
 * TextToImageWizardFlow
 * Step-based wizard flow for text-to-image generation
 */

import React, { useMemo } from "react";
import { View, StyleSheet } from "react-native";
import { useAppDesignTokens } from "@umituz/react-native-design-system/theme";
import { GenericWizardFlow } from "../../../../domains/generation/wizard/presentation/components";
import { TEXT_TO_IMAGE_WIZARD_CONFIG } from "../../../../domains/generation/wizard/configs";
import { useAIFeatureGate } from "../../../../domains/access-control";
import {
  createScenarioData,
  useWizardFlowHandlers,
  AutoSkipPreview,
} from "../../../shared";
import type { BaseWizardFlowProps } from "../../../../domains/generation/wizard/presentation/components/WizardFlow.types";

export type TextToImageWizardFlowProps = BaseWizardFlowProps;

export const TextToImageWizardFlow: React.FC<TextToImageWizardFlowProps> = (props) => {
  const {
    model,
    userId,
    creditCost,
    calculateCredits,
    onNetworkError,
    onGenerationStart: appOnGenerationStart,
    onGenerationComplete,
    onGenerationError,
    onBack,
    t,
    alertMessages,
  } = props;

  const tokens = useAppDesignTokens();

  const { requireFeature } = useAIFeatureGate({
    creditCost,
    onNetworkError,
  });

  if (!alertMessages) {
    throw new Error("TextToImageWizardFlow: alertMessages is required");
  }

  const scenario = useMemo(
    () =>
      createScenarioData(
        {
          id: "text-to-image",
          outputType: "image",
          inputType: "text",
          model,
          titleKey: "text2image.title",
        },
        t
      ),
    [model, t]
  );

  const { handleGenerationStart: defaultGenerationStart, handleGenerationComplete } = useWizardFlowHandlers({
    requireFeature,
    onGenerationComplete,
    onBack,
  });

  const handleGenerationStart = appOnGenerationStart ?? defaultGenerationStart;

  return (
    <View style={[styles.container, { backgroundColor: tokens.colors.backgroundPrimary }]}>
      <GenericWizardFlow
        featureConfig={TEXT_TO_IMAGE_WIZARD_CONFIG}
        scenario={scenario}
        userId={userId}
        alertMessages={alertMessages}
        creditCost={creditCost}
        calculateCredits={calculateCredits}
        skipResultStep={true}
        onGenerationStart={handleGenerationStart}
        onGenerationComplete={handleGenerationComplete}
        onGenerationError={onGenerationError}
        onBack={onBack}
        onTryAgain={onBack}
        t={t}
        renderPreview={(onContinue) => <AutoSkipPreview onContinue={onContinue} />}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
});
