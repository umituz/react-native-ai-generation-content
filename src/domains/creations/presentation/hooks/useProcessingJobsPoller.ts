/**
 * useProcessingJobsPoller Hook
 * Polls FAL queue status for "processing" creations and updates Firestore when complete
 * Enables true background generation - works even after wizard is dismissed
 * Uses provider registry internally - no need to pass FAL functions
 */

import { useEffect, useRef, useMemo } from "react";
import { providerRegistry } from "../../../../infrastructure/services/provider-registry.service";
import { QUEUE_STATUS, CREATION_STATUS } from "../../../../domain/constants/queue-status.constants";
import { DEFAULT_POLL_INTERVAL_MS } from "../../../../infrastructure/constants/polling.constants";
import {
  extractResultUrl,
  type GenerationResult,
} from "../../../generation/wizard/presentation/hooks/generation-result.utils";
import type { Creation } from "../../domain/entities/Creation";
import type { ICreationsRepository } from "../../domain/repositories/ICreationsRepository";

declare const __DEV__: boolean;

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

  const processingJobs = useMemo(
    () => creations.filter(
      (c) => c.status === CREATION_STATUS.PROCESSING && c.requestId && c.model,
    ),
    [creations],
  );

  // Use ref for stable function reference to prevent effect re-runs
  const pollJobRef = useRef<((creation: Creation) => Promise<void>) | undefined>(undefined);

  pollJobRef.current = async (creation: Creation) => {
    if (!userId || !creation.requestId || !creation.model) return;

    if (pollingRef.current.has(creation.id)) return;
    pollingRef.current.add(creation.id);

    const provider = providerRegistry.getActiveProvider();
    if (!provider || !provider.isInitialized()) {
      pollingRef.current.delete(creation.id);
      return;
    }

    try {
      if (typeof __DEV__ !== "undefined" && __DEV__) {
        console.log("[ProcessingJobsPoller] Checking status:", creation.id);
      }

      const status = await provider.getJobStatus(creation.model, creation.requestId);

      if (typeof __DEV__ !== "undefined" && __DEV__) {
        console.log("[ProcessingJobsPoller] Status:", creation.id, status.status);
      }

      if (status.status === QUEUE_STATUS.COMPLETED) {
        const result = await provider.getJobResult<GenerationResult>(creation.model, creation.requestId);
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
    } catch (error) {
      if (typeof __DEV__ !== "undefined" && __DEV__) {
        console.error("[ProcessingJobsPoller] Poll error:", creation.id, error);
      }
    } finally {
      pollingRef.current.delete(creation.id);
    }
  };

  useEffect(() => {
    if (!enabled || !userId || processingJobs.length === 0) {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
      return;
    }

    // Initial poll
    processingJobs.forEach((job) => pollJobRef.current?.(job));

    // Set up interval polling
    intervalRef.current = setInterval(() => {
      processingJobs.forEach((job) => pollJobRef.current?.(job));
    }, DEFAULT_POLL_INTERVAL_MS);

    return () => {
      // Clear polling set first to prevent new operations
      pollingRef.current.clear();

      // Then clear interval
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    };
  }, [enabled, userId, processingJobs]);

  return {
    processingCount: processingJobs.length,
  };
}
