/**
 * useGenerationPhase Hook
 * Derives generation phase from elapsed time for UX feedback
 *
 * Best Practice: Since actual API progress is unknown (FAL only returns IN_QUEUE/IN_PROGRESS),
 * we use time-based phases to provide meaningful feedback to users.
 */

import { useState, useEffect, useRef } from "react";

export type GenerationPhase = "queued" | "processing" | "finalizing";

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
  const startTimeRef = useRef(Date.now());

  useEffect(() => {
    const interval = setInterval(() => {
      const elapsed = Date.now() - startTimeRef.current;

      if (elapsed < queuedDuration) {
        setPhase("queued");
      } else {
        setPhase("processing");
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [queuedDuration]);

  return phase;
}
