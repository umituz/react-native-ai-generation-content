/**
 * useCoupleFutureFlow Types
 * Type definitions for couple future flow hook
 */

import type { AlertMessages } from "../../../../presentation/hooks/generation";
import type { CoupleFutureInput } from "../../domain/types";
import type { Creation } from "../../../../domains/creations/domain/entities/Creation";

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
