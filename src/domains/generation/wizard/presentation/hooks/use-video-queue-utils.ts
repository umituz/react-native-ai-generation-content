/**
 * Video Queue Generation Hook - Utility Functions
 */

import type { GenerationUrls } from "./generation-result.utils";
import type { UseVideoQueueGenerationProps } from "./use-video-queue-generation.types";

/**
 * Clear polling interval
 */
export function createClearPolling(
  pollingRef: React.MutableRefObject<ReturnType<typeof setInterval> | null>
) {
  return () => {
    if (pollingRef.current) {
      clearInterval(pollingRef.current);
      pollingRef.current = null;
    }
  };
}

/**
 * Reset all refs to initial state
 */
export function createResetRefs(
  clearPolling: () => void,
  creationIdRef: React.MutableRefObject<string | null>,
  requestIdRef: React.MutableRefObject<string | null>,
  modelRef: React.MutableRefObject<string | null>,
  isGeneratingRef: React.MutableRefObject<boolean>,
  isPollingRef: React.MutableRefObject<boolean>,
  consecutiveErrorsRef: React.MutableRefObject<number>,
  pollStartTimeRef: React.MutableRefObject<number | null>,
  setIsGenerating: (value: boolean) => void
) {
  return () => {
    clearPolling();
    creationIdRef.current = null;
    requestIdRef.current = null;
    modelRef.current = null;
    isGeneratingRef.current = false;
    isPollingRef.current = false;
    consecutiveErrorsRef.current = 0;
    pollStartTimeRef.current = null;
    setIsGenerating(false);
  };
}

/**
 * Extract duration, resolution, and aspect ratio from input
 */
export function extractInputMetadata(input: unknown): {
  duration?: number;
  resolution?: string;
  aspectRatio?: string;
} {
  const inputData = input as Record<string, unknown>;
  return {
    duration: typeof inputData?.duration === "number" ? inputData.duration : undefined,
    resolution: typeof inputData?.resolution === "string" ? inputData.resolution : undefined,
    aspectRatio: typeof inputData?.aspectRatio === "string" ? inputData.aspectRatio : undefined,
  };
}

/**
 * Validate completion data
 */
export function validateCompletionData(
  creationId: string | null,
  userId: string | null,
  uri: string
): boolean {
  return !!(creationId && userId && uri && uri.trim() !== "");
}

/**
 * Log completion data for debugging
 */
export function logCompletion(
  creationId: string | null,
  userId: string | null,
  urls: GenerationUrls,
  hasOnSuccess: boolean
): void {
  if (typeof __DEV__ !== "undefined" && __DEV__) {
    console.log("[VideoQueue] ✅ handleComplete called", {
      creationId,
      userId,
      hasVideoUrl: !!urls.videoUrl,
      hasImageUrl: !!urls.imageUrl,
      hasOnSuccess,
    });
  }
}

/**
 * Log error for debugging
 */
export function logError(message: string, data: Record<string, unknown>): void {
  if (typeof __DEV__ !== "undefined" && __DEV__) {
    console.error("[VideoQueue] ❌", message, data);
  }
}
