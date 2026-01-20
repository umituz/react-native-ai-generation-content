/**
 * Selection Step Renderer
 */

import React from "react";
import { SelectionScreen } from "../../screens/SelectionScreen";
import { getSelectionConfig } from "../WizardStepRenderer.utils";
import type { StepDefinition } from "../../../../../../domain/entities/flow-config.types";
import type { UploadedImage } from "../../../../../../presentation/hooks/generation/useAIGenerateState";

export interface SelectionStepProps {
  readonly step: StepDefinition;
  readonly customData: Record<string, unknown>;
  readonly onBack: () => void;
  readonly onPhotoContinue: (stepId: string, image: UploadedImage) => void;
  readonly t: (key: string) => string;
}

export function renderSelectionStep({
  step,
  customData,
  onBack,
  onPhotoContinue,
  t,
}: SelectionStepProps): React.ReactElement {
  const selectionConfig = getSelectionConfig(step.config);
  const titleKey = selectionConfig?.titleKey ?? `wizard.steps.${step.id}.title`;
  const subtitleKey = selectionConfig?.subtitleKey ?? `wizard.steps.${step.id}.subtitle`;
  const existingValue = customData[step.id] as string | string[] | undefined;
  const options = selectionConfig?.options ?? [];

  return (
    <SelectionScreen
      stepId={step.id}
      translations={{
        title: t(titleKey),
        subtitle: subtitleKey ? t(subtitleKey) : undefined,
        continueButton: t("common.continue"),
        backButton: t("common.back"),
      }}
      options={options.map((opt) => ({
        id: opt.id,
        label: opt.label,
        icon: opt.icon,
        value: opt.value,
      }))}
      config={{
        multiSelect: selectionConfig?.multiSelect ?? false,
        required: step.required ?? true,
      }}
      initialValue={existingValue}
      onBack={onBack}
      onContinue={(value) => {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        onPhotoContinue(step.id, { uri: String(value), selection: value, previewUrl: "" } as unknown as any);
      }}
    />
  );
}
