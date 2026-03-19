/**
 * Video Queue Generation Hook - Start Generation Logic
 */

import { useCallback } from "react";
import {
  DEFAULT_POLL_INTERVAL_MS,
} from "../../../../../../infrastructure/constants/polling.constants";
import { extractInputMetadata } from "./use-video-queue-utils";
import type {
  UseVideoQueueGenerationProps,
} from "../use-video-queue-generation.types";
import type { VideoQueueRefs, VideoQueueState } from "./useVideoQueueGenerationRefs";

/**
 * Create start generation callback
 */
export function useStartGeneration(
  props: UseVideoQueueGenerationProps,
  refs: VideoQueueRefs,
  state: VideoQueueState,
  _clearPolling: () => void,
): (input: unknown, prompt: string) => Promise<void> {
  const { userId, scenario, persistence, strategy, creditCost, onError } = props;
  const { setIsGenerating } = state;
  const { creationIdRef, requestIdRef, modelRef, pollStartTimeRef, isGeneratingRef, pollingRef, pollStatusRef } = refs;

  return useCallback(
    async (input: unknown, prompt: string) => {
      if (!strategy.submitToQueue) {
        onError?.("Queue submission not available");
        return;
      }
      if (isGeneratingRef.current) return;

      isGeneratingRef.current = true;
      setIsGenerating(true);

      let creationId: string | null = null;
      if (userId && prompt) {
        try {
          const { duration, resolution, aspectRatio } = extractInputMetadata(input);

          const result = await persistence.saveAsProcessing(userId, {
            scenarioId: scenario.id,
            scenarioTitle: scenario.title || scenario.id,
            prompt,
            duration,
            resolution,
            creditCost,
            aspectRatio,
            provider: "fal",
            outputType: scenario.outputType,
          });
          creationId = result.creationId;
          creationIdRef.current = creationId;
          // Record the actual DB-level start time for accurate durationMs
          pollStartTimeRef.current = result.startedAt.getTime();
        } catch (error) {
          if (typeof __DEV__ !== "undefined" && __DEV__) {
            console.error("[VideoQueue] Failed to save processing creation:", error);
          }
        }
      }

      let queueResult;
      try {
        queueResult = await strategy.submitToQueue(input);
      } catch (error) {
        if (creationId && userId) {
          try {
            await persistence.updateToFailed(userId, creationId, error instanceof Error ? error.message : "Queue submission failed");
          } catch (persistError) {
            if (typeof __DEV__ !== "undefined" && __DEV__) {
              console.error("[VideoQueue] Failed to persist submission error:", persistError);
            }
          }
        }
        isGeneratingRef.current = false;
        setIsGenerating(false);
        onError?.(error instanceof Error ? error.message : "Queue submission failed");
        return;
      }

      if (!queueResult.success || !queueResult.requestId || !queueResult.model) {
        if (creationId && userId) {
          try {
            await persistence.updateToFailed(userId, creationId, queueResult.error || "Queue submission failed");
          } catch (persistError) {
            if (typeof __DEV__ !== "undefined" && __DEV__) {
              console.error("[VideoQueue] Failed to persist queue failure:", persistError);
            }
          }
        }
        isGeneratingRef.current = false;
        setIsGenerating(false);
        onError?.(queueResult.error || "Queue submission failed");
        return;
      }

      requestIdRef.current = queueResult.requestId;
      modelRef.current = queueResult.model;

      if (creationId && userId && queueResult.requestId && queueResult.model) {
        try {
          await persistence.updateRequestId(userId, creationId, queueResult.requestId, queueResult.model);
        } catch (error) {
          if (typeof __DEV__ !== "undefined" && __DEV__) {
            console.error("[VideoQueue] Failed to update request ID:", error);
          }
        }
      }

      // Start polling: use DB-level startedAt if available, otherwise fallback to now
      if (pollStartTimeRef.current === null) {
        pollStartTimeRef.current = Date.now();
      }
      pollingRef.current = setInterval(() => void pollStatusRef.current(), DEFAULT_POLL_INTERVAL_MS);
      void pollStatusRef.current();
    },
    [userId, scenario, persistence, strategy, creditCost, onError, setIsGenerating, creationIdRef, requestIdRef, modelRef, pollStartTimeRef, isGeneratingRef, pollingRef, pollStatusRef],
  );
}
