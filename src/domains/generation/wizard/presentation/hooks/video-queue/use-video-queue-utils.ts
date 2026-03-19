/**
 * Video Queue Utilities
 */

export interface VideoQueueUtils {
  isQueueFull: () => boolean;
  getQueueSize: () => number;
  clearQueue: () => void;
}

export function createVideoQueueUtils(): VideoQueueUtils {
  return {
    isQueueFull: () => false,
    getQueueSize: () => 0,
    clearQueue: () => {},
  };
}

import type { VideoQueueRefs } from "./useVideoQueueGenerationRefs";
import type { VideoQueueState } from "./useVideoQueueGenerationRefs";

/**
 * Create a clear polling function
 */
export function createClearPolling(refs: VideoQueueRefs): () => void {
  const { pollingRef } = refs;
  return () => {
    if (pollingRef.current) {
      clearInterval(pollingRef.current);
      pollingRef.current = null;
    }
  };
}

/**
 * Create a reset refs function
 */
export function createResetRefs(
  refs: VideoQueueRefs,
  state: VideoQueueState
): () => void {
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
}

/**
 * Log completion event
 */
export function logCompletion(
  creationId: string | null,
  userId: string | undefined,
  urls: { videoUrl?: string; imageUrl?: string },
  hasCallback: boolean
): void {
  if (typeof __DEV__ !== "undefined" && __DEV__) {
    console.log("[VideoQueue] ✅ Generation completed", {
      creationId,
      userId,
      hasVideoUrl: !!urls.videoUrl,
      hasImageUrl: !!urls.imageUrl,
      hasCallback,
    });
  }
}

/**
 * Log error event
 */
export function logError(message: string, data?: Record<string, unknown>): void {
  if (typeof __DEV__ !== "undefined" && __DEV__) {
    console.error("[VideoQueue] ❌ Error:", message, data);
  }
}

/**
 * Validate completion data
 */
export function validateCompletionData(
  creationId: string | null,
  userId: string | undefined,
  uri: string
): boolean {
  return !!(creationId && userId && uri);
}

/**
 * Extract input metadata for generation
 */
export function extractInputMetadata(params: {
  readonly model: string;
  readonly prompt: string;
  readonly imageUrls?: string[];
}): {
  readonly model: string;
  readonly prompt: string;
  readonly imageUrls: string[];
} {
  return {
    model: params.model,
    prompt: params.prompt,
    imageUrls: params.imageUrls || [],
  };
}

