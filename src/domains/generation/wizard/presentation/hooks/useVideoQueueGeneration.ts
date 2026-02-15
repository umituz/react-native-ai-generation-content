/**
 * Video Queue Generation Hook
 */

import { useEffect, useRef, useCallback, useState } from "react";

declare const __DEV__: boolean;
import { pollQueueStatus } from "./videoQueuePoller";
import { DEFAULT_POLL_INTERVAL_MS } from "../../../../../infrastructure/constants/polling.constants";
import type { GenerationUrls } from "./generation-result.utils";
import type {
  UseVideoQueueGenerationProps,
  UseVideoQueueGenerationReturn,
} from "./use-video-queue-generation.types";

export function useVideoQueueGeneration(props: UseVideoQueueGenerationProps): UseVideoQueueGenerationReturn {
  const { userId, scenario, persistence, strategy, onSuccess, onError } = props;

  const creationIdRef = useRef<string | null>(null);
  const requestIdRef = useRef<string | null>(null);
  const modelRef = useRef<string | null>(null);
  const pollingRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const isGeneratingRef = useRef(false);
  const isPollingRef = useRef(false);
  const [isGenerating, setIsGenerating] = useState(false);

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
    isGeneratingRef.current = false;
    isPollingRef.current = false;
    setIsGenerating(false);
  }, []);

  const handleComplete = useCallback(
    async (urls: GenerationUrls) => {
      const creationId = creationIdRef.current;
      if (creationId && userId && (urls.videoUrl || urls.imageUrl)) {
        try {
          await persistence.updateToCompleted(userId, creationId, {
            uri: (urls.videoUrl || urls.imageUrl) ?? "",
            imageUrl: urls.imageUrl,
            videoUrl: urls.videoUrl,
          });
        } catch (error) {
          if (typeof __DEV__ !== "undefined" && __DEV__) {
            console.error("[VideoQueue] Failed to update completion status:", error);
          }
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
        } catch (error) {
          if (typeof __DEV__ !== "undefined" && __DEV__) {
            console.error("[VideoQueue] Failed to update error status:", error);
          }
        }
      }
      resetRefs();
      onError?.(errorMsg);
    },
    [userId, persistence, onError, resetRefs],
  );

  const pollStatus = useCallback(async () => {
    const requestId = requestIdRef.current;
    const model = modelRef.current;
    if (!requestId || !model) return;

    await pollQueueStatus({
      requestId,
      model,
      isPollingRef,
      pollingRef,
      onComplete: handleComplete,
      onError: handleError,
    });
  }, [handleComplete, handleError]);

  const startGeneration = useCallback(
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
          creationId = await persistence.saveAsProcessing(userId, {
            scenarioId: scenario.id,
            scenarioTitle: scenario.title || scenario.id,
            prompt,
          });
          creationIdRef.current = creationId;
        } catch (error) {
          if (typeof __DEV__ !== "undefined" && __DEV__) {
            console.error("[VideoQueue] Failed to save processing creation:", error);
          }
        }
      }

      const queueResult = await strategy.submitToQueue(input);
      if (!queueResult.success || !queueResult.requestId || !queueResult.model) {
        if (creationId && userId) {
          await persistence.updateToFailed(userId, creationId, queueResult.error || "Queue submission failed");
        }
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

      pollingRef.current = setInterval(() => void pollStatus(), DEFAULT_POLL_INTERVAL_MS);
      void pollStatus();
    },
    [userId, scenario, persistence, strategy, pollStatus, onError],
  );

  return { isGenerating, startGeneration };
}
