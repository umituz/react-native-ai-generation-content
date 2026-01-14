/**
 * useCoupleFutureFlow Hook
 * Optimized: Merged flow + generation logic
 * Uses centralized orchestrator with lifecycle management
 */

import { useEffect, useRef, useMemo } from "react";
import {
  useGenerationOrchestrator,
  type GenerationStrategy,
} from "../../../../presentation/hooks/generation";
import { executeCoupleFuture } from "../../infrastructure/executor";
import { buildGenerationInputFromConfig } from "../../infrastructure/generationUtils";
import { createCreationsRepository } from "../../../../domains/creations/infrastructure/adapters";
import type { CoupleFutureInput } from "../../domain/types";
import type { CoupleFutureFlowProps } from "./useCoupleFutureFlow.types";
import { useCoupleFutureHandlers } from "./useCoupleFutureHandlers";

export type {
  CoupleFutureFlowConfig,
  CoupleFutureFlowState,
  CoupleFutureFlowActions,
  CoupleFutureFlowProps,
} from "./useCoupleFutureFlow.types";

declare const __DEV__: boolean;

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

  // Use orchestrator with centralized lifecycle management
  const { generate, isGenerating, progress } = useGenerationOrchestrator(strategy, {
    userId,
    alertMessages,
    onCreditsExhausted,
    onSuccess: (result) => {
      if (typeof __DEV__ !== "undefined" && __DEV__) {
        console.log("[CoupleFutureFlow] 🎉 Success - calling generationSuccess");
      }
      actions.generationSuccess(result as TResult);
    },
    onError: (err) => {
      if (typeof __DEV__ !== "undefined" && __DEV__) {
        console.log("[CoupleFutureFlow] ❌ Error:", err.message);
      }
      actions.generationError(err.message);
    },
    // Centralized lifecycle management - navigation handled by orchestrator
    lifecycle: {
      onComplete: (status) => {
        if (typeof __DEV__ !== "undefined" && __DEV__) {
          console.log("[CoupleFutureFlow] 📍 Lifecycle onComplete:", status);
        }
        if (status === "success") {
          if (typeof __DEV__ !== "undefined" && __DEV__) {
            console.log("[CoupleFutureFlow] 🚀 Navigating to History");
          }
          actions.onNavigateToHistory();
        }
      },
      completeDelay: 500,
    },
  });

  // Trigger generation when step changes to GENERATING
  useEffect(() => {
    const step = state.step;
    const isProcessing = state.isProcessing;

    if (typeof __DEV__ !== "undefined" && __DEV__) {
      console.log("[CoupleFutureFlow] 📍 Step effect triggered:", {
        currentStep: step,
        targetStep: config.steps.GENERATING,
        isProcessing,
        hasStarted: hasStarted.current,
      });
    }

    if (step !== config.steps.GENERATING) {
      hasStarted.current = false;
      return;
    }

    if (!isProcessing || hasStarted.current) {
      if (typeof __DEV__ !== "undefined" && __DEV__) {
        console.log("[CoupleFutureFlow] ⏭️ Skipping generation:", {
          reason: !isProcessing ? "not processing" : "already started",
        });
      }
      return;
    }

    hasStarted.current = true;

    if (typeof __DEV__ !== "undefined" && __DEV__) {
      console.log("[CoupleFutureFlow] ✅ Step is GENERATING and isProcessing is true, building input...");
    }

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

    if (input) {
      if (typeof __DEV__ !== "undefined" && __DEV__) {
        console.log("[CoupleFutureFlow] 🚀 Starting generation with input");
      }
      generate(input);
    } else {
      if (typeof __DEV__ !== "undefined" && __DEV__) {
        console.log("[CoupleFutureFlow] ⚠️ No input built, skipping generation");
      }
    }
  }, [state.step, state.isProcessing, state.partnerA, state.partnerB, state.partnerAName, state.partnerBName, state.scenarioConfig, state.customPrompt, state.visualStyle, state.selection, config.steps.GENERATING, config.customScenarioId, generationConfig, generate]);

  // Use extracted handlers hook
  const handlers = useCoupleFutureHandlers({ config, state, actions });

  return {
    isGenerating,
    progress,
    handlers,
  };
};
