/**
 * useProcessingJobsPoller Hook
 * Polls queue status for "processing" creations and updates Firestore when complete
 * Enables true background generation - works even after wizard is dismissed
 * Uses provider registry internally - no need to pass provider functions
 */

import { useEffect, useRef, useMemo } from "react";
import { providerRegistry } from "../../../../infrastructure/services/provider-registry.service";
import { QUEUE_STATUS, CREATION_STATUS } from "../../../../domain/constants/queue-status.constants";
import { DEFAULT_POLL_INTERVAL_MS, DEFAULT_MAX_POLL_TIME_MS } from "../../../../infrastructure/constants/polling.constants";
import {
  extractResultUrl,
  type GenerationResult,
} from "../../../generation/wizard/presentation/hooks/generation-result.utils";
import type { Creation } from "../../domain/entities/Creation";
import type { ICreationsRepository } from "../../domain/repositories/ICreationsRepository";


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

  // Convert to IDs to prevent re-creating array on every render
  const processingJobIds = useMemo(
    () => creations
      .filter((c) => c.status === CREATION_STATUS.PROCESSING && c.requestId && c.model)
      .map((c) => c.id),
    [creations],
  );

  const processingJobs = useMemo(
    () => creations.filter(
      (c) => c.status === CREATION_STATUS.PROCESSING && c.requestId && c.model,
    ),
    [creations],
  );

  // Orphan jobs: processing but no requestId/model (e.g. blocking image jobs that got stuck)
  const orphanJobs = useMemo(
    () => creations.filter(
      (c) => c.status === CREATION_STATUS.PROCESSING && !c.requestId && !c.model,
    ),
    [creations],
  );

  // Use ref for stable function reference to prevent effect re-runs
  const pollJobRef = useRef<((creation: Creation) => Promise<void>) | undefined>(undefined);

  // Use mounted ref to prevent operations after unmount
  const isMountedRef = useRef(true);

  useEffect(() => {
    isMountedRef.current = true;
    return () => {
      isMountedRef.current = false;
    };
  }, []);

  pollJobRef.current = async (creation: Creation) => {
    if (!isMountedRef.current || !userId || !creation.requestId || !creation.model) return;

    if (pollingRef.current.has(creation.id)) return;
    pollingRef.current.add(creation.id);

    // Stale detection: if creation is older than max poll time, mark as failed
    const ageMs = Date.now() - creation.createdAt.getTime();
    if (ageMs > DEFAULT_MAX_POLL_TIME_MS) {
      if (typeof __DEV__ !== "undefined" && __DEV__) {
        console.log("[ProcessingJobsPoller] Stale job detected, marking as failed:", creation.id, { ageMs });
      }
      try {
        await repository.update(userId, creation.id, {
          status: CREATION_STATUS.FAILED,
          metadata: { ...creation.metadata, error: "Generation timed out" },
          completedAt: new Date(),
        });
      } catch (e) {
        if (typeof __DEV__ !== "undefined" && __DEV__) {
          console.error("[ProcessingJobsPoller] Failed to mark stale job:", e);
        }
      }
      pollingRef.current.delete(creation.id);
      return;
    }

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

        if (!isMountedRef.current) return;

        const uri = urls.videoUrl || urls.imageUrl || "";

        // Validate that we have a valid URI before marking as completed
        if (!uri || uri.trim() === "") {
          if (typeof __DEV__ !== "undefined" && __DEV__) {
            console.error("[ProcessingJobsPoller] No valid URI in result:", creation.id);
          }
          await repository.update(userId, creation.id, {
            status: CREATION_STATUS.FAILED,
            metadata: { ...creation.metadata, error: "No valid result URL received" },
            completedAt: new Date(),
          });
          return;
        }

        const output: Record<string, string | undefined> = {};
        if (urls.imageUrl) output.imageUrl = urls.imageUrl;
        if (urls.videoUrl) output.videoUrl = urls.videoUrl;
        if (urls.thumbnailUrl) output.thumbnailUrl = urls.thumbnailUrl;

        await repository.update(userId, creation.id, {
          status: CREATION_STATUS.COMPLETED,
          uri,
          output,
          completedAt: new Date(),
        });
      } else if (status.status === QUEUE_STATUS.FAILED) {
        if (typeof __DEV__ !== "undefined" && __DEV__) console.log("[ProcessingJobsPoller] Failed:", creation.id);

        if (!isMountedRef.current) return;

        await repository.update(userId, creation.id, {
          status: CREATION_STATUS.FAILED,
          metadata: { ...creation.metadata, error: "Generation failed" },
          completedAt: new Date(),
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

  // Clean up orphan processing creations (no requestId/model) older than max poll time
  useEffect(() => {
    if (!enabled || !userId || orphanJobs.length === 0) return;

    orphanJobs.forEach(async (creation) => {
      const ageMs = Date.now() - creation.createdAt.getTime();
      if (ageMs < DEFAULT_MAX_POLL_TIME_MS) return;

      if (typeof __DEV__ !== "undefined" && __DEV__) {
        console.log("[ProcessingJobsPoller] Orphan job timed out, marking as failed:", creation.id, { ageMs });
      }
      try {
        await repository.update(userId, creation.id, {
          status: CREATION_STATUS.FAILED,
          metadata: { ...creation.metadata, error: "Generation timed out" },
          completedAt: new Date(),
        });
      } catch (e) {
        if (typeof __DEV__ !== "undefined" && __DEV__) {
          console.error("[ProcessingJobsPoller] Failed to mark orphan job:", e);
        }
      }
    });
  }, [enabled, userId, orphanJobs, repository]);

  // Use ref to always get latest creations
  const creationsRef = useRef(creations);
  useEffect(() => {
    creationsRef.current = creations;
  }, [creations]);

  useEffect(() => {
    if (!enabled || !userId || processingJobIds.length === 0) {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
      return;
    }

    // Get current jobs at poll time from ref to avoid stale closures
    const pollCurrentJobs = () => {
      const currentJobs = creationsRef.current.filter(
        (c) => c.status === CREATION_STATUS.PROCESSING && c.requestId && c.model,
      );
      currentJobs.forEach((job) => pollJobRef.current?.(job));
    };

    // Initial poll
    pollCurrentJobs();

    // Set up interval polling
    intervalRef.current = setInterval(pollCurrentJobs, DEFAULT_POLL_INTERVAL_MS);

    return () => {
      // Clear polling set first to prevent new operations
      pollingRef.current.clear();

      // Then clear interval
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    };
  }, [enabled, userId, processingJobIds]);

  return {
    processingCount: processingJobs.length,
  };
}
