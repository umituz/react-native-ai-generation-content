/**
 * useCoupleFutureHandlers Hook
 * Step navigation handlers for couple future flow
 */

import { useCallback } from "react";
import type { UploadedImage } from "../../../partner-upload/domain/types";
import type { CoupleFutureFlowConfig, CoupleFutureFlowState, CoupleFutureFlowActions } from "./useCoupleFutureFlow.types";

declare const __DEV__: boolean;

interface UseCoupleFutureHandlersProps<TStep, TScenarioId, TResult> {
  config: CoupleFutureFlowConfig<TStep, TScenarioId>;
  state: CoupleFutureFlowState<TStep, TScenarioId>;
  actions: CoupleFutureFlowActions<TStep, TScenarioId, TResult>;
}

export function useCoupleFutureHandlers<TStep, TScenarioId, TResult>(
  props: UseCoupleFutureHandlersProps<TStep, TScenarioId, TResult>,
) {
  const { config, state, actions } = props;

  const handleScenarioSelect = useCallback(
    (id: string) => {
      actions.selectScenario(id as TScenarioId);
      actions.setStep(config.steps.SCENARIO_PREVIEW);
    },
    [actions, config.steps.SCENARIO_PREVIEW],
  );

  const handleScenarioPreviewBack = useCallback(
    () => actions.setStep(config.steps.SCENARIO),
    [actions, config.steps.SCENARIO],
  );

  const handleScenarioPreviewContinue = useCallback(() => {
    if (state.selectedFeature) {
      actions.setStep(config.steps.COUPLE_FEATURE_SELECTOR);
    } else if (
      state.selectedScenarioId === config.customScenarioId ||
      state.selectedScenarioData?.requiresPhoto === false
    ) {
      actions.setStep(config.steps.TEXT_INPUT);
    } else {
      actions.setStep(config.steps.PARTNER_A);
    }
  }, [actions, config, state.selectedFeature, state.selectedScenarioId, state.selectedScenarioData]);

  const handlePartnerAContinue = useCallback(
    (image: UploadedImage, name: string) => {
      actions.setPartnerA(image);
      actions.setPartnerAName(name);
      actions.setStep(config.steps.PARTNER_B);
    },
    [actions, config.steps.PARTNER_B],
  );

  const handlePartnerABack = useCallback(() => {
    const targetStep =
      state.selectedScenarioId === config.customScenarioId
        ? config.steps.TEXT_INPUT
        : config.steps.SCENARIO_PREVIEW;
    actions.setStep(targetStep);
  }, [actions, config, state.selectedScenarioId]);

  const handlePartnerBContinue = useCallback(
    (image: UploadedImage, name: string) => {
      if (typeof __DEV__ !== "undefined" && __DEV__) {
        console.log("[CoupleFutureHandlers] 🎬 handlePartnerBContinue called");
      }
      actions.requireFeature(() => {
        if (typeof __DEV__ !== "undefined" && __DEV__) {
          console.log("[CoupleFutureHandlers] 🚀 Executing: setPartnerB, setPartnerBName, startGeneration");
        }
        actions.setPartnerB(image);
        actions.setPartnerBName(name);
        actions.startGeneration();
      });
    },
    [actions],
  );

  const handlePartnerBBack = useCallback(
    () => actions.setStep(config.steps.PARTNER_A),
    [actions, config.steps.PARTNER_A],
  );

  const handleMagicPromptContinue = useCallback(
    (prompt: string, style: string) => {
      actions.setCustomPrompt(prompt);
      actions.setVisualStyle(style);
      if (state.selectedScenarioId === config.customScenarioId) {
        actions.setStep(config.steps.PARTNER_A);
      } else {
        actions.startGeneration();
      }
    },
    [actions, config, state.selectedScenarioId],
  );

  const handleMagicPromptBack = useCallback(
    () => actions.setStep(config.steps.SCENARIO_PREVIEW),
    [actions, config.steps.SCENARIO_PREVIEW],
  );

  return {
    handleScenarioSelect,
    handleScenarioPreviewBack,
    handleScenarioPreviewContinue,
    handlePartnerAContinue,
    handlePartnerABack,
    handlePartnerBContinue,
    handlePartnerBBack,
    handleMagicPromptContinue,
    handleMagicPromptBack,
  };
}
