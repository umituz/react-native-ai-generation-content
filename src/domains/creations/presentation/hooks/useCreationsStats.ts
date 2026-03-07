import { useMemo } from "react";
import type { Creation } from "../../domain/entities/Creation";

export interface CreationsStats {
  readonly total: number;
  readonly thisWeek: number;
  readonly processing: number;
}

const WEEK_MS = 7 * 24 * 60 * 60 * 1000;

/**
 * useCreationsStats
 * Computes summary statistics from a list of creations.
 * Accepts the raw data array from useCreations.
 */
export function useCreationsStats(creations: Creation[] | undefined): CreationsStats {
  return useMemo(() => {
    if (!creations?.length) return { total: 0, thisWeek: 0, processing: 0 };

    const weekAgo = new Date(Date.now() - WEEK_MS);
    let thisWeek = 0;
    let processing = 0;

    for (const c of creations) {
      if (new Date(c.createdAt) > weekAgo) thisWeek++;
      if (c.status === "processing" || c.status === "queued" || c.status === "pending") processing++;
    }

    return { total: creations.length, thisWeek, processing };
  }, [creations]);
}
