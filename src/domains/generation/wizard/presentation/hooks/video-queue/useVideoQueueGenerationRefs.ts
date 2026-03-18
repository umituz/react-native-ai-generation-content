/**
 * Video Queue Generation Hook - Refs and State Management
 */

import { useRef, useState } from "react";

export interface VideoQueueRefs {
  readonly creationIdRef: React.MutableRefObject<string | null>;
  readonly requestIdRef: React.MutableRefObject<string | null>;
  readonly modelRef: React.MutableRefObject<string | null>;
  readonly pollingRef: React.MutableRefObject<ReturnType<typeof setInterval> | null>;
  readonly isGeneratingRef: React.MutableRefObject<boolean>;
  readonly isPollingRef: React.MutableRefObject<boolean>;
  readonly consecutiveErrorsRef: React.MutableRefObject<number>;
  readonly pollStartTimeRef: React.MutableRefObject<number | null>;
  readonly handleCompleteRef: React.MutableRefObject<(urls: import("../generation-result.utils").GenerationUrls) => Promise<void>>;
  readonly handleErrorRef: React.MutableRefObject<(errorMsg: string) => Promise<void>>;
  readonly pollStatusRef: React.MutableRefObject<() => Promise<void>>;
}

export interface VideoQueueState {
  readonly isGenerating: boolean;
  readonly setIsGenerating: React.Dispatch<React.SetStateAction<boolean>>;
}

/**
 * Initialize refs for video queue generation
 */
export function useVideoQueueGenerationRefs(): VideoQueueRefs {
  const creationIdRef = useRef<string | null>(null);
  const requestIdRef = useRef<string | null>(null);
  const modelRef = useRef<string | null>(null);
  const pollingRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const isGeneratingRef = useRef(false);
  const isPollingRef = useRef(false);
  const consecutiveErrorsRef = useRef(0);
  const pollStartTimeRef = useRef<number | null>(null);

  // Placeholders for callback refs - will be set by the hook
  const handleCompleteRef = useRef<VideoQueueRefs["handleCompleteRef"]["current"]>(async () => {});
  const handleErrorRef = useRef<VideoQueueRefs["handleErrorRef"]["current"]>(async () => {});
  const pollStatusRef = useRef<VideoQueueRefs["pollStatusRef"]["current"]>(async () => {});

  return {
    creationIdRef,
    requestIdRef,
    modelRef,
    pollingRef,
    isGeneratingRef,
    isPollingRef,
    consecutiveErrorsRef,
    pollStartTimeRef,
    handleCompleteRef,
    handleErrorRef,
    pollStatusRef,
  };
}

/**
 * Initialize state for video queue generation
 */
export function useVideoQueueGenerationState(): VideoQueueState {
  const [isGenerating, setIsGenerating] = useState(false);
  return { isGenerating, setIsGenerating };
}
