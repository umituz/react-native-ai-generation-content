/**
 * useVideoQueueGeneration Hook
 * Handles video generation via FAL queue with background support
 * - Submits to queue for non-blocking generation
 * - Polls for completion status
 * - Supports background generation (user can dismiss wizard)
 */

import { useEffect, useRef, useCallback, useState } from "react";
import { providerRegistry } from "../../../../../infrastructure/services/provider-registry.service";
import { extractResultUrl, type FalResult, type GenerationUrls } from "./generation-result.utils";
import { QUEUE_STATUS } from "../../../../../domain/constants/queue-status.constants";

const POLL_INTERVAL_MS = 3000;
import type { CreationPersistence } from "../../infrastructure/utils/creation-persistence.util";
import type { WizardStrategy } from "../../infrastructure/strategies/wizard-strategy.types";
import type { WizardScenarioData } from "./wizard-generation.types";

declare const __DEV__: boolean;

export interface UseVideoQueueGenerationProps {
  readonly userId?: string;
  readonly scenario: WizardScenarioData;
  readonly persistence: CreationPersistence;
  readonly strategy: WizardStrategy;
  readonly onSuccess?: (result: unknown) => void;
  readonly onError?: (error: string) => void;
}

export interface UseVideoQueueGenerationReturn {
  readonly isGenerating: boolean;
  readonly startGeneration: (input: unknown, prompt: string) => Promise<void>;
}

export function useVideoQueueGeneration(
  props: UseVideoQueueGenerationProps,
): UseVideoQueueGenerationReturn {
  const { userId, scenario, persistence, strategy, onSuccess, onError } = props;

  const creationIdRef = useRef<string | null>(null);
  const requestIdRef = useRef<string | null>(null);
  const modelRef = useRef<string | null>(null);
  const pollingRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);

  // Cleanup polling on unmount
  useEffect(() => {
    return () => {
      if (pollingRef.current) {
        clearInterval(pollingRef.current);
        pollingRef.current = null;
      }
    };
  }, []);

  const resetRefs = useCallback(() => {
    creationIdRef.current = null;
    requestIdRef.current = null;
    modelRef.current = null;
    setIsGenerating(false);
  }, []);

  const handleComplete = useCallback(
    async (urls: GenerationUrls) => {
      const creationId = creationIdRef.current;
      if (creationId && userId) {
        try {
          await persistence.updateToCompleted(userId, creationId, {
            uri: urls.videoUrl || urls.imageUrl || "",
            imageUrl: urls.imageUrl,
            videoUrl: urls.videoUrl,
          });
        } catch (err) {
          if (typeof __DEV__ !== "undefined" && __DEV__) console.error("[VideoQueueGeneration] updateToCompleted error:", err);
        }
      }
      resetRefs();
      onSuccess?.(urls);
    },
    [userId, persistence, onSuccess, resetRefs],
  );

  const handleError = useCallback(
    async (errorMsg: string) => {
      const creationId = creationIdRef.current;
      if (creationId && userId) {
        try {
          await persistence.updateToFailed(userId, creationId, errorMsg);
        } catch (err) {
          if (typeof __DEV__ !== "undefined" && __DEV__) console.error("[VideoQueueGeneration] updateToFailed error:", err);
        }
      }
      resetRefs();
      onError?.(errorMsg);
    },
    [userId, persistence, onError, resetRefs],
  );

  const pollQueueStatus = useCallback(async () => {
    const requestId = requestIdRef.current;
    const model = modelRef.current;
    const provider = providerRegistry.getActiveProvider();
    if (!requestId || !model || !provider) return;

    try {
      const status = await provider.getJobStatus(model, requestId);
      if (typeof __DEV__ !== "undefined" && __DEV__) console.log("[VideoQueueGeneration] Poll:", status.status);

      if (status.status === QUEUE_STATUS.COMPLETED || status.status === QUEUE_STATUS.FAILED) {
        if (pollingRef.current) { clearInterval(pollingRef.current); pollingRef.current = null; }
        if (status.status === QUEUE_STATUS.COMPLETED) {
          try {
            const result = await provider.getJobResult<FalResult>(model, requestId);
            await handleComplete(extractResultUrl(result));
          } catch (resultErr) {
            // Handle errors when getting/extracting result (e.g., ValidationError, content policy)
            const errorMessage = resultErr instanceof Error ? resultErr.message : "Generation failed";
            if (typeof __DEV__ !== "undefined" && __DEV__) {
              console.error("[VideoQueueGeneration] Result error:", errorMessage);
            }
            await handleError(errorMessage);
          }
        } else {
          await handleError("Generation failed");
        }
      }
    } catch (err) {
      // Handle polling errors - stop polling and show error to user
      if (pollingRef.current) { clearInterval(pollingRef.current); pollingRef.current = null; }
      const errorMessage = err instanceof Error ? err.message : "Generation failed";
      if (typeof __DEV__ !== "undefined" && __DEV__) {
        console.error("[VideoQueueGeneration] Poll error:", errorMessage);
      }
      await handleError(errorMessage);
    }
  }, [handleComplete, handleError]);

  const startGeneration = useCallback(
    async (input: unknown, prompt: string) => {
      if (!strategy.submitToQueue) { onError?.("Queue submission not available"); return; }
      setIsGenerating(true);

      // Save to Firestore FIRST (enables background visibility)
      let creationId: string | null = null;
      if (userId && prompt) {
        try {
          creationId = await persistence.saveAsProcessing(userId, {
            scenarioId: scenario.id, scenarioTitle: scenario.title || scenario.id, prompt,
          });
          creationIdRef.current = creationId;
          if (typeof __DEV__ !== "undefined" && __DEV__) console.log("[VideoQueueGeneration] Saved:", creationId);
        } catch (err) {
          if (typeof __DEV__ !== "undefined" && __DEV__) console.error("[VideoQueueGeneration] save error:", err);
        }
      }

      const queueResult = await strategy.submitToQueue(input);
      if (!queueResult.success || !queueResult.requestId || !queueResult.model) {
        if (creationId && userId) await persistence.updateToFailed(userId, creationId, queueResult.error || "Queue submission failed");
        setIsGenerating(false);
        onError?.(queueResult.error || "Queue submission failed");
        return;
      }

      requestIdRef.current = queueResult.requestId;
      modelRef.current = queueResult.model;

      // Update with requestId for background polling
      if (creationId && userId) {
        try {
          await persistence.updateRequestId(userId, creationId, queueResult.requestId, queueResult.model);
          if (typeof __DEV__ !== "undefined" && __DEV__) console.log("[VideoQueueGeneration] Updated requestId:", queueResult.requestId);
        } catch (err) {
          if (typeof __DEV__ !== "undefined" && __DEV__) console.error("[VideoQueueGeneration] updateRequestId error:", err);
        }
      }

      pollingRef.current = setInterval(() => void pollQueueStatus(), POLL_INTERVAL_MS);
      void pollQueueStatus();
    },
    [userId, scenario, persistence, strategy, pollQueueStatus, onError],
  );

  return { isGenerating, startGeneration };
}
