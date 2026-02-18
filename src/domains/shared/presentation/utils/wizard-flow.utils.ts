/**
 * Wizard Flow Utilities
 * Common utilities for wizard flow screens
 */

import { useCallback } from "react";
import type { WizardScenarioData } from "../../../../domains/generation/wizard/presentation/hooks/useWizardGeneration";
import type { AlertMessages } from "../../../../presentation/hooks/generation/types";

/**
 * Creates default alert messages for wizard flows
 */
export function createDefaultAlerts(t: (key: string) => string): AlertMessages {
  return {
    networkError: t("common.errors.network"),
    policyViolation: t("common.errors.policy"),
    saveFailed: t("common.errors.saveFailed"),
    creditFailed: t("common.errors.creditFailed"),
    unknown: t("common.errors.unknown"),
  };
}

/**
 * Configuration for wizard flow utilities
 */
interface WizardFlowConfig {
  readonly id: string;
  readonly outputType: "image" | "video";
  readonly inputType: "text" | "single" | "dual";
  readonly model: string;
  readonly titleKey: string;
}

/**
 * Creates wizard scenario data from config
 */
export function createScenarioData(
  config: WizardFlowConfig,
  t: (key: string) => string
): WizardScenarioData {
  return {
    id: config.id,
    outputType: config.outputType,
    inputType: config.inputType,
    model: config.model,
    title: t(config.titleKey),
  };
}

/**
 * Hook for wizard flow handlers
 */
interface UseWizardFlowHandlersOptions {
  readonly requireFeature: (proceed: () => void) => void;
  readonly onGenerationComplete?: () => void;
  readonly onBack: () => void;
}

export function useWizardFlowHandlers({
  requireFeature,
  onGenerationComplete,
  onBack,
}: UseWizardFlowHandlersOptions) {
  const handleGenerationStart = useCallback(
    (_data: Record<string, unknown>, proceed: () => void) => {
      requireFeature(proceed);
    },
    [requireFeature]
  );

  const handleGenerationComplete = useCallback(() => {
    onGenerationComplete?.();
    onBack();
  }, [onGenerationComplete, onBack]);

  return {
    handleGenerationStart,
    handleGenerationComplete,
  };
}

/**
 * Wizard flow type definitions
 */
