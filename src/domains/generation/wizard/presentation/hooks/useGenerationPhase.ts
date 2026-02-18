/**
 * useGenerationPhase Hook
 * Derives generation phase from elapsed time for UX feedback
 *
 * Best Practice: Since actual API progress is unknown (queue systems only return IN_QUEUE/IN_PROGRESS),
 * we use time-based phases to provide meaningful feedback to users.
 */

import { useState, useEffect, useRef } from "react";

type GenerationPhase = "queued" | "processing" | "finalizing";

interface UseGenerationPhaseOptions {
  /** Time in ms before transitioning from "queued" to "processing" (default: 5000) */
  readonly queuedDuration?: number;
}

/**
 * Hook to derive generation phase from elapsed time
 * - 0-5s: "queued" (Waiting in queue...)
 * - 5s+: "processing" (Generating your content...)
 *
 * Note: "finalizing" phase is not time-based, it should be set when
 * the API reports completion (not implemented here as it requires status callback)
 */
export function useGenerationPhase(options?: UseGenerationPhaseOptions): GenerationPhase {
  const { queuedDuration = 5000 } = options ?? {};

  const [phase, setPhase] = useState<GenerationPhase>("queued");
  const startTimeRef = useRef<number>(Date.now());
  const queuedDurationRef = useRef(queuedDuration);

  // Only reset if duration changes significantly
  useEffect(() => {
    queuedDurationRef.current = queuedDuration;
  }, [queuedDuration]);

  useEffect(() => {
    startTimeRef.current = Date.now();
    setPhase("queued");

    const interval = setInterval(() => {
      const elapsed = Date.now() - startTimeRef.current;

      if (elapsed >= queuedDurationRef.current) {
        setPhase("processing");
        clearInterval(interval);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, []); // Empty deps - only run once on mount

  return phase;
}
