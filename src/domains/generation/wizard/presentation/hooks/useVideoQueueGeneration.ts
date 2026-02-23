/**
 * Video Queue Generation Hook
 */

import { useEffect, useRef, useCallback, useState } from "react";

import { pollQueueStatus } from "./videoQueuePoller";
import {
  DEFAULT_POLL_INTERVAL_MS,
  DEFAULT_MAX_POLL_TIME_MS,
} from "../../../../../infrastructure/constants/polling.constants";
import type { GenerationUrls } from "./generation-result.utils";
import type {
  UseVideoQueueGenerationProps,
  UseVideoQueueGenerationReturn,
} from "./use-video-queue-generation.types";

export function useVideoQueueGeneration(props: UseVideoQueueGenerationProps): UseVideoQueueGenerationReturn {
  const { userId, scenario, persistence, strategy, creditCost, deductCredits, onSuccess, onError } = props;

  const creationIdRef = useRef<string | null>(null);
  const requestIdRef = useRef<string | null>(null);
  const modelRef = useRef<string | null>(null);
  const pollingRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const isGeneratingRef = useRef(false);
  const isPollingRef = useRef(false);
  const consecutiveErrorsRef = useRef(0);
  const pollStartTimeRef = useRef<number | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);

  const clearPolling = useCallback(() => {
    if (pollingRef.current) {
      clearInterval(pollingRef.current);
      pollingRef.current = null;
    }
  }, []);

  useEffect(() => {
    return () => {
      clearPolling();
      isGeneratingRef.current = false;
      isPollingRef.current = false;
      consecutiveErrorsRef.current = 0;
      pollStartTimeRef.current = null;
      // NOTE: Do NOT null creationIdRef/requestIdRef/modelRef here.
      // In-flight poll callbacks may still resolve after unmount and need
      // these refs to properly save the completed generation to Firestore.
      // They are cleaned up by resetRefs() after handleComplete/handleError.
      setIsGenerating(false);
    };
  }, [clearPolling]);

  const resetRefs = useCallback(() => {
    clearPolling();
    creationIdRef.current = null;
    requestIdRef.current = null;
    modelRef.current = null;
    isGeneratingRef.current = false;
    isPollingRef.current = false;
    consecutiveErrorsRef.current = 0;
    pollStartTimeRef.current = null;
    setIsGenerating(false);
  }, [clearPolling]);

  const handleComplete = useCallback(
    async (urls: GenerationUrls) => {
      clearPolling();

      const creationId = creationIdRef.current;
      const uri = (urls.videoUrl || urls.imageUrl) ?? "";

      if (typeof __DEV__ !== "undefined" && __DEV__) {
        console.log("[VideoQueue] ✅ handleComplete called", {
          creationId,
          userId,
          hasVideoUrl: !!urls.videoUrl,
          hasImageUrl: !!urls.imageUrl,
          hasOnSuccess: !!onSuccess
        });
      }

      if (!creationId || !userId || !uri || uri.trim() === "") {
        if (typeof __DEV__ !== "undefined" && __DEV__) {
          console.error("[VideoQueue] ❌ Invalid completion data:", { creationId, userId, uri });
        }
        resetRefs();
        onError?.("Invalid completion data - no valid URL received");
        return;
      }

      let persistenceSucceeded = true;
      if (creationId && userId) {
        try {
          await persistence.updateToCompleted(userId, creationId, {
            uri,
            imageUrl: urls.imageUrl,
            videoUrl: urls.videoUrl,
            thumbnailUrl: urls.thumbnailUrl,
            generationStartedAt: pollStartTimeRef.current ?? undefined,
          });
          if (typeof __DEV__ !== "undefined" && __DEV__) {
            console.log("[VideoQueue] ✅ Updated completion status in Firestore");
          }
        } catch (error) {
          persistenceSucceeded = false;
          if (typeof __DEV__ !== "undefined" && __DEV__) {
            console.error("[VideoQueue] ❌ Failed to update completion status:", error);
          }
        }
      }

      resetRefs();

      // Deduct credits after successful generation
      if (deductCredits && creditCost) {
        await deductCredits(creditCost).catch((err) => {
          if (typeof __DEV__ !== "undefined" && __DEV__) {
            console.error("[VideoQueue] deductCredits error:", err);
          }
        });
      }

      if (typeof __DEV__ !== "undefined" && __DEV__) {
        console.log("[VideoQueue] 🎯 Calling onSuccess callback now...", { persistenceSucceeded });
      }
      onSuccess?.(urls);

      if (typeof __DEV__ !== "undefined" && __DEV__) {
        console.log("[VideoQueue] ✅ onSuccess callback completed");
      }
    },
    [userId, persistence, deductCredits, creditCost, onSuccess, onError, resetRefs, clearPolling],
  );

  const handleError = useCallback(
    async (errorMsg: string) => {
      clearPolling();
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
    [userId, persistence, onError, resetRefs, clearPolling],
  );

  // Use a ref to hold the latest handleComplete/handleError to avoid stale closures
  // in the setInterval callback
  const handleCompleteRef = useRef(handleComplete);
  const handleErrorRef = useRef(handleError);
  useEffect(() => { handleCompleteRef.current = handleComplete; }, [handleComplete]);
  useEffect(() => { handleErrorRef.current = handleError; }, [handleError]);

  const pollStatus = useCallback(async () => {
    const requestId = requestIdRef.current;
    const model = modelRef.current;
    if (!requestId || !model) return;

    // Check max poll time
    if (pollStartTimeRef.current !== null) {
      const elapsed = Date.now() - pollStartTimeRef.current;
      if (elapsed >= DEFAULT_MAX_POLL_TIME_MS) {
        if (typeof __DEV__ !== "undefined" && __DEV__) {
          console.warn("[VideoQueue] ⏰ Max poll time exceeded, aborting");
        }
        await handleErrorRef.current("Generation timed out. Please try again.");
        return;
      }
    }

    try {
      await pollQueueStatus({
        requestId,
        model,
        isPollingRef,
        pollingRef,
        consecutiveErrorsRef,
        onComplete: handleCompleteRef.current,
        onError: handleErrorRef.current,
      });
    } catch (error) {
      if (typeof __DEV__ !== "undefined" && __DEV__) {
        console.error("[VideoQueue] Unexpected poll error:", error);
      }
    }
  }, []);

  // Keep a stable ref to pollStatus for the setInterval closure
  const pollStatusRef = useRef(pollStatus);
  useEffect(() => { pollStatusRef.current = pollStatus; }, [pollStatus]);

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
          const inputData = input as Record<string, unknown>;
          const duration = typeof inputData?.duration === "number" ? inputData.duration : undefined;
          const resolution = typeof inputData?.resolution === "string" ? inputData.resolution : undefined;
          const aspectRatio = typeof inputData?.aspectRatio === "string" ? inputData.aspectRatio : undefined;

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
    [userId, scenario, persistence, strategy, creditCost, onError],
  );

  return { isGenerating, startGeneration };
}
