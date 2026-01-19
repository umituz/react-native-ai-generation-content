/**
 * Generating Step Renderer
 */

import React from "react";
import { GeneratingScreen } from "../../screens/GeneratingScreen";
import type { WizardScenarioData } from "../../hooks/useWizardGeneration";

export interface GeneratingStepProps {
  readonly progress: number;
  readonly scenario: WizardScenarioData | undefined;
  readonly t: (key: string) => string;
  readonly renderGenerating?: (progress: number) => React.ReactElement | null;
}

export function renderGeneratingStep({
  progress,
  scenario,
  t,
  renderGenerating,
}: GeneratingStepProps): React.ReactElement | null {
  if (renderGenerating) return renderGenerating(progress);
  return <GeneratingScreen progress={progress} scenario={scenario} t={t} />;
}
