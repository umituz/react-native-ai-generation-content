/**
 * Video Queue Generation Hook - Polling Logic
 */

import { useCallback, useEffect } from "react";
import { pollQueueStatus } from "../videoQueuePoller";
import {
  DEFAULT_MAX_POLL_TIME_MS,
} from "../../../../../../infrastructure/constants/polling.constants";
import type { VideoQueueRefs } from "./useVideoQueueGenerationRefs";

/**
 * Create poll status callback
 */
export function usePollStatus(
  refs: VideoQueueRefs,
): () => Promise<void> {
  const { requestIdRef, modelRef, isPollingRef, pollingRef, consecutiveErrorsRef, pollStartTimeRef, handleCompleteRef, handleErrorRef } = refs;

  return useCallback(async () => {
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
  }, [requestIdRef, modelRef, isPollingRef, pollingRef, consecutiveErrorsRef, pollStartTimeRef, handleCompleteRef, handleErrorRef]);
}

/**
 * Hook to sync callback refs
 */
export function useCallbackRefs(
  handleComplete: (urls: import("../generation-result.utils").GenerationUrls) => Promise<void>,
  handleError: (errorMsg: string) => Promise<void>,
  pollStatus: () => Promise<void>,
  refs: VideoQueueRefs,
) {
  useEffect(() => {
    refs.handleCompleteRef.current = handleComplete;
  }, [handleComplete, refs]);

  useEffect(() => {
    refs.handleErrorRef.current = handleError;
  }, [handleError, refs]);

  useEffect(() => {
    refs.pollStatusRef.current = pollStatus;
  }, [pollStatus, refs]);
}
