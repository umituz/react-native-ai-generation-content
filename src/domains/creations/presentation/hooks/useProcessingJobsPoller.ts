/**
 * useProcessingJobsPoller Hook
 * Polls FAL queue status for "processing" creations and updates Firestore when complete
 * Enables true background generation - works even after wizard is dismissed
 * Uses provider registry internally - no need to pass FAL functions
 */

import { useEffect, useRef, useCallback, useMemo } from "react";
import { providerRegistry } from "../../../../infrastructure/services/provider-registry.service";
import { QUEUE_STATUS, CREATION_STATUS } from "../../../../domain/constants/queue-status.constants";
import {
  extractResultUrl,
  type FalResult,
} from "../../../generation/wizard/presentation/hooks/generation-result.utils";
import type { Creation } from "../../domain/entities/Creation";
import type { ICreationsRepository } from "../../domain/repositories/ICreationsRepository";

declare const __DEV__: boolean;

const POLL_INTERVAL_MS = 5000; // Gallery polls slower than wizard

export interface UseProcessingJobsPollerConfig {
  readonly userId?: string | null;
  readonly creations: Creation[];
  readonly repository: ICreationsRepository;
  readonly enabled?: boolean;
}

export interface UseProcessingJobsPollerReturn {
  readonly processingCount: number;
}

export function useProcessingJobsPoller(
  config: UseProcessingJobsPollerConfig,
): UseProcessingJobsPollerReturn {
  const {
    userId,
    creations,
    repository,
    enabled = true,
  } = config;

  const pollingRef = useRef<Set<string>>(new Set());
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  // Find creations that need polling - stabilize reference with useMemo
  const processingJobIds = useMemo(
    () => creations
      .filter((c) => c.status === CREATION_STATUS.PROCESSING && c.requestId && c.model)
      .map((c) => c.id)
      .join(","),
    [creations],
  );

  const processingJobs = useMemo(
    () => creations.filter(
      (c) => c.status === CREATION_STATUS.PROCESSING && c.requestId && c.model,
    ),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [processingJobIds],
  );

  const pollJob = useCallback(
    async (creation: Creation) => {
      if (!userId || !creation.requestId || !creation.model) return;
      if (pollingRef.current.has(creation.id)) return;

      const provider = providerRegistry.getActiveProvider();
      if (!provider || !provider.isInitialized()) return;

      pollingRef.current.add(creation.id);

      try {
        if (typeof __DEV__ !== "undefined" && __DEV__) {
          console.log("[ProcessingJobsPoller] Checking status:", creation.id);
        }

        const status = await provider.getJobStatus(creation.model, creation.requestId);

        if (typeof __DEV__ !== "undefined" && __DEV__) {
          console.log("[ProcessingJobsPoller] Status:", creation.id, status.status);
        }

        if (status.status === QUEUE_STATUS.COMPLETED) {
          const result = await provider.getJobResult<FalResult>(creation.model, creation.requestId);
          const urls = extractResultUrl(result);
          if (typeof __DEV__ !== "undefined" && __DEV__) console.log("[ProcessingJobsPoller] Completed:", creation.id, urls);

          const uri = urls.videoUrl || urls.imageUrl || "";
          await repository.update(userId, creation.id, {
            status: CREATION_STATUS.COMPLETED,
            uri,
            output: urls,
          });
        } else if (status.status === QUEUE_STATUS.FAILED) {
          if (typeof __DEV__ !== "undefined" && __DEV__) console.log("[ProcessingJobsPoller] Failed:", creation.id);

          await repository.update(userId, creation.id, {
            status: CREATION_STATUS.FAILED,
            metadata: { error: "Generation failed" },
          });
        }
        // If still IN_PROGRESS or IN_QUEUE, we'll check again next interval
      } catch (error) {
        if (typeof __DEV__ !== "undefined" && __DEV__) {
          console.error("[ProcessingJobsPoller] Poll error:", creation.id, error);
        }
      } finally {
        pollingRef.current.delete(creation.id);
      }
    },
    [userId, repository],
  );

  useEffect(() => {
    if (!enabled || !userId || processingJobs.length === 0) {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
      return;
    }

    // Initial poll
    processingJobs.forEach((job) => void pollJob(job));

    // Set up interval polling
    intervalRef.current = setInterval(() => {
      processingJobs.forEach((job) => void pollJob(job));
    }, POLL_INTERVAL_MS);

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    };
  }, [enabled, userId, processingJobs, pollJob]);

  return {
    processingCount: processingJobs.length,
  };
}
