/**
 * useCoupleFutureFlow Hook
 * Optimized: Merged flow + generation logic
 * Uses centralized orchestrator directly
 */

import { useCallback, useEffect, useRef, useMemo } from "react";
import { InteractionManager } from "react-native";
import {
  useGenerationOrchestrator,
  type GenerationStrategy,
  type AlertMessages,
} from "../../../../presentation/hooks/generation";
import { executeCoupleFuture } from "../../infrastructure/executor";
import { buildGenerationInputFromConfig } from "../../infrastructure/generationUtils";
import { createCreationsRepository } from "../../../../domains/creations/infrastructure/adapters";
import type { UploadedImage } from "../../../partner-upload/domain/types";
import type { CoupleFutureInput } from "../../domain/types";
import type { Creation } from "../../../../domains/creations/domain/entities/Creation";

declare const __DEV__: boolean;

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
  alertMessages: AlertMessages;
  processResult: (imageUrl: string, input: CoupleFutureInput) => TResult;
  buildCreation: (result: TResult, input: CoupleFutureInput) => Creation | null;
  onCreditsExhausted: () => void;
}

export const useCoupleFutureFlow = <TStep, TScenarioId, TResult>(
  props: CoupleFutureFlowProps<TStep, TScenarioId, TResult>,
) => {
  const { config, state, actions, generationConfig, alertMessages, userId } = props;
  const { processResult, buildCreation, onCreditsExhausted } = props;
  const hasStarted = useRef(false);
  const lastInputRef = useRef<CoupleFutureInput | null>(null);
  const repository = useMemo(() => createCreationsRepository("creations"), []);

  // Strategy for orchestrator - directly uses executor
  const strategy: GenerationStrategy<CoupleFutureInput, TResult> = useMemo(
    () => ({
      execute: async (input, onProgress) => {
        if (typeof __DEV__ !== "undefined" && __DEV__) {
          console.log("[CoupleFutureFlow] 🎯 Executing generation...");
        }
        lastInputRef.current = input;
        const result = await executeCoupleFuture(
          { partnerABase64: input.partnerABase64, partnerBBase64: input.partnerBBase64, prompt: input.prompt },
          { onProgress },
        );
        if (!result.success || !result.imageUrl) throw new Error(result.error || "Generation failed");
        return processResult(result.imageUrl, input);
      },
      getCreditCost: () => 1,
      save: async (result, uid) => {
        const input = lastInputRef.current;
        if (!input) return;
        const creation = buildCreation(result, input);
        if (creation) await repository.create(uid, creation);
      },
    }),
    [processResult, buildCreation, repository],
  );

  // Use orchestrator directly
  const { generate, isGenerating, progress } = useGenerationOrchestrator(strategy, {
    userId,
    alertMessages,
    onCreditsExhausted,
    onSuccess: (result) => {
      if (typeof __DEV__ !== "undefined" && __DEV__) console.log("[CoupleFutureFlow] 🎉 Success");
      actions.generationSuccess(result as TResult);
      InteractionManager.runAfterInteractions(() => setTimeout(() => actions.onNavigateToHistory(), 300));
    },
    onError: (err) => {
      if (typeof __DEV__ !== "undefined" && __DEV__) console.log("[CoupleFutureFlow] ❌ Error:", err.message);
      actions.generationError(err.message);
    },
  });

  // Trigger generation when step changes to GENERATING
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

  // Handlers
  const handleScenarioSelect = useCallback(
    (id: string) => {
      actions.selectScenario(id as TScenarioId);
      actions.setStep(config.steps.SCENARIO_PREVIEW);
    },
    [actions, config.steps.SCENARIO_PREVIEW],
  );

  const handleScenarioPreviewBack = useCallback(() => actions.setStep(config.steps.SCENARIO), [actions, config.steps.SCENARIO]);

  const handleScenarioPreviewContinue = useCallback(() => {
    if (state.selectedFeature) actions.setStep(config.steps.COUPLE_FEATURE_SELECTOR);
    else if (state.selectedScenarioId === config.customScenarioId || state.selectedScenarioData?.requiresPhoto === false)
      actions.setStep(config.steps.TEXT_INPUT);
    else actions.setStep(config.steps.PARTNER_A);
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
    actions.setStep(state.selectedScenarioId === config.customScenarioId ? config.steps.TEXT_INPUT : config.steps.SCENARIO_PREVIEW);
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

  const handlePartnerBBack = useCallback(() => actions.setStep(config.steps.PARTNER_A), [actions, config.steps.PARTNER_A]);

  const handleMagicPromptContinue = useCallback(
    (prompt: string, style: string) => {
      actions.setCustomPrompt(prompt);
      actions.setVisualStyle(style);
      if (state.selectedScenarioId === config.customScenarioId) actions.setStep(config.steps.PARTNER_A);
      else actions.startGeneration();
    },
    [actions, config, state.selectedScenarioId],
  );

  const handleMagicPromptBack = useCallback(() => actions.setStep(config.steps.SCENARIO_PREVIEW), [actions, config.steps.SCENARIO_PREVIEW]);

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
