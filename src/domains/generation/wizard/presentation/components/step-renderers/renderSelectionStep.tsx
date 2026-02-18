/**
 * Selection Step Renderer
 */

import React from "react";
import { SelectionScreen } from "../../screens/SelectionScreen";
import { getSelectionConfig, getSelectionValue } from "../WizardStepRenderer.utils";
import type { StepDefinition } from "../../../../../../domain/entities/flow-config.types";
import type { UploadedImage } from "../../../../../../presentation/hooks/generation/useAIGenerateState";

interface SelectionStepProps {
  readonly key?: string;
  readonly step: StepDefinition;
  readonly customData: Record<string, unknown>;
  readonly onBack: () => void;
  readonly onPhotoContinue: (stepId: string, image: UploadedImage) => void;
  readonly t: (key: string) => string;
  /** Calculated credit cost from parent */
  readonly creditCost?: number;
}


export function renderSelectionStep({
  step,
  customData,
  onBack,
  onPhotoContinue,
  t,
  creditCost,
}: SelectionStepProps): React.ReactElement {
  const selectionConfig = getSelectionConfig(step.config);
  const titleKey = selectionConfig?.titleKey ?? `wizard.steps.${step.id}.title`;
  const subtitleKey = selectionConfig?.subtitleKey ?? `wizard.steps.${step.id}.subtitle`;
  const options = selectionConfig?.options ?? [];
  const isRequired = step.required ?? true;

  // Priority: existing value > config default > auto-select single option
  const existingValue = getSelectionValue(customData[step.id]);
  const configDefault = selectionConfig?.defaultValue;
  const autoSelectValue = isRequired && options.length === 1 ? options[0].id : undefined;
  const initialValue = existingValue ?? configDefault ?? autoSelectValue;

  if (typeof __DEV__ !== "undefined" && __DEV__) {
    console.log("[renderSelectionStep] Step config:", {
      stepId: step.id,
      stepType: step.type,
      hasConfig: !!step.config,
      configType: (step.config as Record<string, unknown>)?.type,
      hasSelectionConfig: !!selectionConfig,
      configDefault,
      existingValue,
      autoSelectValue,
      initialValue,
      isRequired,
      optionsCount: options.length,
    });
  }

  return (
    <SelectionScreen
      key={step.id}
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
        required: isRequired,
        layout: selectionConfig?.layout,
      }}
      initialValue={initialValue}
      creditCost={creditCost}
      onBack={onBack}
      onContinue={(value) => {
        onPhotoContinue(step.id, { uri: String(value), selection: value, previewUrl: "" } as UploadedImage);
      }}
    />
  );
}
