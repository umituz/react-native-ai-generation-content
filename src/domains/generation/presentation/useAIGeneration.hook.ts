/**
 * useAIGeneration Hook
 * Universal hook for ALL AI generation features
 * Replaces all feature-specific hooks with a single unified API
 */

import { useGenerationOrchestrator } from "../../../presentation/hooks/generation/orchestrator";
import type { AlertMessages } from "../../../presentation/hooks/generation/types";
import { DEFAULT_ALERT_MESSAGES } from "../../../presentation/constants/alert-messages";
import { createGenerationStrategy } from "../application/generation-strategy.factory";


// ============================================================================
// Types
// ============================================================================

export interface UseAIGenerationProps {
  /** Feature ID from feature registry */
  featureId: string;

  /** User ID for saving creations */
  userId?: string;

  /** Alert messages for errors */
  alertMessages?: AlertMessages;

  /** Called when generation succeeds */
  onSuccess?: (result: unknown) => void;

  /** Called when generation fails */
  onError?: (error: string) => void;

  /** Called when credits are exhausted */
  onCreditsExhausted?: () => void;

  /** Optional: Custom repository for saving */
  repository?: {
    create(userId: string, creation: unknown): Promise<void>;
  };
}

export interface UseAIGenerationReturn {
  /** Trigger generation */
  generate: (input: unknown) => Promise<unknown>;

  /** Whether generation is in progress */
  isGenerating: boolean;
}

// ============================================================================
// Hook
// ============================================================================

export function useAIGeneration(
  props: UseAIGenerationProps,
): UseAIGenerationReturn {
  const {
    featureId,
    userId,
    alertMessages,
    onSuccess,
    onError,
    repository,
  } = props;

  if (typeof __DEV__ !== "undefined" && __DEV__) {
    console.log("[useAIGeneration] Initializing", {
      featureId,
      hasUserId: !!userId,
      hasRepository: !!repository,
    });
  }

  // Create generic strategy
  const strategy = createGenerationStrategy({
    featureId,
    userId,
    repository,
  });

  // Use orchestrator for lifecycle management
  const orchestrator = useGenerationOrchestrator(strategy, {
    userId,
    alertMessages: alertMessages || DEFAULT_ALERT_MESSAGES,
    onSuccess,
    onError: onError ? (error) => onError(error.message) : undefined,
  });

  return {
    generate: orchestrator.generate,
    isGenerating: orchestrator.isGenerating,
  };
}
