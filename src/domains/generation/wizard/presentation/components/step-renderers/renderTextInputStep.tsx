/**
 * Text Input Step Renderer
 */

import React from "react";
import { TextInputScreen } from "../../screens/TextInputScreen";
import { getTextInputConfig, getTextInputValue } from "../WizardStepRenderer.utils";
import type { StepDefinition } from "../../../../../../domain/entities/flow-config.types";
import type { UploadedImage } from "../../../../../../presentation/hooks/generation/useAIGenerateState";
import type { AlertMessages } from "../../../../../../presentation/hooks/generation/types";

export interface TextInputStepProps {
  readonly key?: string;
  readonly step: StepDefinition;
  readonly customData: Record<string, unknown>;
  readonly onBack: () => void;
  readonly onPhotoContinue: (stepId: string, image: UploadedImage) => void;
  readonly t: (key: string) => string;
  readonly alertMessages?: AlertMessages;
  /** Calculated credit cost from parent */
  readonly creditCost?: number;
}

export function renderTextInputStep({
  step,
  customData,
  onBack,
  onPhotoContinue,
  t,
  alertMessages,
  creditCost,
}: TextInputStepProps): React.ReactElement {
  const textConfig = getTextInputConfig(step.config);
  const titleKey = textConfig?.titleKey ?? `wizard.steps.${step.id}.title`;
  const subtitleKey = textConfig?.subtitleKey ?? `wizard.steps.${step.id}.subtitle`;
  const placeholderKey = textConfig?.placeholderKey ?? `wizard.steps.${step.id}.placeholder`;
  const existingText = getTextInputValue(customData[step.id]) ?? "";

  return (
    <TextInputScreen
      key={step.id}
      stepId={step.id}
      translations={{
        title: t(titleKey),
        subtitle: subtitleKey ? t(subtitleKey) : undefined,
        placeholder: t(placeholderKey),
        continueButton: t("common.continue"),
        backButton: t("common.back"),
        examplesTitle: t("textInput.examplesTitle"),
        contentNotAllowed: t("common.error"),
        contentNotAllowedMessage: alertMessages?.policyViolation || "This type of content is not supported. Please try a different prompt.",
      }}
      config={{
        minLength: textConfig?.minLength !== undefined ? textConfig.minLength : 3,
        maxLength: textConfig?.maxLength !== undefined ? textConfig.maxLength : 1000,
        multiline: textConfig?.multiline !== undefined ? textConfig.multiline : true,
      }}
      initialValue={existingText}
      creditCost={creditCost}
      onBack={onBack}
      onContinue={(text) => {
        onPhotoContinue(step.id, { uri: text, previewUrl: "" } as UploadedImage);
      }}
    />
  );
}
