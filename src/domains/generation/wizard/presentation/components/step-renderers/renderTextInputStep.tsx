/**
 * Text Input Step Renderer
 */

import React from "react";
import { TextInputScreen } from "../../screens/TextInputScreen";
import { getTextInputConfig } from "../WizardStepRenderer.utils";
import type { StepDefinition } from "../../../../../../domain/entities/flow-config.types";
import type { UploadedImage } from "../../../../../../presentation/hooks/generation/useAIGenerateState";

export interface TextInputStepProps {
  readonly step: StepDefinition;
  readonly customData: Record<string, unknown>;
  readonly onBack: () => void;
  readonly onPhotoContinue: (stepId: string, image: UploadedImage) => void;
  readonly t: (key: string) => string;
}

export function renderTextInputStep({
  step,
  customData,
  onBack,
  onPhotoContinue,
  t,
}: TextInputStepProps): React.ReactElement {
  const textConfig = getTextInputConfig(step.config);
  const titleKey = textConfig?.titleKey ?? `wizard.steps.${step.id}.title`;
  const subtitleKey = textConfig?.subtitleKey ?? `wizard.steps.${step.id}.subtitle`;
  const placeholderKey = textConfig?.placeholderKey ?? `wizard.steps.${step.id}.placeholder`;
  const existingData = customData[step.id];
  const existingText =
    typeof existingData === "string"
      ? existingData
      : typeof existingData === "object" && existingData !== null && "text" in existingData
        ? String((existingData as { text: string }).text)
        : "";

  return (
    <TextInputScreen
      stepId={step.id}
      translations={{
        title: t(titleKey),
        subtitle: subtitleKey ? t(subtitleKey) : undefined,
        placeholder: t(placeholderKey),
        continueButton: t("common.continue"),
        backButton: t("common.back"),
        examplesTitle: t("textInput.examplesTitle"),
      }}
      config={{
        minLength: textConfig?.minLength ?? 3,
        maxLength: textConfig?.maxLength ?? 1000,
        multiline: textConfig?.multiline ?? true,
      }}
      initialValue={existingText}
      onBack={onBack}
      onContinue={(text) => {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        onPhotoContinue(step.id, { uri: text, text, previewUrl: "" } as unknown as any);
      }}
    />
  );
}
