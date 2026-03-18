/**
 * Video Queue Generation Hook
 */

import { useEffect } from "react";
import type { GenerationUrls } from "../generation-result.utils";
import type {
  UseVideoQueueGenerationProps,
  UseVideoQueueGenerationReturn,
} from "../use-video-queue-generation.types";
import {
  createClearPolling,
  createResetRefs,
} from "./use-video-queue-utils";
import { useVideoQueueGenerationRefs, useVideoQueueGenerationState } from "./useVideoQueueGenerationRefs";
import { useCompletionHandler, useErrorHandler } from "./useVideoQueueGenerationCallbacks";
import { usePollStatus, useCallbackRefs } from "./useVideoQueueGenerationPolling";
import { useStartGeneration } from "./useVideoQueueGenerationStart";

export function useVideoQueueGeneration(props: UseVideoQueueGenerationProps): UseVideoQueueGenerationReturn {
  const refs = useVideoQueueGenerationRefs();
  const state = useVideoQueueGenerationState();

  const clearPolling = (() => {
    const { pollingRef } = refs;
    return () => {
      if (pollingRef.current) {
        clearInterval(pollingRef.current);
        pollingRef.current = null;
      }
    };
  })();

  useEffect(() => {
    return () => {
      clearPolling();
      refs.isGeneratingRef.current = false;
      refs.isPollingRef.current = false;
      refs.consecutiveErrorsRef.current = 0;
      refs.pollStartTimeRef.current = null;
      // NOTE: Do NOT null creationIdRef/requestIdRef/modelRef here.
      // In-flight poll callbacks may still resolve after unmount and need
      // these refs to properly save the completed generation to Firestore.
      // They are cleaned up by resetRefs() after handleComplete/handleError.
      state.setIsGenerating(false);
    };
  }, [clearPolling, refs, state]);

  const resetRefs = (() => {
    const {
      creationIdRef,
      requestIdRef,
      modelRef,
      isGeneratingRef,
      isPollingRef,
      consecutiveErrorsRef,
      pollStartTimeRef,
    } = refs;
    const { setIsGenerating } = state;

    return () => {
      creationIdRef.current = null;
      requestIdRef.current = null;
      modelRef.current = null;
      isGeneratingRef.current = false;
      isPollingRef.current = false;
      consecutiveErrorsRef.current = 0;
      pollStartTimeRef.current = null;
      setIsGenerating(false);
    };
  })();

  const handleComplete = useCompletionHandler(props, refs, state, clearPolling, resetRefs);
  const handleError = useErrorHandler(props, refs, clearPolling, resetRefs);
  const pollStatus = usePollStatus(refs);
  const startGeneration = useStartGeneration(props, refs, state, clearPolling);

  // Sync callback refs
  useCallbackRefs(handleComplete, handleError, pollStatus, refs);

  return { isGenerating: state.isGenerating, startGeneration };
}
