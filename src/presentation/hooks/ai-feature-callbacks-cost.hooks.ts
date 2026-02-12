/**
 * AI Feature Callbacks - Cost Management Hooks
 * Credit and cost-related callback hooks
 */

import { useCallback } from "react";

export interface UseCostCallbacksParams {
  creditBalance: number;
  creditCostPerUnit: number;
  openPaywall: () => void;
}

export interface CostCallbacks {
  canAfford: (cost: number) => boolean;
  calculateCost: (multiplier?: number, _model?: string | null) => number;
  onCreditsRequired: (cost?: number) => void;
  onCreditCheck: (cost: number) => boolean;
  onShowPaywall: (cost: number) => void;
}

/**
 * Hook for cost and credit management callbacks
 */
export function useCostCallbacks(params: UseCostCallbacksParams): CostCallbacks {
  const { creditBalance, creditCostPerUnit, openPaywall } = params;

  const canAfford = useCallback(
    (cost: number): boolean => creditBalance >= cost,
    [creditBalance],
  );

  const calculateCost = useCallback(
    (multiplier = 1, _model?: string | null): number => creditCostPerUnit * multiplier,
    [creditCostPerUnit],
  );

  const onCreditsRequired = useCallback(
    (_cost?: number) => {
      openPaywall();
    },
    [openPaywall],
  );

  // Aliases for different callback interfaces
  const onCreditCheck = canAfford;
  const onShowPaywall = onCreditsRequired;

  return {
    canAfford,
    calculateCost,
    onCreditsRequired,
    onCreditCheck,
    onShowPaywall,
  };
}
