/**
 * Preview Step Renderer
 */

import React from "react";
import { ScenarioPreviewScreen } from "../../../../../scenarios/presentation/screens/ScenarioPreviewScreen";
import type { ScenarioData } from "../../../../../scenarios/domain/scenario.types";
import type { StepDefinition } from "../../../../../../domain/entities/flow-config.types";

interface PreviewStepProps {
  readonly step: StepDefinition;
  readonly scenario: ScenarioData | undefined;
  readonly onNext: () => void;
  readonly onBack: () => void;
  readonly t: (key: string) => string;
  readonly renderPreview?: (onContinue: () => void) => React.ReactElement | null;
}

export function renderPreviewStep({
  scenario,
  onNext,
  onBack,
  t,
  renderPreview,
}: PreviewStepProps): React.ReactElement | null {
  if (renderPreview) return renderPreview(onNext);
  if (!scenario) return null;

  return (
    <ScenarioPreviewScreen
      scenario={scenario}
      translations={{
        continueButton: t("common.continue"),
        whatToExpect: t("scenarioPreview.whatToExpect"),
      }}
      onContinue={onNext}
      onBack={onBack}
      t={t}
    />
  );
}
