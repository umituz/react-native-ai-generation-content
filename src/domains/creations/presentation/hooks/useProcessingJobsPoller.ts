/**
 * useProcessingJobsPoller Hook
 * Polls queue status for "processing" creations
 */

import { useEffect } from 'react';
import type { Creation } from '../../domain/entities/Creation';

export interface UseProcessingJobsPollerConfig {
  userId: string | null;
  creations: Creation[];
  enabled?: boolean;
  interval?: number;
}

export interface UseProcessingJobsPollerReturn {
  isPolling: boolean;
}

/**
 * Hook to poll processing jobs
 */
export function useProcessingJobsPoller(
  config: UseProcessingJobsPollerConfig
): UseProcessingJobsPollerReturn {
  const { userId, creations, enabled = false, interval = 5000 } = config;

  useEffect(() => {
    if (!enabled || !userId) return;

    const timer = setInterval(() => {
      // Stub: Polling logic to be implemented when job status API is available
      const processingCreations = creations.filter(c => c.status === 'processing');
      processingCreations.forEach(async (_creation) => {
        try {
          // Check job status and update creation
          // Note: Actual polling implementation requires job status API
        } catch (error) {
          console.error('Error polling job status:', error);
        }
      });
    }, interval);

    return () => clearInterval(timer);
  }, [enabled, interval, userId, creations]);

  return {
    isPolling: enabled && !!userId,
  };
}
