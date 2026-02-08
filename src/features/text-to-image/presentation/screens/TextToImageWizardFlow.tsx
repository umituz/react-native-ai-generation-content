/**
 * TextToImageWizardFlow
 * Step-based wizard flow for text-to-image generation
 */

import React, { useMemo } from "react";
import { View, StyleSheet } from "react-native";
import { useAppDesignTokens } from "@umituz/react-native-design-system";
import { GenericWizardFlow } from "../../../../domains/generation/wizard/presentation/components";
import { TEXT_TO_IMAGE_WIZARD_CONFIG } from "../../../../domains/generation/wizard/configs";
import { useAIFeatureGate } from "../../../../domains/access-control";
import {
  createDefaultAlerts,
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
    onNetworkError,
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

  const defaultAlerts = useMemo(() => createDefaultAlerts(t), [t]);

  const { handleGenerationStart, handleGenerationComplete } = useWizardFlowHandlers({
    requireFeature,
    onGenerationComplete,
    onBack,
  });

  return (
    <View style={[styles.container, { backgroundColor: tokens.colors.backgroundPrimary }]}>
      <GenericWizardFlow
        featureConfig={TEXT_TO_IMAGE_WIZARD_CONFIG}
        scenario={scenario}
        userId={userId}
        alertMessages={alertMessages ?? defaultAlerts}
        creditCost={creditCost}
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
