/**
 * Video Queue Generation Hook - Completion and Error Handlers
 */

import { useCallback } from "react";
import type { GenerationUrls } from "../generation-result.utils";
import type {
  UseVideoQueueGenerationProps,
} from "../use-video-queue-generation.types";
import {
  logCompletion,
  logError,
  validateCompletionData,
} from "./use-video-queue-utils";
import type { VideoQueueRefs, VideoQueueState } from "./useVideoQueueGenerationRefs";

/**
 * Create completion handler callback
 */
export function useCompletionHandler(
  props: UseVideoQueueGenerationProps,
  refs: VideoQueueRefs,
  state: VideoQueueState,
  clearPolling: () => void,
  resetRefs: () => void,
) {
  const { userId, persistence, creditCost, deductCredits, onSuccess, onError } = props;

  return useCallback(
    async (urls: GenerationUrls) => {
      clearPolling();

      const creationId = refs.creationIdRef.current;
      const uri = (urls.videoUrl || urls.imageUrl) ?? "";

      logCompletion(creationId, userId, urls, !!onSuccess);

      if (!validateCompletionData(creationId, userId, uri)) {
        logError("Invalid completion data:", { creationId, userId, uri });
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
            generationStartedAt: refs.pollStartTimeRef.current ?? undefined,
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
    [userId, persistence, deductCredits, creditCost, onSuccess, onError, resetRefs, clearPolling, refs],
  );
}

/**
 * Create error handler callback
 */
export function useErrorHandler(
  props: UseVideoQueueGenerationProps,
  refs: VideoQueueRefs,
  clearPolling: () => void,
  resetRefs: () => void,
) {
  const { userId, persistence, onError } = props;

  return useCallback(
    async (errorMsg: string) => {
      clearPolling();
      const creationId = refs.creationIdRef.current;
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
    [userId, persistence, onError, resetRefs, clearPolling, refs],
  );
}
