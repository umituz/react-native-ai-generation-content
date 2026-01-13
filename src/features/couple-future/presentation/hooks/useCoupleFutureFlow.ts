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

  const {
    step,
    isProcessing,
    partnerA,
    partnerB,
    partnerAName,
    partnerBName,
    scenarioConfig,
    customPrompt,
    visualStyle,
    selection,
    selectedFeature,
    selectedScenarioId,
    selectedScenarioData,
  } = state;

  useEffect(() => {
    if (step !== config.steps.GENERATING) {
      hasStarted.current = false;
      return;
    }
    if (!isProcessing || hasStarted.current) return;
    hasStarted.current = true;

    const input = buildGenerationInputFromConfig({
      partnerA: partnerA as never,
      partnerB: partnerB as never,
      partnerAName,
      partnerBName,
      scenario: scenarioConfig as never,
      customPrompt: customPrompt || undefined,
      visualStyle: visualStyle || "",
      defaultPartnerAName: generationConfig.defaultPartnerAName,
      defaultPartnerBName: generationConfig.defaultPartnerBName,
      coupleFeatureSelection: selection as never,
      visualStyles: generationConfig.visualStyleModifiers,
      customScenarioId: config.customScenarioId as string,
    });
    if (input) generate(input);
  }, [
    step,
    isProcessing,
    partnerA,
    partnerB,
    partnerAName,
    partnerBName,
    scenarioConfig,
    customPrompt,
    visualStyle,
    selection,
    config.steps.GENERATING,
    config.customScenarioId,
    generationConfig.defaultPartnerAName,
    generationConfig.defaultPartnerBName,
    generationConfig.visualStyleModifiers,
    generate,
  ]);

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
    if (selectedFeature) {
      actions.setStep(config.steps.COUPLE_FEATURE_SELECTOR);
    } else if (
      selectedScenarioId === config.customScenarioId ||
      selectedScenarioData?.requiresPhoto === false
    ) {
      actions.setStep(config.steps.TEXT_INPUT);
    } else {
      actions.setStep(config.steps.PARTNER_A);
    }
  }, [
    actions,
    config.steps.COUPLE_FEATURE_SELECTOR,
    config.steps.TEXT_INPUT,
    config.steps.PARTNER_A,
    config.customScenarioId,
    selectedFeature,
    selectedScenarioId,
    selectedScenarioData,
  ]);

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
      selectedScenarioId === config.customScenarioId
        ? config.steps.TEXT_INPUT
        : config.steps.SCENARIO_PREVIEW,
    );
  }, [
    actions,
    config.customScenarioId,
    config.steps.TEXT_INPUT,
    config.steps.SCENARIO_PREVIEW,
    selectedScenarioId,
  ]);

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
      if (selectedScenarioId === config.customScenarioId) {
        actions.setStep(config.steps.PARTNER_A);
      } else {
        actions.startGeneration();
      }
    },
    [actions, config.customScenarioId, config.steps.PARTNER_A, selectedScenarioId],
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
