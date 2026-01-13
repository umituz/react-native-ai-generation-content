/**
 * useCoupleFutureFlow Hook
 * Handles couple future wizard flow logic
 */

import { useCallback, useEffect, useRef } from "react";
import { InteractionManager } from "react-native";
import { useCoupleFutureGeneration } from "./useCoupleFutureGeneration";
import { buildGenerationInputFromConfig } from "../../infrastructure/generationUtils";
import type { UploadedImage } from "../../../partner-upload/domain/types";

export interface CoupleFutureFlowConfig<TStep, TScenarioId> {
  steps: {
    SCENARIO: TStep;
    SCENARIO_PREVIEW: TStep;
    COUPLE_FEATURE_SELECTOR: TStep;
    TEXT_INPUT: TStep;
    PARTNER_A: TStep;
    PARTNER_B: TStep;
    GENERATING: TStep;
  };
  customScenarioId: TScenarioId;
}

export interface CoupleFutureFlowState<TStep, TScenarioId> {
  step: TStep;
  selectedScenarioId: TScenarioId | null;
  selectedFeature: string | null;
  partnerA: unknown;
  partnerB: unknown;
  partnerAName: string;
  partnerBName: string;
  customPrompt: string | null;
  visualStyle: string | null;
  selection: unknown;
  isProcessing: boolean;
  scenarioConfig: unknown;
  selectedScenarioData: { requiresPhoto?: boolean } | null;
}

export interface CoupleFutureFlowActions<TStep, TScenarioId, TResult> {
  setStep: (step: TStep) => void;
  selectScenario: (id: TScenarioId) => void;
  setPartnerA: (image: unknown) => void;
  setPartnerAName: (name: string) => void;
  setPartnerB: (image: unknown) => void;
  setPartnerBName: (name: string) => void;
  setCustomPrompt: (prompt: string) => void;
  setVisualStyle: (style: string) => void;
  startGeneration: () => void;
  generationSuccess: (result: TResult) => void;
  generationError: (error: string) => void;
  requireFeature: (callback: () => void) => void;
  onNavigateToHistory: () => void;
}

export interface CoupleFutureFlowProps<TStep, TScenarioId, TResult> {
  userId?: string;
  config: CoupleFutureFlowConfig<TStep, TScenarioId>;
  state: CoupleFutureFlowState<TStep, TScenarioId>;
  actions: CoupleFutureFlowActions<TStep, TScenarioId, TResult>;
  generationConfig: {
    visualStyleModifiers: Record<string, string>;
    defaultPartnerAName: string;
    defaultPartnerBName: string;
  };
  alertMessages: {
    networkError: string;
    policyViolation: string;
    saveFailed: string;
    creditFailed: string;
    unknown: string;
  };
  processResult: (imageUrl: string, input: unknown) => TResult;
  buildCreation: (result: TResult, input: unknown) => unknown;
  onCreditsExhausted: () => void;
}

export const useCoupleFutureFlow = <TStep, TScenarioId, TResult>(
  props: CoupleFutureFlowProps<TStep, TScenarioId, TResult>,
) => {
  const { config, state, actions, generationConfig, alertMessages } = props;
  const { processResult, buildCreation, onCreditsExhausted, userId } = props;
  const hasStarted = useRef(false);

  const { generate, isGenerating, progress } =
    useCoupleFutureGeneration<TResult>({
      userId,
      onCreditsExhausted,
      onSuccess: (result) => {
        actions.generationSuccess(result);
        InteractionManager.runAfterInteractions(() => {
          setTimeout(() => actions.onNavigateToHistory(), 300);
        });
      },
      onError: actions.generationError,
      processResult: processResult as never,
      buildCreation: buildCreation as never,
      alertMessages,
    });

  useEffect(() => {
    if (state.step !== config.steps.GENERATING) {
      hasStarted.current = false;
      return;
    }
    if (!state.isProcessing || hasStarted.current) return;
    hasStarted.current = true;

    const input = buildGenerationInputFromConfig({
      partnerA: state.partnerA as never,
      partnerB: state.partnerB as never,
      partnerAName: state.partnerAName,
      partnerBName: state.partnerBName,
      scenario: state.scenarioConfig as never,
      customPrompt: state.customPrompt || undefined,
      visualStyle: state.visualStyle || "",
      defaultPartnerAName: generationConfig.defaultPartnerAName,
      defaultPartnerBName: generationConfig.defaultPartnerBName,
      coupleFeatureSelection: state.selection as never,
      visualStyles: generationConfig.visualStyleModifiers,
      customScenarioId: config.customScenarioId as string,
    });
    if (input) generate(input);
  }, [state, config, generationConfig, generate]);

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
  }, [actions, config, state]);

  const handlePartnerAContinue = useCallback(
    (image: UploadedImage, name: string) => {
      actions.setPartnerA(image);
      actions.setPartnerAName(name);
      actions.setStep(config.steps.PARTNER_B);
    },
    [actions, config.steps.PARTNER_B],
  );

  const handlePartnerABack = useCallback(() => {
    actions.setStep(
      state.selectedScenarioId === config.customScenarioId
        ? config.steps.TEXT_INPUT
        : config.steps.SCENARIO_PREVIEW,
    );
  }, [actions, config, state.selectedScenarioId]);

  const handlePartnerBContinue = useCallback(
    (image: UploadedImage, name: string) => {
      actions.requireFeature(() => {
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
    isGenerating,
    progress,
    handlers: {
      handleScenarioSelect,
      handleScenarioPreviewBack,
      handleScenarioPreviewContinue,
      handlePartnerAContinue,
      handlePartnerABack,
      handlePartnerBContinue,
      handlePartnerBBack,
      handleMagicPromptContinue,
      handleMagicPromptBack,
    },
  };
};
